import { useEffect, useState } from "react";
import styled from "styled-components";
import { authService } from "../firebase";
import Loading from "../Components/Loading";

const Person = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
  box-shadow: 0px 0px 5px #696969;
`;

const PersonName = styled.div`
  text-align: center;
  color: #696969;
  font-weight: bold;
  font-size: 20px;
`;

const PersonInfo = styled.div`
  border-radius: 5px;
  background-color: #d3d3d3;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px;
  height: 100px;
  width: 90%;
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
  fill: white;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid #7bb241;
  background-color: #7bb241;
`;

const GoPageBtn = styled.button`
  all: unset; 
  width: 100%;
  height: 50px;
  text-align: center;
  background-color: gray;
  cursor: pointer;
`;

export default function PersonBox({ personData }) {
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
        <PersonInfo>{personData.personInfo}</PersonInfo>
        <GoPageBtn>평판 작성하러 가기</GoPageBtn>
      </Person>
    </>
  );
}

