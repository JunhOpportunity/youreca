import styled from "styled-components";

const Wrapper = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled.div`
  text-align: center;
  font-size: 20px;
  color: #696969;
`;

export function EmptyReputation() {
  console.log("The List Is Empty!")
  return (
    <>
      <Wrapper>
        <TextBox>아직 평판이 없네요!</TextBox>
      </Wrapper>
    </>
  );
}
