import { RequestBox } from "./RequestBox";
import styled from "styled-components";
import { DeleteUserReputation } from "../Logic/DeleteUserData.js";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  @media only screen and (min-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media only screen and (min-width: 1025px) {
    grid-template-columns: repeat(4, 1fr);
  }
  gap: 10px;
`;

export function DeleteReputation({ reqData }) {
  return (
    <Wrapper>
      {reqData ? (
        reqData.map((userRequest) => <RequestBox userRequest={userRequest}  requestFunction={DeleteUserReputation}/>)
      ) : (
        <></>
      )}
    </Wrapper>
  );
}
