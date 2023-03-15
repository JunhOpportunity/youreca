import { authService } from "../firebase";
import Loading from "../Components/Loading";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useUserDataInit } from "../Hooks/InitEffect";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 50px;
  align-items: center;
  height: 100vh;
`;

const Title = styled.div`
  width: 100px;
  border-radius: 25px;
  color: #7bb241;
  text-align: center;
  font-weight: bolder;
  padding: 5px;
  box-shadow: 0px 0px 5px #7bb241;
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
  gap: 10px;
`;

const Button = styled.div`
  cursor: pointer;
  width: 110px;
  height: 40px;
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

const Progress = styled.div`
  position: fixed;
  bottom: 50px;
  width: 90%;
  padding: 20px;
`;

const ProgressText = styled.div`
  color: #7bb241;
  font-weight: bolder;
  text-align: center;
`;

const ProgressbarBox = styled.div`
  width: 100%;
  height: 40px;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
`;

const Progressbar = styled.div`
  height: 40px;
  background-color: #66bb6a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  font-weight: bolder;
`;

export default function FirstLoginVerification() {
  const navigation = useNavigate();
  const init = useUserDataInit();
  const user = authService.currentUser;

  setTimeout(() => {
    user.sendEmailVerification();
  }, 3000);

  const onBtnClick = () => {
    navigation("/");
  };

  const onSkipBtnClick = () => {
    Swal.fire({
      title: "넘어가시겠습니까?",
      text: "인증 완료시 신빙성 있는 사용자임을 증명하실 수 있습니다.",
      icon: "warning",
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonColor: "#66bb62",
      denyButtonColor: "#d33",
      confirmButtonText: "넘어가기",
      denyButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        navigation("/");
      }
    });
  };

  return (
    <>
      {init ? (
        <Wrapper>
          <Title>이메일 인증</Title>
          <Text>
            인증용 이메일이 발송되었습니다.
            <br />
            이메일을 확인해주세요!
          </Text>
          <ButtonBundle>
            <Button
              onClick={onSkipBtnClick}
              style={{ backgroundColor: "#DC3741" }}
            >
              <BtnText>나중에 하기</BtnText>
            </Button>
            <Button onClick={onBtnClick} style={{ backgroundColor: "#66bb6a" }}>
              <BtnText>완료</BtnText>
            </Button>
          </ButtonBundle>
          <Progress>
            <ProgressText>프로필 생성중...</ProgressText>
            <ProgressbarBox>
              <Progressbar style={{ width: "100%" }}>100%</Progressbar>
            </ProgressbarBox>
          </Progress>
        </Wrapper>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
}
