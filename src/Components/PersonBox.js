import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Person = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
  box-shadow: 0px 0px 1px;
`;

const PersonName = styled.div`
  text-align: center;
  color: #696969;
  font-weight: bold;
  font-size: 20px;
`;

const PersonJob = styled.div`
  text-align: center;
  color: #696969;
  font-weight: lighter;
  font-size: 10px;
`;

const PersonInfo = styled.div`
  border-radius: 5px;
  background-color: #d3d3d3;
  display: flex;
  justify-content: center;
  padding: 10px;
  height: 100px;
  width: 90%;
  overflow-y: auto;
  font-size: 15px;
`;

const ProfileImgBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProfileImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #7bb241;
  fill: white;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid;
`;

const GoPageBtn = styled.button`
  all: unset;
  width: 100%;
  height: 50px;
  text-align: center;
  background-color: white;
  color: #7bb241;
  border: 1px solid #7bb241;
  transition-duration: 0.3s;
  :hover {
    color: white;
    background-color: #7bb241;
  }
  cursor: pointer;
`;

export default function PersonBox({ personData }) {
  const navigate = useNavigate();
  const address = personData.userNickname;
  const onClickedBtn = () => {
    navigate(`/user-reputations/${address}`);
  };
  return (
    <>
      <Person>
        <ProfileImgBox>
          {personData.profileImgUrl ? (
            <>
              <ProfileImg>
                <img
                  src={personData.profileImgUrl}
                  width="100px"
                  height="100px"
                />
              </ProfileImg>
            </>
          ) : (
            <ProfileImg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
            </ProfileImg>
          )}
        </ProfileImgBox>
        <PersonName>{personData.userDisplayName}</PersonName>
        <PersonJob>{personData.userJob} </PersonJob>
        <PersonInfo>{personData.personInfo}</PersonInfo>
        <GoPageBtn onClick={onClickedBtn}>평판 작성하러 가기</GoPageBtn>
      </Person>
    </>
  );
}
