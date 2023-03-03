import styled from "styled-components";
import HeaderTest from "../Components/HeaderTest";
import { DeleteAccount } from "../Components/DeleteAccountRequest";
import Loading from "../Components/Loading";
import { dbService } from "../firebase";
import { useEffect, useState } from "react";
import { DeleteReputation } from "../Components/DeleteReputationRequest.js";
import { GetAllDownDocumentData } from "../Logic/GetFirestore.js";

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
  const [accountReqData, setAccountReqData] = useState();
  const [reputationReqData, setReputationReqData] = useState();
  const [init, setInit] = useState(false);
  let newdata;
  function getData(requestCategory, request, setFunction) {
    dbService
      .collection("Client-Request")
      .doc(requestCategory)
      .collection(request)
      .orderBy("createdTime", "desc")
      .onSnapshot(async (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({ ...doc.data() }));
        setFunction(newData);
      });
  }
  useEffect(() => {
    const data = GetAllDownDocumentData("Client-Request", "Account", "Delete");
    newdata = GetAllDownDocumentData("Client-Request", "Account", "Delete");
    console.log("data", data);
    setAccountReqData(data);
    //getData("Account", "Delete", setAccountReqData);
    getData("Reputation", "Delete", setReputationReqData);
    setInit(true);
  }, []);

  return (
    <>
      {init ? (
        <>
          <HeaderTest />
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
      )}
    </>
  );
}
