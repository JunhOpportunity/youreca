import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authService } from "../firebase";
import Swal from "sweetalert2";

const Wrapper = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: center;
  position: fixed;
  background-color: #5a9216;
  align-items: space-between;
`;

const Nav = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Bundle = styled.ul`
  display: flex;
  gap: 10px;
  list-style-type: none;
`;

const Category = styled.li``;

const Anchor = styled.a`
  text-decoration: none;
  color: red;
`;

export default function Header() {
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
      navigation("");
    }, 1500);
  };

  return (
    <>
      <Wrapper>
        <Nav>
          <Logo>Logo</Logo>
          <Bundle>
            <Category>
              <Anchor href="/">Main</Anchor>
            </Category>
            <Category>
              <Anchor href="/profile">Profile</Anchor>
            </Category>
            <Category>
              <Anchor href="/feedback">Feedback</Anchor>
            </Category>
            <Category onClick={onLogOutClick}>LogOut</Category>
          </Bundle>
        </Nav>
      </Wrapper>
    </>
  );
}
