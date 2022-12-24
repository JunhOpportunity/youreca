import { useEffect, useState } from "react";
import { authService } from "../firebase";
import Loading from "../Components/Loading";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 50px;
  align-items: center;
  height: 100vh;
`;

const Svg = styled.svg`
  width: 100px;
  height: 100px;
`;

const Text = styled.div`
  font-size: 18px;
  text-align: center;
`;

const ButtonBundle = styled.div`
  display: flex;
`;

const Button = styled.div`
  cursor: pointer;
  width: 200px;
  height: 50px;
  border: 0;
  font-size: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25em;
  color: white;
`;

const BtnText = styled.div``;

export default function EmailVerification() {
  const navigation = useNavigate();
  const [init, setInit] = useState(false);

  const user = authService.currentUser;

  setTimeout(() => {
    user.sendEmailVerification();
  }, 3000);

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      setInit(true);
    });
    
  }, []);

  const onBtnClick = () => {
    navigation("/Responses-Chat/");
  };

  return (
    <>
      {init ? (
        <Wrapper>
          <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
          </Svg>
          <Text>
            'noreply@re-chat'으로부터 <br />
            인증용 이메일을 발송하였습니다.
            <br />
            로그인에 사용하셨던 이메일을 <br />
            확인하여 인증해주시기 바랍니다.
            <br />
          </Text>
          <ButtonBundle>
            <Button onClick={onBtnClick} style={{ backgroundColor: "#3085D6" }}>
              <BtnText>인증완료</BtnText>
            </Button>
            <Button onClick={onBtnClick} style={{ backgroundColor: "#DC3741" }}>
              <BtnText>넘어가기</BtnText>
            </Button>
          </ButtonBundle>
        </Wrapper>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
}
