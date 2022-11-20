import styled from "styled-components";

const Title = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 50px;
  font-weight: lighter;
  color: white;
`;

export default function Loading() {
  return (
    <>
      <Title>Loading..</Title>
    </>
  );
}
