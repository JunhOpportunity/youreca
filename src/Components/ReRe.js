import React, { useEffect, useState } from "react";
import { dbService } from "../firebase.js";
import styled from "styled-components";
import { authService } from "../firebase.js";

const Wrapper = styled.div``;

/* const Input = styled.input`
  width: 200px;
  height: 200px;
  border: none;
  background-color: #696969;
  color: white;
`; */


export default function ReRe({ userInfo }) {
  const [response, SetResponse] = useState("");

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    SetResponse(value);
  };

  const onSubmit = async (event) => {
    console.log(userInfo)
    event.preventDefault();
    const user = authService.currentUser;
    await dbService
      .collection("ReArchive")
      .add({ response: response, userId: userInfo.userId, createdTime: Date() });
    SetResponse("");
  };

  return (
    <>
      <Wrapper>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="김준호라는 사람은 어떤 사람이었는지, 어떤 생활을 해왔는지 자유롭게 적어주세요!"
            value={response}
            onChange={onChange}
          />
          <input type="submit" value="게시하기" />
        </form>
      </Wrapper>
    </>
  );
}
