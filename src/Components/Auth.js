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
`;

const AuthBox = styled.div`
  padding: 50px;
  background-color: white;
  box-shadow: #696969 0px 0px 10px;
  transition-duration: 1s;
  width: 60vw;
  :hover {
    transition-duration: 1s;
    box-shadow: 0px 0px 25px #43a047;
  }
`;



const LogoSvg = styled.svg`
  width: 50px;
  height: 50px;
  fill: #087f23;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const Input = styled.input`
  border: none;
  height: 50px;
  width: 100%;
  background-color: #c8e6c9;
  outline: none;
  transition-duration: 1s;
  color: white;
  text-align: center;
  border-radius: 50rem;
  ::placeholder {
    color: #43a047;
    transition-duration: 1s;
    text-align: center;
  }
  :focus {
    background-color: #43a047;
    transition-duration: 1s;
    ::placeholder {
      color: white;
      transition-duration: 1s;
    }
  }
`;

const InputSubmit = styled.input`
  border: none;
  background-color: #66bb6a;
  color: white;
  height: 50px;
  width: 100%;
`;

const Question = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #087f23;
  font-size: 10px;
  font-weight: bolder;
  padding: 10px;
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
  background-color: white;
  display:flex;
justify-content: center;
align-items: center;
`;

const Title = styled.div`
display:flex;
justify-content: center;
padding: 10px;
color: #696969;
`;

const GoogleIcon = styled.img`
width: 50px;
height: 50px;

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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">로그인에 문제가 발생하셨나요?</a>'
      });
    }
    setEmail("");
    setPassword("");
  };
  const toggleAccount = () => {
    // 계정 새로 만드는지 그냥 로그인인지 변경하도록
    setNewaccount((e) => !e);
  };
  const contactOnClick = () => {
    Swal.fire({
      title: 'CONTACT',
      text: '문의 : twinjyjh5@gmail.com',
      icon: 'info',
      footer: '<a href="https://open.kakao.com/me/junhopportunity">실시간 채팅 상담</a>',
  })
  };

  const onClickGoogle = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <Wrapper>
      <AuthBox>
        <Title>
          <LogoSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path d="M208 0C322.9 0 416 78.8 416 176C416 273.2 322.9 352 208 352C189.3 352 171.2 349.7 153.9 345.8C123.3 364.8 79.13 384 24.95 384C14.97 384 5.93 378.1 2.018 368.9C-1.896 359.7-.0074 349.1 6.739 341.9C7.26 341.5 29.38 317.4 45.73 285.9C17.18 255.8 0 217.6 0 176C0 78.8 93.13 0 208 0zM164.6 298.1C179.2 302.3 193.8 304 208 304C296.2 304 368 246.6 368 176C368 105.4 296.2 48 208 48C119.8 48 48 105.4 48 176C48 211.2 65.71 237.2 80.57 252.9L104.1 277.8L88.31 308.1C84.74 314.1 80.73 321.9 76.55 328.5C94.26 323.4 111.7 315.5 128.7 304.1L145.4 294.6L164.6 298.1zM441.6 128.2C552 132.4 640 209.5 640 304C640 345.6 622.8 383.8 594.3 413.9C610.6 445.4 632.7 469.5 633.3 469.9C640 477.1 641.9 487.7 637.1 496.9C634.1 506.1 625 512 615 512C560.9 512 516.7 492.8 486.1 473.8C468.8 477.7 450.7 480 432 480C350 480 279.1 439.8 245.2 381.5C262.5 379.2 279.1 375.3 294.9 369.9C322.9 407.1 373.9 432 432 432C446.2 432 460.8 430.3 475.4 426.1L494.6 422.6L511.3 432.1C528.3 443.5 545.7 451.4 563.5 456.5C559.3 449.9 555.3 442.1 551.7 436.1L535.9 405.8L559.4 380.9C574.3 365.3 592 339.2 592 304C592 237.7 528.7 183.1 447.1 176.6L448 176C448 159.5 445.8 143.5 441.6 128.2H441.6z" />
          </LogoSvg>
        </Title>
        <Form onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder={newAccount ? "새 이메일" : "이메일"}
            name="email"
            value={email}
            onChange={onChange}
            style={{ backgroundImage: "url()" }}
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
          <InputSubmit
            type="submit"
            value={newAccount ? "이메일 계정 생성하기" : "로그인"}
            name="login"
          />
        </Form>
        <Question onClick={toggleAccount}>
          {newAccount ? <>취소</> : <>처음이신가요? 회원가입하기</>}
        </Question>
        <Question onClick={contactOnClick}>
          도움이 필요하신가요?
        </Question>
        <SocialLogin>
          <SocialLoginTitle><Title>OR</Title></SocialLoginTitle>
          <SocialLoginBtnBundle>
            <SocialLoginBtn>
              <GoogleIcon name="google"onClick={onClickGoogle} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/640px-Google_%22G%22_Logo.svg.png"></GoogleIcon>
            </SocialLoginBtn>
            <SocialLoginBtn >
              <GoogleIcon name="github" onClick={onClickGoogle} src="https://cdn-icons-png.flaticon.com/512/25/25231.png"></GoogleIcon>
            </SocialLoginBtn>
          </SocialLoginBtnBundle>
        </SocialLogin>
      </AuthBox>
    </Wrapper>
  );
}
