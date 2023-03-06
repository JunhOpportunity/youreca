import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PersonBox from "./PersonBox";
import HeaderTest from "./HeaderTest";
import { useGetAllDocumentData } from "../Hooks/getDataEffect";

const Main = styled.div`
  display: flex;
  justify-content: center;
`;

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

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  max-width: 1280px;
  padding: 10px;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  @media only screen and (min-width: 425px) {
    grid-template-columns: repeat(2, 1fr);
  }
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
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #7bb241;
  box-shadow: 0px 0px 2px #7bb241;
  transition-duration: 0.3s;
  :hover {
    color: white;
    background-color: #7bb241;
  }
`;

export default function RePeople() {
  const people = useGetAllDocumentData("Person");

  const navigation = useNavigate();

  const goCreatePerson = () => {
    navigation("/regist");
  };

  return (
    <>
      {people ? (
        <>
          <HeaderTest />
          <TopEmptyBox />
          <NewPost onClick={goCreatePerson}>내 평판 추가하러 가기</NewPost>
          <Main>
            <Wrapper>
              {people.map((pers) => (
                <Box>
                  <PersonBox personData={pers} isMine={true} />
                </Box>
              ))}
            </Wrapper>
          </Main>
          <BottomEmptyBox />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
