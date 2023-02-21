import styled from "styled-components";
import Header from "./Header";
import Upload from "../Routes/UploadReputation";
import { useNavigate, useParams } from "react-router-dom";
import { authService, dbService } from "../firebase";
import { useEffect, useState } from "react";
import ReBox from "./ReBox";
import { EmptyReputation } from "./EmptyReputation";
import MyReBox from "./MyReBox";


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
  const [isMine, setIsMine] = useState(false)
  const { id } = useParams();
  const user = authService.currentUser;
  useEffect(() => {
    dbService
      .collection(id)
      .orderBy("created", "desc")
      .onSnapshot((snapshot) => {
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
      <HeaderTest />
      <EmptyBox />
      <NewPost onClick={goUpload}>글 작성하러 가기</NewPost>
      <Wrapper>
        {responses.length != 0 ? 
          (responses.map((re) =>  isMine ? <MyReBox re={re}/> :<ReBox re={re} />)
        ) : (
          <EmptyReputation />
        )}
      </Wrapper>
      <EmptyBox />
    </>
  );
}
