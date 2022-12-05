import React, { useState } from "react";
import { dbService } from "../firebase.js";
import styled from "styled-components";
import { authService } from "../firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Input = styled.input`
  border: none;
  background-color: #c8e6c9;
  width: 100%;
  padding: 0px;
  height: 50px;
`;

const InputSubmit = styled.input`
  border: none;
  background-color: #66bb6a;
  color: white;
  height: 20px;
`;

const Form = styled.form`
  height: 100%;
  width: 95vw;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const TextArea = styled.textarea`
  border: none;
  background-color: beige;
  width: 100%;
  height: 70%;
  resize: none;
  background-color: #c8e6c9;
  padding: 0px;
`;

export default function Upload() {
  const [userRepresentation, setUserRepresentation] = useState("");
  const [response, SetResponse] = useState("");
  const navigation = useNavigate();
  const auth = getAuth();
  const user = authService.currentUser;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const created = user.metadata.createdAt;
      const last = user.metadata.lastLoginAt;
    } else {
      navigation("/");
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
    })
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
          .collection("ReArchive")
          .doc(user.uid)
          .set({
            representation: userRepresentation,
            response: response,
            userId: user.uid,
            userDisplayName: user.displayName,
            createdTime: koDate,
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
      <Wrapper>
        <Form onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="당신의 정보를 알려주세요"
            value={userRepresentation}
            name="representation"
            onChange={onChange}
            required
          />
          <TextArea
            type="text"
            placeholder="어떤 사람이었는지, 어떤 생활을 해왔는지 자유롭게 적어주세요!"
            value={response}
            name="response"
            onChange={onChange}
            required
          ></TextArea>
          <InputSubmit type="submit" value="게시하기" />
        </Form>
      </Wrapper>
    </>
  );
}
