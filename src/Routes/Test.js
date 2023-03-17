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

const SelectBox = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const Select = styled.select`
  width: 100%;
  max-width: 1280px;
  height: 30px;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0px 0px 2px #7bb241;
  border: none;
  font-weight: bolder;
`;

const Option = styled.option``;

export default function Test() {
  const [data, setData] = useState();

  useEffect(() => {
    dbService
      .collection("Person")
      .orderBy("userDisplayName", "asc")
      .onSnapshot((snapshot) => {
        const getData = snapshot.docs.map((doc) => ({ ...doc.data() }));
        setData(getData);
      });
  }, []);

  const navigation = useNavigate();

  const goCreatePerson = () => {
    navigation("/regist");
  };

  const onChangeSelectBox = async (e) => {
    const select = e.target.value;

    if (select == "nameDescending") {
      // 이름순 - 내림차순
      const newpeople = await data.sort(function (a, b) {
        return a.userDisplayName < b.userDisplayName
          ? -1
          : a.userDisplayName > b.userDisplayName
          ? 1
          : 0;
      });
      setData([...newpeople]);
    } else if (select == "nameAscending") {
      // 이름순 - 오름차순
      const newpeople = await data.sort(function (a, b) {
        return a.userDisplayName > b.userDisplayName
          ? -1
          : a.userDisplayName < b.userDisplayName
          ? 1
          : 0;
      });
      setData([...newpeople]);
    } else if (select == "dateLater") {
      // 날짜순 - 나중순
      const newpeople = await data.sort(function (a, b) {
        return a.created - b.created;
      });
      setData([...newpeople]);
    } else if (select == "dateNewest") {
      // 날짜순 - 최신순
      const newpeople = await data.sort(function (a, b) {
        return b.created - a.created;
      });
      setData([...newpeople]);
    }
  };

  return (
    <>
      {data ? (
        <>
          <Header />
          <TopEmptyBox />
          <NewPost onClick={goCreatePerson}>내 평판 추가하러 가기</NewPost>
          <SelectBox>
            <Select onChange={onChangeSelectBox}>
              <Option value="nameDescending" selected>
                이름순(오름차순)
              </Option>
              <Option value="nameAscending">이름순(내림차순)</Option>
              <Option value="dateNewest">최신순</Option>
              <Option value="dateLater">나중순</Option>
            </Select>
          </SelectBox>
          <Main>
            <Wrapper>
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
