import { useEffect } from "react";
import styled from "styled-components";
import { authService } from "../firebase";

const ProfileImgBox = styled.div`
  overflow: hidden;
  fill: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #7bb241;
  background-color: #7bb241;
  
`;

const RereBox = styled.div`
  margin-bottom: 20px;
  box-shadow: 5px 5px 10px;
`;

const TopBox = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  gap: 10px;
`;

const TopLeft = styled.div``;

const TopRight = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bolder;
`;

const Representation = styled.div`
  font-size: 10px;
`;

const MiddleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const BottomBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  font-size: 15px;
  color: #aeaeae;
  
`;

const ResponseBox = styled.div`
  width: 80vw;
  height: 100px;
  border-radius: 10px;
  padding: 10px;
  
  background-color: #e8f5e9;
`;

export default function ReBox({ re }) {
  return (
    <RereBox key={re.userId}>
      <TopBox>
        <TopLeft>
          <ProfileImgBox>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
          </ProfileImgBox>
        </TopLeft>
        <TopRight>
          <Name>{re.userDisplayName || "NAME"}</Name>
          <Representation>{re.representation}</Representation>
        </TopRight>
      </TopBox>
      <MiddleBox>
        <ResponseBox>{re.response}</ResponseBox>
      </MiddleBox>
      <BottomBox>{re.createdTime}</BottomBox>
    </RereBox>
  );
}
