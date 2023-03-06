import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";

const TopWrapper = styled.div`
  z-index: 99;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  position: fixed;
  background-color: white;
  box-shadow: 0px 0px 2px;
  align-items: space-between;
`;

// Mobile Header (Width < 768px)
const BottomWrapper = styled.div`
  z-index: 99;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  background-color: white;
  box-shadow: 0px 0px 2px;
  align-items: space-between;
  @media only screen and (min-width: 768px) {
    visibility: hidden;
  }
`;

const Nav = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  position: relative;
  padding: 10px 0px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavigateIcon = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
`;

const NavigationBox = styled.div`
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  width: 50%;
  height: 100vh;
  display: flex;
  background-color: #5a9216;
`;

const Bd = styled.ul`
  list-style-type: none;
  padding: 0px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const List = styled.li`
  width: 25px;
  height: 25px;
  fill: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Web Header (Width >= 768px)
const WebHeader = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 50px;
  width: 100%;
  position: fixed;
  top: 50px;
  background-color: white;
  box-shadow: 0px 0px 2px;
  @media only screen and (max-width: 767px) {
    display: none;
  }
`;

const Bundle = styled.ol`
  max-width: 1280px;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  gap: 10px;
  text-align: center;
  padding: 0px;
  margin: 0px;
  list-style-type: none;
`;

const Category = styled.li`
  color: #003d00;
  font-weight: bolder;
  padding: 5px;
  width: 200px;
  border-radius: 25rem;
  border: ${(props) =>
    props.pageMatch ? "1px dashed #7bb241" : "1px solid transparent"};
`;

const Anchor = styled.div`
  text-align: center;
  color: #003d00;
  cursor: pointer;
`;

const Svg = styled.svg`
  width: 25px;
  height: 25px;
  fill: #7bb241;
`;

const BottomSvg = styled.svg`
  width: 25px;
  height: 25px;
  cursor: pointer;
  fill: ${(props) => (props.pageMatch ? "#7bb241" : "#4e4e4e6e")};
`;

export default function HeaderTest() {
  const isMainPage = useMatch("/");
  const isProfilePage = useMatch("/profile");
  const isFeedbackPage = useMatch("/feedback");
  const isCSCPage = useMatch("/client-service-center");

  const navigation = useNavigate();

  const onMainClick = () => {
    navigation("/");
  };

  const onFeedbackClick = () => {
    navigation("/feedback");
  };

  const onProfileClick = () => {
    navigation("/profile");
  };

  const onClientServiceCenterClick = () => {
    navigation("/client-service-center")
  }

  const logoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <TopWrapper>
        <Nav>
          <Logo onClick={logoClick}>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 47.63 19.91 91.25 52.91 126.2c-14.88 39.5-45.87 72.88-46.37 73.25c-6.625 7-8.375 17.25-4.625 26C5.818 474.2 14.38 480 24 480c61.5 0 109.1-25.75 139.1-46.25C191.1 442.8 223.3 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32zM256.1 400c-26.75 0-53.12-4.125-78.38-12.12l-22.75-7.125l-19.5 13.75c-14.25 10.12-33.88 21.38-57.5 29c7.375-12.12 14.37-25.75 19.88-40.25l10.62-28l-20.62-21.87C69.82 314.1 48.07 282.2 48.07 240c0-88.25 93.25-160 208-160s208 71.75 208 160S370.8 400 256.1 400z" />
            </Svg>
          </Logo>
          <NavigateIcon></NavigateIcon>
        </Nav>
      </TopWrapper>

      {/* Mobile */}
      <BottomWrapper>
        <Bd>
          <List onClick={onMainClick}>
            <BottomSvg
              pageMatch={isMainPage}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
            </BottomSvg>
          </List>
          <List onClick={onFeedbackClick}>
            <BottomSvg
              pageMatch={isFeedbackPage}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3 0 0 0 0 0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
            </BottomSvg>
          </List>
          <List onClick={onProfileClick}>
            <BottomSvg
              pageMatch={isProfilePage}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </BottomSvg>
          </List>
          <List onClick={onClientServiceCenterClick}>
            <BottomSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M256 48C141.1 48 48 141.1 48 256v40c0 13.3-10.7 24-24 24s-24-10.7-24-24V256C0 114.6 114.6 0 256 0S512 114.6 512 256V400.1c0 48.6-39.4 88-88.1 88L313.6 488c-8.3 14.3-23.8 24-41.6 24H240c-26.5 0-48-21.5-48-48s21.5-48 48-48h32c17.8 0 33.3 9.7 41.6 24l110.4 .1c22.1 0 40-17.9 40-40V256c0-114.9-93.1-208-208-208zM144 208h16c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H144c-35.3 0-64-28.7-64-64V272c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64v48c0 35.3-28.7 64-64 64H352c-17.7 0-32-14.3-32-32V240c0-17.7 14.3-32 32-32h16z" />
            </BottomSvg>
          </List>
        </Bd>
      </BottomWrapper>
      {/* Web */}
      <WebHeader>
        <Bundle>
          <Category pageMatch={isMainPage}>
            <Anchor onClick={onMainClick} href="/">
              Home
            </Anchor>
          </Category>
          <Category pageMatch={isFeedbackPage}>
            <Anchor onClick={onFeedbackClick} href="/feedback">
              Feedback
            </Anchor>
          </Category>
          <Category pageMatch={isProfilePage}>
            <Anchor onClick={onProfileClick} href="/profile">
              Profile
            </Anchor>
          </Category>
          <Category pageMatch={isCSCPage}>
            <Anchor onClick={onClientServiceCenterClick} href="/profile">
              Client Service
            </Anchor>
          </Category>
        </Bundle>
      </WebHeader>
    </>
  );
}
