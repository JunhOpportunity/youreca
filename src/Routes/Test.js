import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PersonBox from "../Components/PersonBox";
import Header from "../Components/Header";
import { useGetAllDocumentData } from "../Hooks/getDataEffect";
import { useEffect, useState } from "react";
import { dbService } from "../firebase";

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

export default function Test() {
  const [data, setData] = useState();

  useEffect(() => {
    dbService
      .collection("Person")
      .get()
      .then((snapshot) => {
        const getData = snapshot.docs.map((doc) => ({ ...doc.data() }));
        setData(getData);
      });
  }, []);
  useEffect(() => {
    console.log("data",data)
  }, [data])
  const navigation = useNavigate();

  const goCreatePerson = () => {
    navigation("/regist");
  };

  const onclick1 = async () => {
    const newpeople = await data.sort(function (a, b) {
      return a.userDisplayName < b.userDisplayName
        ? -1
        : a.userDisplayName > b.userDisplayName
        ? 1
        : 0;
    });
    setData([...newpeople])
    console.log(data)
  };

  const onclick2 = async () => {
    const newpeople = await data.sort(function (a, b) {
      return a.userDisplayName > b.userDisplayName
        ? -1
        : a.userDisplayName < b.userDisplayName
        ? 1
        : 0;
    });
    setData([...newpeople])
    console.log(data)
  };

  return (
    <>
      {data ? (
        <>
          <Header />
          <TopEmptyBox />
          <NewPost onClick={goCreatePerson}>내 평판 추가하러 가기</NewPost>
          <Main>
            <Wrapper>
              <div onClick={onclick1}>이름순(내림차순)</div>
              <div onClick={onclick2}>이름순(오름차순)</div>
              {data.map((pers) => (
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
