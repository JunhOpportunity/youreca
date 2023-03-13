import { useState } from "react";
import { authService } from "../firebase";
import Loading from "./Loading";
import Swal from "sweetalert2";
import styled from "styled-components";
import { UpdateTopDocument } from "../Logic/UpdateData";
import { useUserDataInit } from "../Hooks/InitEffect";

const Form = styled.form`
  display: flex;
  justify-content: center;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const Title = styled.div`
  width: 100px;
  border-radius: 25px;
  font-weight: bolder;
  box-shadow: 0px 0px 5px #7bb241;
  color: #7bb241;
  text-align: center;
  padding: 5px;
`;

const NameModify = styled.div`
  border-bottom: 1px solid #43a047;
  padding: 10px;
  margin-bottom: 10px;
`;

const NameInput = styled.input`
  width: 100%;
  border: none;
  height: 25px;
  box-shadow: 0px 0px 2px #7bb241;
`;

const SubmitInput = styled.input`
  border: none;
  background-color: #43a047;
  color: white;
  cursor: pointer;
`;

export default function ReName() {
  const [newDisplayName, setNewDisplayName] = useState("");
  const init = useUserDataInit();
  const user = authService.currentUser;

  // Name Exchange
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    Swal.fire({
      title: "변경하시겠습니까?",
      html: "<h6 style='color:red'> 이름을 변경해도 이미 작성한 글에 대한 이름은 바꿀 수 없습니다. <br/>이름 변경 후에 글을 다시 작성해야 이름 변경이 적용됩니다. </h6>",
      icon: "warning",
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "변경",
      denyButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "변경되었습니다!",
          `당신의 이름: ${newDisplayName}`,
          "success"
        );
        user.updateProfile({
          displayName: newDisplayName,
        });
        UpdateTopDocument("Person", user.uid, {
          userDisplayName: newDisplayName,
        });
      }
    });
  };

  return (
    <>
      {init ? (
        <>
          <NameModify>
            <TitleBox>
              <Title>이름 변경</Title>
            </TitleBox>
            <Form onSubmit={onSubmit}>
              <NameInput
                type="text"
                placeholder={user.displayName}
                value={newDisplayName}
                onChange={onChange}
                required
              />
              <SubmitInput type="submit" value="변경" />
            </Form>
          </NameModify>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
