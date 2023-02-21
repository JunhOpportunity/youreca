import ReName from "../Components/ReName";
import { dbService, authService } from "../firebase";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import ReBox from "../Components/ReBox";
import Loading from "../Components/Loading";
import styled from "styled-components";
import EmailCertification from "../Components/EmailCertification";
import HeaderTest from "../Components/HeaderTest";

const Wrapper = styled.div`
  padding: 10px;
`;

const EmptyBox = styled.div`
  height: 50px;
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
          <EmptyBox/>
          
          <Wrapper>
            <EmailCertification/>
            <ReName re={myResponse} />
            {myResponse ? <ReBox re={myResponse} /> : <></>}
          </Wrapper>
          <EmptyBox/>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
