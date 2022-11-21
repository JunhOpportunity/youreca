import React, { useEffect, useState } from "react";
import { dbService } from "../firebase.js";
import styled from "styled-components";
import { authService } from "../firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Wrapper = styled.div``;

const Input = styled.input`
  border: none;
  border-radius: 50px;
  background-color: beige;
`;

const TextArea = styled.textarea`
  border: none;
  background-color: beige;
  width: 200px;
  height: 200px;
`;

export default function ReRe({ userInfo }) {
  const navigation = useNavigate();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('all', user)
      console.log('onAuth', user.email);
      const created = user.metadata.createdAt;
      const last = user.metadata.lastLoginAt;
      console.log('real', created, last)
      console.log(created === last);
    } else {
      navigation("/");
    }
  });
  const [response, SetResponse] = useState("");

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    SetResponse(value);
  };

  const onSubmit = async (event) => {
    console.log(userInfo);
    event.preventDefault();
    const user = authService.currentUser;
    await dbService.collection("ReArchive").add({
      response: response,
      userId: userInfo.userId,
      createdTime: Date(),
    });
    SetResponse("");
  };

  return (
    <>
      <Wrapper>
        <form onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="김준호라는 사람은 어떤 사람이었는지, 어떤 생활을 해왔는지 자유롭게 적어주세요!"
            value={response}
            onChange={onChange}
          />
          <TextArea
            type="text"
            placeholder="김준호라는 사람은 어떤 사람이었는지, 어떤 생활을 해왔는지 자유롭게 적어주세요!"
            value={response}
            onChange={onChange}
          ></TextArea>
          <input type="submit" value="게시하기" />
        </form>
      </Wrapper>
    </>
  );
}
