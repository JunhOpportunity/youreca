import { authService, firebaseInstance } from "../firebase.js";
import styled from "styled-components";
import { useState } from "react";
import Swal from "sweetalert2";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
  background-color: #faf7f0;
`;

const AuthBox = styled.div`
  padding: 50px;
  background-color: white;
  box-shadow: #696969 0px 0px 25px;
`;

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
  display: flex;
  justify-content: center;
  align-items: center;
  color: blue;
  cursor: pointer;
`;

const SocialLogin = styled.div``;

const SocialLoginTitle = styled.div`
  font-size: 20px;
`;

const SocialLoginBtnBundle = styled.div`
  gap: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SocialLoginBtn = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

const DistributeBar = styled.div`
  height: 1px;
  width: 250px;
  background-color: #696969;
`;

export default function Auth({ userInfo }) {
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
        await authService.createUserWithEmailAndPassword(email, password);
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
  };
  const contactOnClick = () => {
    Swal.fire("문의 : twinjyjh5@gmail.com \n ");
  };

  const onClickGoogle = async (event) => {
    const {target : {name}} = event;
    let provider;
    if(name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  }
  return (
    <Wrapper>
      <AuthBox>
        <Title>RE:Chat</Title>
        <Form onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder={newAccount ? "새 이메일" : "이메일"}
            name="email"
            value={email}
            onChange={onChange}
            required
          />
          <Input
            type="password"
            placeholder={newAccount ? "새 비밀번호" : "비밀번호"}
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
        <Question onClick={toggleAccount}>
          {newAccount ? <h6>취소</h6> : <h6>처음이신가요? 회원가입하기</h6>}
        </Question>
        <Question onClick={contactOnClick}>
          <h6 >
            문제가 발생하셨나요? 개발자에게 문의하기
          </h6>
        </Question>
        <DistributeBar />
        <SocialLogin>
          <SocialLoginTitle>Social 계정으로 로그인하기</SocialLoginTitle>
          <SocialLoginBtnBundle>
            <SocialLoginBtn name="google" onClick={onClickGoogle}>G</SocialLoginBtn>
            <SocialLoginBtn name="github" onClick={onClickGoogle}>Github</SocialLoginBtn>
          </SocialLoginBtnBundle>
        </SocialLogin>
      </AuthBox>
    </Wrapper>
  );
}


