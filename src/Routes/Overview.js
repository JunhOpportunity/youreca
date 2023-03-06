import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const TextBox = styled.div`
  width: 400px;
  margin-bottom: 100px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: bolder;
  margin-bottom: 20px;
`;

const Text = styled.div`
  font-size: 18px;
  text-align: center;
`;

const SiteBox = styled.div`
  text-decoration: none;
  box-sizing: border-box;
  height: 50px;
  width: 300px;
  border-radius: 25px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: black;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
`;

const LogoSvg = styled.svg`
  width: 50px;
  height: 50px;
  fill: #003d00;
`;

const DistributeBar = styled.div`
  width: 2px;
  height: 40px;
  background-color: white;
`;

const SiteName = styled.div`
  color: white;
`;

export default function Overview() {
  const navigate = useNavigate();
  const onClickBtn = () => {
    navigate("/");
  };
  return (
    <>
      <Wrapper>
        <TextBox>
          <Title>YOURECA</Title>
          <Text
            style={{
              fontWeight: "bolder",
              fontSize: "15px",
              marginBottom: "50px",
            }}
          >
            Your Reputations will be your Career.
            <br />
            당신의 평판들은 당신의 경력이 될 것이다.
          </Text>
          <Text>
            베타 테스트에 참여해주셔서 감사합니다.
            <br />이 테스트는 요청자의 취업이나 포트폴리오에 <br />
            정말 많은 도움이 될 수 있습니다.
            <br /> 다소 시간이 걸릴 수 있지만 <br />
            테스트 해주시면 감사하겠습니다.
            <br /> 다시한번 감사드립니다.
            <br />
            <br />
            Developer : 김준호 (JunhOpportunity)
          </Text>
        </TextBox>
        <SiteBox onClick={onClickBtn} style={{ backgroundColor: "#5a9216" }}>
          <LogoSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path d="M208 0C322.9 0 416 78.8 416 176C416 273.2 322.9 352 208 352C189.3 352 171.2 349.7 153.9 345.8C123.3 364.8 79.13 384 24.95 384C14.97 384 5.93 378.1 2.018 368.9C-1.896 359.7-.0074 349.1 6.739 341.9C7.26 341.5 29.38 317.4 45.73 285.9C17.18 255.8 0 217.6 0 176C0 78.8 93.13 0 208 0zM164.6 298.1C179.2 302.3 193.8 304 208 304C296.2 304 368 246.6 368 176C368 105.4 296.2 48 208 48C119.8 48 48 105.4 48 176C48 211.2 65.71 237.2 80.57 252.9L104.1 277.8L88.31 308.1C84.74 314.1 80.73 321.9 76.55 328.5C94.26 323.4 111.7 315.5 128.7 304.1L145.4 294.6L164.6 298.1zM441.6 128.2C552 132.4 640 209.5 640 304C640 345.6 622.8 383.8 594.3 413.9C610.6 445.4 632.7 469.5 633.3 469.9C640 477.1 641.9 487.7 637.1 496.9C634.1 506.1 625 512 615 512C560.9 512 516.7 492.8 486.1 473.8C468.8 477.7 450.7 480 432 480C350 480 279.1 439.8 245.2 381.5C262.5 379.2 279.1 375.3 294.9 369.9C322.9 407.1 373.9 432 432 432C446.2 432 460.8 430.3 475.4 426.1L494.6 422.6L511.3 432.1C528.3 443.5 545.7 451.4 563.5 456.5C559.3 449.9 555.3 442.1 551.7 436.1L535.9 405.8L559.4 380.9C574.3 365.3 592 339.2 592 304C592 237.7 528.7 183.1 447.1 176.6L448 176C448 159.5 445.8 143.5 441.6 128.2H441.6z" />
          </LogoSvg>
          <DistributeBar />
          <SiteName>YOURECA 접속하기</SiteName>
        </SiteBox>
      </Wrapper>
    </>
  );
}
