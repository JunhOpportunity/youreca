import { useState } from "react";
import Loading from "../Components/Loading";
import { authService } from "../firebase";
import { dbService } from "../firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  useGetAllDocumentData,
  useGetDocumentData,
} from "../Hooks/getDataEffect";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NameModify = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  padding: 10px;
  width: 70vw;
  height: 50vh;
  transition-duration: 1s;
  box-shadow: 0px 0px 10px #696969;
  :hover {
    transition-duration: 1s;
    box-shadow: 0px 0px 30px #43a047;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
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
  background-color: #43a047;
  color: white;
  text-align: center;
  padding: 5px;
`;

const Text = styled.div`
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: red;
`;

const NameInput = styled.input`
  border: none;
  height: 50px;
  box-shadow: 0px 0px 2px #7bb241;
  outline: none;
  color: #7bb241;
  text-align: center;
  margin-top: 20px;
`;

const SubmitInput = styled.input`
  border: none;
  background-color: #66bb6a;
  color: white;
  height: 50px;
  cursor: pointer;
  margin-top: 20px;
`;

export default function FirstLogin() {
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newNickname, setNewNickname] = useState("");
  const navigation = useNavigate();

  const user = authService.currentUser;
  const userNicknameList = useGetDocumentData("User", "Nickname");

  const onSubmit = async (event) => {
    event.preventDefault();

    if (/^[a-z0-9A-Z]{4,}$/.test(newNickname) == false) {
      return Swal.fire(
        "Error",
        "알파벳과 숫자만을 사용해서 4글자 이상 작성해주세요!",
        "error"
      );
    }

    if (userNicknameList.List.indexOf(newNickname) == -1) {
      user.updateProfile({
        displayName: newDisplayName,
      });

      dbService.collection("User").doc(user.uid).set({
        userEmail: user.email,
        userId: user.uid,
        changedDisplayName: true,
        userNickname: newNickname,
      });

      dbService
        .collection("User")
        .doc("Nickname")
        .set({
          List: [...userNicknameList.List, newNickname],
        });

      navigation("/Responses-Chat/emailverification");
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    name == "realName" ? setNewDisplayName(value) : setNewNickname(value);
  };
  // /^[a-z0-9A-Z]{2,10}$/ +
  return (
    <>
      {userNicknameList ? (
        <Wrapper>
          <NameModify>
            <TitleBox>
              <Title>기본 프로필</Title>
            </TitleBox>
            <Form onSubmit={onSubmit}>
              <NameInput
                name="realName"
                type="text"
                placeholder="당신의 이름은 무엇인가요?"
                value={newDisplayName}
                onChange={onChange}
                required
              />
              <NameInput
                name="nickname"
                type="text"
                placeholder="당신의 닉네임은 무엇인가요?"
                value={newNickname}
                onChange={onChange}
                required
              />
              <Text>
                알파벳과 숫자만을 사용해서 4글자 이상
                <br />
                닉네임은 변경이 불가능하니 주의하세요!
              </Text>
              <SubmitInput type="submit" value="설정" />
            </Form>
          </NameModify>
        </Wrapper>
      ) : (
        <Loading />
      )}
    </>
  );
}
