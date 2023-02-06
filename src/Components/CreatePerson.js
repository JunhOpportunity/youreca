import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div``;
const Form = styled.form``;
const Label = styled.label``;
const UserImgDiv = styled.div``;
const UserImg = styled.div``;
const UserNameDiv = styled.div``;
const UserInfoDiv = styled.div``;
const UserInput = styled.input`
  width: 500px;
  height: 200px;
`;
const Submit = styled.input``;

export function CreatePerson({ data }) {
  const [userName, setUserName] = useState("");
  const [userInfo, setUserInfo] = useState("");

  const onChange = (event) => {
    const {
      target: { value, name },
    } = event;
    if (name === "userName") {
      setUserName(value);
    } else if (name === "userInfo") {
      setUserInfo(value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Wrapper>
      <Form>
        <UserImgDiv>
          <UserInput type="file"></UserInput>
        </UserImgDiv>
        <UserNameDiv>
          <UserInput
            type="text"
            value={userName}
            onChange={onChange}
            name="userName"
          ></UserInput>
        </UserNameDiv>
        <UserInfoDiv>
          <UserInput
            type="text"
            value={userInfo}
            onChange={onChange}
            name="userInfo"
          ></UserInput>
        </UserInfoDiv>
        <Submit type="submit" value="내 평판 생성하기"></Submit>
      </Form>
    </Wrapper>
  );
}
