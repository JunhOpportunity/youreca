import React, { useState } from "react";
import { dbService } from "../firebase.js";
import styled from "styled-components";
import { authService } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../Components/Loading";
import Header from "../Components/Header.js";
import { useUserDataInit } from "../Hooks/InitEffect.js";
import { CreateTopDocument } from "../Logic/CreateData.js";

const TopEmptyBox = styled.div`
  height: 100px;
  @media only screen and (min-width: 768px) {
    height: 150px;
  }
`;

const BottomEmptyBox = styled.div`
  height: 50px;
  @media only screen and (min-width: 768px) {
    height: 0px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
`;

const Label = styled.label`
  text-align: center;
  margin: 20px;
`;

const InputDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  border: none;
  width: 90%;
  padding: 0;
  margin: 0 20px;
  height: 50px;
  text-align: center;
  color: black;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
`;

const UserNameInput = styled.input`
  padding: 0;
  margin: 0 20px;
  height: 50px;
  text-align: center;
  font-weight: bold;
  color: #696969;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
`;

const InputSubmit = styled.input`
  border: none;
  height: 50px;
  position: fixed;
  top: 50px;
  width: 100%;
  color: white;
  background-color: #7bb241;
  cursor: pointer;
  @media only screen and (min-width: 768px) {
    top: 100px;
  }
`;

const ProfileImgBox = styled.div`
  display: flex;
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

export default function RegistPerson() {
  const init = useUserDataInit();
  const [personInfo, setPersonInfo] = useState("");
  const [profileImgUrl, setProfileImgUrl] = useState(false);
  const [userNickname, setUserNickname] = useState("");
  const [userBetaTester, setUserBetaTester] = useState(false);
  const [userJob, setUserJob] = useState("");
  const navigation = useNavigate();
  const user = authService.currentUser;

  authService.onAuthStateChanged(async (user) => {
    dbService
      .collection("User")
      .doc(user.uid)
      .onSnapshot((snapshot) => {
        setProfileImgUrl(snapshot.data().profileImgUrl);
        setUserNickname(snapshot.data().userNickname);
        setUserJob(snapshot.data().userJob);
        setUserBetaTester(snapshot.data().userBetaTester);
      });
  });

  const onChange = (event) => {
    const {
      target: { value, name },
    } = event;
    if (name === "userInfo") {
      setPersonInfo(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    Swal.fire({
      title: "등록하시겠습니까?",
      text: "사용자의 정보는 변경이 불가능합니다.",
      icon: "warning",
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "등록",
      denyButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        CreateTopDocument("Person", user.uid, {
          userId: user.uid,
          userDisplayName: user.displayName,
          userEmail: user.email,
          emailVer: user.emailVerified,
          personInfo: personInfo,
          profileImgUrl: profileImgUrl ? profileImgUrl : "",
          userNickname: userNickname,
          userJob: userJob,
          created: Date.now(),
          userBetaTester: userBetaTester,
        });
        Swal.fire("등록되었습니다!", "", "success");
        setTimeout(() => {
          navigation("/");
        }, 1000);
      }
    });
  };

  return (
    <>
      {init ? (
        <>
          <Header />

          <Wrapper>
            <TopEmptyBox />
            <Form onSubmit={onSubmit}>
              <Label for="story" style={{ color: "red" }}>
                <u>프로필 사진과 이름 변경은 프로필 페이지에서만 가능합니다.</u>
              </Label>
              <Label for="story">프로필 사진</Label>
              {/* 가입시 사진 등록 && 없을 경우 기본 사진 && 프로필 페이지에서 변경 */}
              <ProfileImgBox>
                {profileImgUrl ? (
                  <>
                    <ProfileImg>
                      <img src={profileImgUrl} width="100px" height="100px" />
                    </ProfileImg>
                  </>
                ) : (
                  <ProfileImg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                    </svg>
                  </ProfileImg>
                )}
              </ProfileImgBox>
              <Label for="story">이름</Label>
              {/* 프로필 페이지에서 변경 */}
              <InputDiv>
                <UserNameInput
                  type="text"
                  value={user.displayName}
                  name="username"
                  disabled
                />
              </InputDiv>

              <Label for="story">
                정보를 입력해주세요
                <br />
                <u>(정확하게 입력해주세요!)</u>
                <br />
                <u>글자수 제한은 없습니다</u>
              </Label>
              <InputDiv>
                <Input
                  type="text"
                  placeholder="EX) OO대학교 학생, OO전자 인턴, OO비행단 복무중인 군인, ..."
                  value={personInfo}
                  name="userInfo"
                  onChange={onChange}
                  required
                />
              </InputDiv>

              <InputSubmit onSubmit={onSubmit} type="submit" value="등록하기" />
              <Label for="story" style={{ color: "red" }}>
                <u>프로필 페이지 정보 수정은 현재 페이지에서 재작성  등록하시면 수정하실 수 있습니다.</u>
              </Label>
            </Form>
            <BottomEmptyBox />
          </Wrapper>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
