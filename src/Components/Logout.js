import { authService } from "../firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LogoutBtn = styled.div`
  cursor: pointer;
  width: 100%;
  height: 50px;
  display:flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  color: white;
  border-radius: 5px;
`;

export function LogoutButton () {
  const navigation = useNavigate();
  const onLogOutClick = () => {
    
    
    let timerInterval;
    Swal.fire({
      title: "로그아웃 중입니다...",
      icon: "success",
      timer: 250,
      timerProgressBar: true,
      showConfirmButton: false,
      willClose: () => {
        clearInterval(timerInterval);
      },
    });
    authService.signOut();
    navigation("/");
  };
  return (
    <>
      <LogoutBtn onClick={onLogOutClick}>로그아웃</LogoutBtn>
    </>
  )
}