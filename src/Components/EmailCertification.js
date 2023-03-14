import { useEffect, useState } from "react";
import { authService, dbService } from "../firebase";
import styled from "styled-components";
import Swal from "sweetalert2";

const EmailVerify = styled.div`
  border-bottom: 1px solid #43a047;
  padding: 10px;
  margin-bottom: 10px;
  height: 100px;
`;

const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BottomBox = styled.div`
  margin-top: 10px;
`;

const EmailVerifyBtn = styled.div`
  width: 100%;
  height: 50px;
  background-color: #696969;
  font-size: 13px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
`;

const EmailTitle = styled.div`
  width: 200px;
  font-weight: bolder;
  border-radius: 0.25em;
  color: #7bb241;
  text-align: center;
  padding: 5px;
  box-shadow: 0px 0px 5px #7bb241;
`;

// Styled Components에서 Props 사용할떄는 props.이름 이렇게 사용해야한다.
// Boolean 값으로 Props를 받으려고 할 때 props만 입력하면 무조건 true 나온다.
const Svg = styled.svg`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  fill: ${(props) => (props.emailVer ? "blue" : "#696969")};
`;

export default function EmailCertification() {
  const [emailVer, setEmailVer] = useState();
  const user = authService.currentUser;

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      setEmailVer(user.emailVerified);
    });
  }, []);

  const onClickEmailVerificationBtn = () => {
    let timerInterval;
    Swal.fire({
      title: "인증 이메일을 발송했습니다.",
      icon: "success",
      html: "'<b>noreply@re-chat</b>' 으로부터 <br/> 인증용 이메일을 발송하였습니다.<br />로그인에 사용하셨던 이메일 확인 후 <br /><b>5분 내로</b> 인증해주시기 바랍니다.<br /><br/> 인증 완료까지는 약 5분정도<br/> 소요될 수 있습니다.<br/><br/>인증 후 새로고침 부탁드립니다.",
      timer: "300000",
      timerProgressBar: true,
    });

    setTimeout(() => {
      user.sendEmailVerification();
    }, 3000);
  };

  const onClickRenew = () => {
    dbService
      .collection("ReArchive")
      .doc(user.uid)
      .update({ emailVer: user.emailVerified });
  };

  return (
    <>
      <EmailVerify>
        <TopBox>
          <EmailTitle>이메일 인증 상태</EmailTitle>
          <Svg
            emailVer={emailVer}
            styledxmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M211 7.3C205 1 196-1.4 187.6 .8s-14.9 8.9-17.1 17.3L154.7 80.6l-62-17.5c-8.4-2.4-17.4 0-23.5 6.1s-8.5 15.1-6.1 23.5l17.5 62L18.1 170.6c-8.4 2.1-15 8.7-17.3 17.1S1 205 7.3 211l46.2 45L7.3 301C1 307-1.4 316 .8 324.4s8.9 14.9 17.3 17.1l62.5 15.8-17.5 62c-2.4 8.4 0 17.4 6.1 23.5s15.1 8.5 23.5 6.1l62-17.5 15.8 62.5c2.1 8.4 8.7 15 17.1 17.3s17.3-.2 23.4-6.4l45-46.2 45 46.2c6.1 6.2 15 8.7 23.4 6.4s14.9-8.9 17.1-17.3l15.8-62.5 62 17.5c8.4 2.4 17.4 0 23.5-6.1s8.5-15.1 6.1-23.5l-17.5-62 62.5-15.8c8.4-2.1 15-8.7 17.3-17.1s-.2-17.3-6.4-23.4l-46.2-45 46.2-45c6.2-6.1 8.7-15 6.4-23.4s-8.9-14.9-17.3-17.1l-62.5-15.8 17.5-62c2.4-8.4 0-17.4-6.1-23.5s-15.1-8.5-23.5-6.1l-62 17.5L341.4 18.1c-2.1-8.4-8.7-15-17.1-17.3S307 1 301 7.3L256 53.5 211 7.3z" />
          </Svg>
        </TopBox>
        {emailVer ? (
          <BottomBox>
            <EmailVerifyBtn onClick={onClickRenew}>
              이메일 인증 갱신하기 (게시글의 뱃지가 뜨지 않는 경우)
            </EmailVerifyBtn>
          </BottomBox>
        ) : (
          <BottomBox>
            <EmailVerifyBtn onClick={onClickEmailVerificationBtn}>
              이메일 인증하기
            </EmailVerifyBtn>
          </BottomBox>
        )}
      </EmailVerify>
    </>
  );
}
