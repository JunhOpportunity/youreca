import styled from "styled-components";

const ProfileImgBox = styled.div`
  width: 50px;
  height: 50px;
  margin: 5px 10px;
  border-radius: 50%;
  background-color: black;
`;

const RereBox = styled.div`
  width: 300px;
  background-color: gray;
  margin-bottom: 20px;
`;

const TopBox = styled.div`
  display: flex;

  align-items: center;
`;

const MiddleBox = styled.div`
  display: flex;
  padding: 10px;
`;

const BottomBox = styled.div`
  display: flex;
  padding: 10px;
`;

const ResponseBox = styled.div`
  width: 250px;
  height: 100px;
  border-radius: 10px;
  background-color: yellow;
`;

export default function ReBox({re}) {
  return (
    <RereBox  key={re.userId}>
      <TopBox>
        <ProfileImgBox></ProfileImgBox>
        {re.userDisplayName || "NAME"}
        {re.representation}
      </TopBox>
      <MiddleBox>
        <ResponseBox>{re.response}</ResponseBox>
      </MiddleBox>
      <BottomBox>
        <h6>{re.createdDetailTime || re.createdTime}</h6>
      </BottomBox>
    </RereBox>
  );
}
