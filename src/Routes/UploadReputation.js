import React, { useState } from "react";
import { dbService } from "../firebase.js";
import styled from "styled-components";
import { authService } from "../firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import HeaderTest from "../Components/HeaderTest";

const EmptyBox = styled.div`
  height: 50px;
  width: 100%;
  @media only screen and (min-width: 768px) {
    height: 100px;
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

const InputSubmit = styled.input`
  border: none;
  background-color: #66bb6a;
  color: white;
  height: 50px;
  position: fixed;
  top: 50px;
  width: 100%;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  border: none;
  background-color: beige;
  width: 100%;
  height: 300px;
  resize: none;
  background-color: #b2fab4;
  padding: 0px;
  color: black;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  margin: 0 20px;
`;

export default function Upload() {
  const [userRepresentation, setUserRepresentation] = useState("");
  const [response, SetResponse] = useState("");
  const [profileImgUrl, setProfileImgUrl] = useState(false);
  const navigation = useNavigate();
  const auth = getAuth();
  const user = authService.currentUser;
  const { id } = useParams();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const created = user.metadata.createdAt;
      const last = user.metadata.lastLoginAt;
      dbService
        .collection("User")
        .doc(user.uid)
        .onSnapshot((snapshot) => {
          setProfileImgUrl(snapshot.data().profileImgUrl);
        });
    } else {
      navigation("/Responses-Chat");
    }
  });

  const onChange = (event) => {
    const {
      target: { value, name },
    } = event;
    if (name === "response") {
      SetResponse(value);
    } else if (name === "representation") {
      setUserRepresentation(value);
    }
  };

  const onSubmit = async (event) => {
    const date = new Date();
    const koDate = date.toLocaleString("ko", {
      minute: "numeric",
      hour: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      weekday: "short",
    });
    event.preventDefault();
    Swal.fire({
      title: "등록하시겠습니까?",
      text: "언제든지 수정 및 삭제가 가능합니다!",
      icon: "success",
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "등록",
      denyButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        dbService
          .collection(id)
          .doc(user.uid)
          .set({
            representation: userRepresentation,
            response: response,
            userId: user.uid,
            userDisplayName: user.displayName,
            createdTime: koDate,
            userEmail: user.email,
            emailVer: user.emailVerified,
            profileImgUrl: profileImgUrl ? profileImgUrl : "",
            created: Date.now(),
          });
        Swal.fire("등록되었습니다!", "", "success");
        setTimeout(() => {
          navigation("/Responses-Chat");
        }, 1000);
      }
    });
  };

  return (
    <>
      <HeaderTest />

      <Wrapper>
        <EmptyBox />
        <Form onSubmit={onSubmit}>
          <Label for="story">어떤 사이인가요?</Label>
          <InputDiv>
            <Input
              type="text"
              placeholder="EX) 군대 동기, 선임, 후임, 대학 동기 등"
              value={userRepresentation}
              name="representation"
              onChange={onChange}
              required
            />
          </InputDiv>
          <Label for="story">
            이 사람은 어떤 사람이었는지, 어떤 생활을 해왔는지
            <br />
            함께 지내며 보았던 것들
            <br />
            (공부시간, 인간관계, 인성, 업무처리능력 등)을 <br />
            바탕으로 자유롭게 적어주세요!
          </Label>
          <InputDiv>
            <TextArea
              type="text"
              value={response}
              name="response"
              onChange={onChange}
              required
            ></TextArea>
          </InputDiv>
          <InputSubmit type="submit" value="게시하기" />
        </Form>
      </Wrapper>
    </>
  );
}
