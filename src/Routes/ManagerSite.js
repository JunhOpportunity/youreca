import styled from "styled-components";
import Header from "../Components/Header";
import { DeleteAccount } from "../Components/DeleteAccountRequest";
import Loading from "../Components/Loading";
import { useEffect, useState } from "react";
import { DeleteReputation } from "../Components/DeleteReputationRequest.js";
import { useGetAllDownDocumentData } from "../Hooks/getDataEffect";
import { authService } from "../firebase";
import { useUserDataInit } from "../Hooks/InitEffect";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;
const TopEmptyBox = styled.div`
  height: 100px;
  @media only screen and (min-width: 768px) {
    height: 150px;
  }
`;

const BottomEmptyBox = styled.div`
  height: 50px;
  @media only screen and (min-width: 768px) {
    height: 0px;
  }
`;

const ManageBox = styled.div`
  padding: 10px;
`;

const ManageBoxTitle = styled.div`
  font-size: 30px;
`;

export default function ManagerSite() {
  const init = useUserDataInit();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      setIsAdmin(user.uid === process.env.REACT_APP_FIREBASE_MANAGER_ID);
    });
  }, []);

  const accountReqData = useGetAllDownDocumentData(
    "Client-Request",
    "Account",
    "Delete"
  );

  const reputationReqData = useGetAllDownDocumentData(
    "Client-Request",
    "Reputation",
    "Delete"
  );

  return (
    <>
      {init ? (
        isAdmin ? (
          <>
            <Header />
            <TopEmptyBox />
            <Wrapper>
              <ManageBox>
                <ManageBoxTitle>계정 데이터 삭제 요청</ManageBoxTitle>
                <DeleteAccount reqData={accountReqData} />
              </ManageBox>
              <ManageBox>
                <ManageBoxTitle>평판 삭제 요청</ManageBoxTitle>
                <DeleteReputation reqData={reputationReqData} />
              </ManageBox>
            </Wrapper>
            <BottomEmptyBox />
          </>
        ) : (
          <Loading />
        )
      ) : (
        <Loading />
      )}
    </>
  );
}
