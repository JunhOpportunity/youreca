import styled from "styled-components";

const Wrapper = styled.div`
`;

const Box = styled.div`
  width: 200px;
  box-shadow: 0px 0px 3px;
  margin-top: 10px;
  padding: 10px;
`;

const UserName = styled.div`
  font-size: 20px;
`;
const UserInfo = styled.div`
  font-size: 10px;
`;
const RequestText = styled.div`
  background-color: black;
  border-radius: 5rem;
  color: red;
  text-align: center;
  font-size: 15px;
`;
const RequestDate = styled.div`
  font-size: 10px;
  text-align: center;
  color: #696969;
`;

export function RequestBox({ userRequest }) {
  return (
    <>
      {userRequest ? (
        <Box>
          <UserName>{userRequest.userDisplayName}</UserName>
          <UserInfo>
            {userRequest.userEmail}
            <br />
            {userRequest.userId}
          </UserInfo>
          <RequestText>{userRequest.reason}</RequestText>
          <RequestDate>{userRequest.createdTime}</RequestDate>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
}
