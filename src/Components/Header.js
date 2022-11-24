
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vh;
  height: 100px;
  position: fixed;
  top: 0px;
`;

const Logo = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
`;

const Bundle = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export default function Header() {
  return (
    <>
      <Wrapper>
        <Logo></Logo>
        <Bundle></Bundle>
      </Wrapper>
    </>
  );
}
