import ReName from "../Components/ReName";
import { dbService, authService } from "../firebase";
import { useEffect, useState } from "react";
import ReBox from "../Components/ReBox";
import Loading from "../Components/Loading";
import styled from "styled-components";
import EmailCertification from "../Components/EmailCertification";
import HeaderTest from "../Components/HeaderTest";
import { RechangeProfileImage } from "../Components/RechangeProfileImage";
import { LogoutButton } from "../Components/Logout";

const Wrapper = styled.div`
  padding: 10px;
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
  const [init, setInit] = useState(false);
  const [myResponse, setMyResponse] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      setInit(true);

      dbService
        .collection("ReArchive")
        .doc(user.uid)
        .onSnapshot((snapshot) => {
          const responseArray = snapshot.data((doc) => ({ ...doc.data() }));
          setMyResponse(responseArray);
        });
    });
  }, []);
  return (
    <>
      {init ? (
        <>
          <HeaderTest />
          <TopEmptyBox />
          <Wrapper>
            <RechangeProfileImage />
            <EmailCertification />
            <ReName re={myResponse} />
            {myResponse ? <ReBox re={myResponse} /> : <></>}
            <LogoutButton />
          </Wrapper>
          <BottomEmptyBox />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
