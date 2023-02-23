import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authService } from "../firebase";
import Swal from "sweetalert2";

const TopWrapper = styled.div`
  z-index: 99;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  position: fixed;
  background-color: #5a9216;
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
  background-color: #5a9216;
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
  background-color: #5a9216;
  @media only screen and (max-width: 767px) {
    display: none;
  }
`;

const Bundle = styled.ol`
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
`;

const Anchor = styled.div`
  text-align: center;
  color: #003d00;
  cursor: pointer;
`;

const Svg = styled.svg`
  width: 25px;
  height: 25px;
  fill: #003d00;
`;

const BottomSvg = styled.svg`
  width: 25px;
  height: 25px;
  cursor: pointer;
  fill: ${(props) => (props.pageMatch ? "#003d00" : "#e1e1e1")};
`;

export default function HeaderTest() {
  const isMainPage = useMatch("/Responses-Chat/");
  const isProfilePage = useMatch("/Responses-Chat/profile");
  const isFeedbackPage = useMatch("/Responses-Chat/feedback");

  const navigation = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    let timerInterval;
    Swal.fire({
      title: "로그아웃 중입니다...",
      icon: "success",
      timer: 1000,
      timerProgressBar: true,
      showConfirmButton: false,
      willClose: () => {
        clearInterval(timerInterval);
      },
    });
    setTimeout(() => {
      navigation("/Responses-Chat");
    }, 1500);
  };

  const onMainClick = () => {
    navigation("/Responses-Chat");
  };

  const onFeedbackClick = () => {
    navigation("/Responses-Chat/feedback");
  };

  const onProfileClick = () => {
    navigation("/Responses-Chat/profile");
  };

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
              <path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" />
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
        </Bd>
      </BottomWrapper>
      {/* Web */}
      <WebHeader>
        <Bundle>
          <Category>
            <Anchor onClick={onMainClick} href="/Responses-Chat/">
              Home
            </Anchor>
          </Category>
          <Category>
            <Anchor onClick={onFeedbackClick} href="/Responses-Chat/feedback">
              Feedback
            </Anchor>
          </Category>
          <Category>
            <Anchor onClick={onProfileClick} href="/Responses-Chat/profile">
              Profile
            </Anchor>
          </Category>
        </Bundle>
      </WebHeader>
    </>
  );
}
