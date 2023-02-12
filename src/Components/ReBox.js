import { useState } from "react";
import styled from "styled-components";
import { dbService } from "../firebase";

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
  overflow-y: auto;
  background-color: #e8f5e9;
`;

const Svg = styled.svg`
  width: 15px;
  height: 15px;
  fill: blue;
`;

const ProfileImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  fill: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #7bb241;
  background-color: #7bb241;
`;

export default function ReBox({ re, isMine }) {
  
  return (
    <RereBox key={re.userId}>
      <TopBox>
        <TopLeft>
        {re.profileImgUrl ? (
            <>
              <ProfileImg>
                <img
                  src={re.profileImgUrl}
                  width="50px"
                  height="50px"
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
        </TopLeft>
        <TopRight>
          <Name>
            {re.userDisplayName || "NAME"}{" "} 
            {re.emailVer ? 
              <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM625 177L497 305c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L591 143c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
              </Svg>
              :
              <></>
            }
          </Name>
          <Representation>
            {re.representation} ({re.userEmail || "Email"})
          </Representation>
        </TopRight>
      </TopBox>
      <MiddleBox>
        <ResponseBox>
          {re.response.split("\n").map((text) => (
            <>
              {text}
              <br />
            </>
          ))}
        </ResponseBox>
      </MiddleBox>
      <BottomBox>{re.createdTime}</BottomBox>
    </RereBox>
  );
}
