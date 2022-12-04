import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authService } from "../firebase";
import Swal from "sweetalert2";
import { useState } from "react";
import { motion } from "framer-motion";
import { Divide as Hamburger } from "hamburger-react";

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  position: fixed;
  background-color: #5a9216;
  align-items: space-between;
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

const NavigationBox = styled(motion.div)`
  width: 100%;
  background-color: #5a9216;
`;
const Bundle = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
  padding: 0px;
`;

const Category = styled.li``;

const Anchor = styled.a`
  text-decoration: none;
  color: red;
`;

const Svg = styled.svg`
  width: 25px;
  height: 25px;
  fill: #003d00;
`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
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
      navigation("/");
    }, 1500);
  };

  const logoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath: "circle(30px at 40px 40px)",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <>
      <Wrapper>
        <Nav>
          <Logo onClick={logoClick}>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 47.63 19.91 91.25 52.91 126.2c-14.88 39.5-45.87 72.88-46.37 73.25c-6.625 7-8.375 17.25-4.625 26C5.818 474.2 14.38 480 24 480c61.5 0 109.1-25.75 139.1-46.25C191.1 442.8 223.3 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32zM256.1 400c-26.75 0-53.12-4.125-78.38-12.12l-22.75-7.125l-19.5 13.75c-14.25 10.12-33.88 21.38-57.5 29c7.375-12.12 14.37-25.75 19.88-40.25l10.62-28l-20.62-21.87C69.82 314.1 48.07 282.2 48.07 240c0-88.25 93.25-160 208-160s208 71.75 208 160S370.8 400 256.1 400z" />
            </Svg>
          </Logo>
          <NavigateIcon>
            <Hamburger
              size={25}
              easing="ease-in"
              rounded
              toggled={isOpen}
              toggle={setIsOpen}
            />
          </NavigateIcon>
          <NavigationBox
            initial={{ height: "0", transition: "ease-in" }}
            animate={{
              height: isOpen ? "100vh" : "0",
              transition: "ease-in",
            }}
          >
            <Bundle variants={container} initial="hidden" animate="show">
              <Category variants={item}>
                <Anchor href="/">Main</Anchor>
              </Category >
              <Category variants={item}>
                <Anchor href="/profile">Profile</Anchor>
              </Category>
              <Category variants={item}>
                <Anchor href="/feedback">Feedback</Anchor>
              </Category>
              <Category onClick={onLogOutClick}>LogOut</Category>
            </Bundle>
          </NavigationBox>
        </Nav>
      </Wrapper>
    </>
  );
}
