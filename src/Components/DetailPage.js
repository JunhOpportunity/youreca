import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { authService, dbService } from "../firebase";
import { useEffect, useState } from "react";
import ReBox from "./ReBox";
import { EmptyReputation } from "./EmptyReputation";
import MyReBox from "./MyReBox";
import HeaderTest from "./HeaderTest";

const TopEmptyBox = styled.div`
  height: 50px;
  @media only screen and (min-width: 768px) {
    height: 100px;
  }
`;

const BottomEmptyBox = styled.div`
  height: 50px;
  @media only screen and (min-width: 768px) {
    height: 0px;
  }
`;

const Wrapper = styled.div`
  padding: 10px;
`;

const NewPost = styled.div`
  cursor: pointer;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #7bb241;
  box-shadow: 0px 0px 2px #7bb241;
  transition-duration: .3s;
  :hover {
    color: white;
    background-color: #7bb241;
  }
`;

export default function UserReputations() {
  const [responses, setResponses] = useState([]);
  const [init, setInit] = useState(false);
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
    setInit(true);
  }, []);

  const navigation = useNavigate();

  const goUpload = () => {
    navigation(`/upload/${id}`);
  };

  return (
    <>
      <HeaderTest />
      <TopEmptyBox />
      <NewPost onClick={goUpload}>글 작성하러 가기</NewPost>
      <Wrapper>
        {responses.length ? (
          responses.map((re) =>
            user.uid == re.userId ? <MyReBox re={re} /> : <ReBox re={re} />
          )
        ) : (
          <EmptyReputation />
        )}
      </Wrapper>
      <BottomEmptyBox />
    </>
  );
}
