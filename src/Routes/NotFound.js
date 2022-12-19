import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: center;
`;

const Text = styled.div`
  font-size: 25px;
  text-align: center;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  height: center;
`;

const Svg = styled.svg`
  width: 100px;
  height: 100px;

  fill: red;
`;

export default function NotFound() {
  const navigation = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigation("/Responses-Chat")
    }, 2000)
  }, []);
  
  return (
    <>
      <Wrapper>
        <Icon>
          <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z" />
          </Svg>
        </Icon>
        <Text>
          없는 페이지 입니다. <br />
          2초 후 메인 페이지로 돌아갑니다.
        </Text>
      </Wrapper>
    </>
  );
}
