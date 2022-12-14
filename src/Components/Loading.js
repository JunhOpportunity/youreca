import styled from "styled-components";
import "animate.css";

const Title = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  font-weight: lighter;
  color: white;
`;
const TitleText = styled.div`
  font-size: 50px;
`;

export default function Loading() {
  return (
    <>
      <Title>
        <h1 class="animate__animated animate__flash">Loading..</h1>
      </Title>
    </>
  );
}
