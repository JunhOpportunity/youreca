import styled from "styled-components";
import Header from "./Header";
import Upload from "../Routes/Upload.js";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "../firebase";
import { useEffect, useState } from "react";
import ReBox from "./ReBox";






export default function ReRe() {
  const [responses, setResponses] = useState([]);
  const user = authService.currentUser;
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
          <ReBox re={re} isMine={true}/>
        ) : (
          <ReBox re={re} isMine={false}/>
        )
      )}
    </>
  );
}
