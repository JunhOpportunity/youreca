import styled from "styled-components";
import HeaderTest from "../Components/HeaderTest";
import { DeleteAccount } from "../Components/Management";
import Loading from "../Components/Loading";
import { dbService } from "../firebase";
import { useEffect, useState } from "react";

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
  const [accountReqData, setAccountReqDataData] = useState();
  const [reputationReqData, setReputationReqData] = useState();
  const [init, setInit] = useState(false);

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
    getData("Account", "Delete", setAccountReqDataData);
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
              <ManageBoxTitle>계정 삭제 요청</ManageBoxTitle>
              <DeleteAccount reqData={accountReqData} />
            </ManageBox>
            <ManageBox>
              <ManageBoxTitle>평판 삭제 요청</ManageBoxTitle>
              <DeleteAccount reqData={reputationReqData} />
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
