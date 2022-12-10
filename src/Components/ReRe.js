import styled from "styled-components";
import Header from "./Header";
import Upload from "../Routes/Upload.js";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "../firebase";
import { useEffect, useState } from "react";
import ReBox from "./ReBox";

const EmptyBox = styled.div`
  height: 50px;
`;

const Wrapper = styled.div`
  padding: 10px;
`;

const NewPost = styled.div`
  cursor: pointer;
  width: 100%;
  height: 50px;
  background-color: #7bb241;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

export default function ReRe() {
  const [responses, setResponses] = useState([]);
  const user = authService.currentUser;
  useEffect(() => {
    dbService
      .collection("ReArchive")
      .orderBy("created", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot);
        const responseArray = snapshot.docs.map((doc) => ({ ...doc.data() }));
        setResponses(responseArray);
      });
  }, []);

  const navigation = useNavigate();

  const goUpload = () => {
    navigation("/Responses-Chat/upload");
  };

  return (
    <>
      <Header />
      <EmptyBox/>
      <NewPost onClick={goUpload}>글 작성하러 가기</NewPost>
      <Wrapper>
        
        {responses.map((re) =>
          user.uid === re.userId ? (
            <ReBox re={re} isMine={true} />
          ) : (
            <ReBox re={re} isMine={false} />
          )
        )}
      </Wrapper>
    </>
  );
}
