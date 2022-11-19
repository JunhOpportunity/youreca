import {authService} from "../firebase.js";
import styled from "styled-components";
import { useState } from "react";

const Title = styled.div`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const Input = styled.input``;

const Question = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  color: blue;
  cursor: pointer;
`;

export default function Auth({ loginCheck }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewaccount] = useState(false);
  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // 새로 Email 계정을 만드는 경우
        await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // Login 하는 경우 (계정을 가지고 있는 경우)
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      console.log(error);
    }
    setEmail("");
    setPassword("");
  };
  const toggleAccount = () => {
    // 계정 새로 만드는지 그냥 로그인인지 변경하도록
    setNewaccount((e) => !e);
  }
  return (
    <>
      <Title>RE:Chat</Title>
      <Form onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder={newAccount ? "새 이메일": "이메일"}
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <Input
          type="password"
          placeholder={newAccount ? "새 비밀번호": "비밀번호"}
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        <Input
          type="submit"
          value={newAccount ? "이메일 계정 생성하기" : "로그인"}
          name="login"
        />
      </Form>
      <Question onClick={toggleAccount}>{newAccount ? <h6>취소</h6> : <h6>처음이신가요? 회원가입하기</h6>}</Question>
      <Question><h6>문제가 발생하셨나요? 개발자에게 문의하기</h6></Question>
    </>
  );
}
