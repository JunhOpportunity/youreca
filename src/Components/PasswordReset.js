import { useEffect } from "react";
import { authService } from "../firebase";
import styled from "styled-components";
import Swal from "sweetalert2";

const PasswordResetBox = styled.div`
  margin-bottom: 10px;
  cursor: pointer;
  width: 100%;
  height: 50px;
  display:flex;
  justify-content: center;
  align-items: center;
  background-color: #43a047;
  color: white;
  border-radius: 5px;
`;

export default function PasswordReset() {
  const user = authService.currentUser;

  const onClickPasswordResetButton = () => {
    Swal.fire({
      title: "비밀번호를 변경하시겠습니까?",
      icon: "warning",
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "변경",
      denyButtonText: "취소",
    }).then(async (result) => {
      authService.sendPasswordResetEmail(user.email);
      if (result.isConfirmed) {
        console.log("success")
        Swal.fire(
          "이메일을 확인해주세요",
          "비밀번호 변경 이메일을 전송했습니다!",
          "success"
        );
      }
    });
  };

  return <><PasswordResetBox onClick={onClickPasswordResetButton}>비밀번호 변경</PasswordResetBox></>;
}
