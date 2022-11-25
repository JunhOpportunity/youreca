import styled from "styled-components";
import Header from "./Header";
import Upload from "../Routes/Upload.js";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "../firebase";
import { useEffect, useState } from "react";

const RereBox = styled.div`
  width: 300px;
  background-color: gray;
  margin-bottom: 20px;
`;

const TopBox = styled.div`
  display: flex;

  align-items: center;
`;

const MiddleBox = styled.div`
  display: flex;
  padding: 10px;
`;

const BottomBox = styled.div`
  display: flex;
  padding: 10px;
`;

const ProfileImgBox = styled.div`
  width: 50px;
  height: 50px;
  margin: 5px 10px;
  border-radius: 50%;
  background-color: black;
`;

const ResponseBox = styled.div`
  width: 250px;
  height: 100px;
  border-radius: 10px;
  background-color: yellow;
`;

export default function ReRe() {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    dbService
      .collection("ReArchive")
      .orderBy("createdTime", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot);
        const responseArray = snapshot.docs.map((doc) => ({ ...doc.data() }));
        setResponses(responseArray);
      });
  }, []);
  const user = authService.currentUser;
  const navigation = useNavigate();

  const goUpload = () => {
    navigation("upload");
  };

  return (
    <>
      <Header />
      <h1>ReRe</h1>
      <button onClick={goUpload}>작성하러 가기</button>
      {responses.map((re) =>
        user.uid === re.userId ? (
          <RereBox style={{backgroundColor: "red"}} key={re.userId}>
            <TopBox>
              <ProfileImgBox></ProfileImgBox>
              {re.userDisplayName || "NAME"}
              {re.representation}
            </TopBox>
            <MiddleBox>
              <ResponseBox>{re.response}</ResponseBox>
            </MiddleBox>
            <BottomBox>
              <h6>{re.createdDetailTime || re.createdTime}</h6>
            </BottomBox>
          </RereBox>
        ) : (
          <RereBox key={re.userId}>
            <TopBox>
              <ProfileImgBox></ProfileImgBox>
              {re.userDisplayName || "NAME"}
              {re.representation}
            </TopBox>
            <MiddleBox>
              <ResponseBox>{re.response}</ResponseBox>
            </MiddleBox>
            <BottomBox>
              <h6>{re.createdDetailTime || re.createdTime}</h6>
            </BottomBox>
          </RereBox>
        )
      )}
    </>
  );
}
