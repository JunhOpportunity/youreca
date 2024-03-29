import styled from "styled-components";
import Header from "../Components/Header";
import { DeleteAccount } from "../Components/DeleteAccountRequest";
import Loading from "../Components/Loading";
import { useEffect, useState } from "react";
import { DeleteReputation } from "../Components/DeleteReputationRequest.js";
import {
  useGetAllDocumentData,
  useGetAllDocumentDataArrange,
  useGetAllDownDocumentData,
} from "../Hooks/getDataEffect";
import { authService } from "../firebase";
import { useUserDataInit } from "../Hooks/InitEffect";
import FeedbackBox from "../Components/FeedbackBox";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const FeedbackBundle = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (min-width: 1025px) {
    grid-template-columns: repeat(3, 1fr);
  }
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

  const feedbackData = useGetAllDocumentDataArrange(
    "FeedBack",
    "created",
    "desc"
  );

  console.log(feedbackData);

  return (
    <>
      {init ? (
        isAdmin ? (
          <>
            <Header />
            <TopEmptyBox />
            <Wrapper>
              <ManageBox>
                <ManageBoxTitle>피드백</ManageBoxTitle>
                <FeedbackBundle>
                  {feedbackData ? (
                    feedbackData.map((data) => {
                      return <FeedbackBox feedbackData={data}></FeedbackBox>;
                    })
                  ) : (
                    <></>
                  )}
                </FeedbackBundle>
              </ManageBox>
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
