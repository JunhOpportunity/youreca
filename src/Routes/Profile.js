import ReName from "../Components/ReName";
import Loading from "../Components/Loading";
import styled from "styled-components";
import EmailCertification from "../Components/EmailCertification";
import HeaderTest from "../Components/Header";
import { RechangeProfileImage } from "../Components/RechangeProfileImage";
import { LogoutButton } from "../Components/Logout";
import PasswordReset from "../Components/PasswordReset";
import { useUserDataInit } from "../Hooks/InitEffect";
import RechangeJob from "../Components/RechangeJob";

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
`;

const ProfileBox = styled.div`
  max-width: 1280px;
  width: 100%;
  @media only screen and (min-width: 768px) {
    width: 70%;
  }
  @media only screen and (min-width: 1025px) {
    width: 50%;
  }
`;

const TopEmptyBox = styled.div`
  height: 50px;
  @media only screen and (min-width: 768px) {
    height: 100px;
  }
`;

const BottomEmptyBox = styled.div`
  height: 50px;
  @media only screen and (min-width: 768px) {
    height: 0px;
  }
`;

export default function Profile() {
  const init = useUserDataInit();

  return (
    <>
      {init ? (
        <>
          <HeaderTest />
          <TopEmptyBox />
          <Wrapper>
            <ProfileBox>
              <RechangeProfileImage />
              <EmailCertification />
              <ReName />
              <RechangeJob />
              <PasswordReset />
              <LogoutButton />
            </ProfileBox>
          </Wrapper>
          <BottomEmptyBox />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
