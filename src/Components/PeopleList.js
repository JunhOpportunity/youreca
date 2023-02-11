import styled from "styled-components";
import Header from "./Header";
import Upload from "../Routes/UploadReputation.js";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "../firebase";
import { useEffect, useState } from "react";
import ReBox from "./ReBox";
import PersonBox from "./PersonBox";

const EmptyBox = styled.div`
  height: 50px;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  padding: 10px;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media only screen and (min-width: 1025px) {
    grid-template-columns: repeat(4, 1fr);
  }
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

export default function RePeople() {
  const [people, setPeople] = useState([]);
  const user = authService.currentUser;
  useEffect(() => {
    dbService.collection("Person").onSnapshot((snapshot) => {
      const peopleArray = snapshot.docs.map((doc) => ({ ...doc.data() }));
      console.log(peopleArray);
      setPeople(peopleArray);
    });
  }, []);

  const navigation = useNavigate();

  const goCreatePerson = () => {
    navigation("/Responses-Chat/regist");
  };

  return (
    <>
      <Header />
      <EmptyBox />
      <NewPost onClick={goCreatePerson}>내 평판 추가하러 가기</NewPost>
      <Wrapper>
        {people.map((pers) => (
          <Box>
            <PersonBox personData={pers} isMine={true} />
          </Box>
        ))}
      </Wrapper>
    </>
  );
}