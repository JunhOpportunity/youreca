import { useState } from "react";
import Loading from "../Components/Loading";
import { authService } from "../firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGetDocumentData } from "../Hooks/getDataEffect";
import { UpdateTopDocument } from "../Logic/UpdateData";
import { CreateTopDocument } from "../Logic/CreateData";

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
  width: 300px;
  height: 400px;
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
  color: #7bb241;
  text-align: center;
  font-weight: bolder;
  padding: 5px;
  box-shadow: 0px 0px 5px #7bb241;
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
  outline-color: #7bb241;
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

const Progress = styled.div`
  position: fixed;
  bottom: 50px;
  width: 90%;
  padding: 20px;
`;

const ProgressText = styled.div`
  color: #7bb241;
  font-weight: bolder;
  text-align: center;
`;

const ProgressbarBox = styled.div`
  width: 100%;
  height: 40px;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
`;

const Progressbar = styled.div`
  height: 40px;
  background-color: #66bb6a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  font-weight: bolder;
`;

export default function FirstLoginName() {
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
        "닉네임은 알파벳과 숫자만을 사용해서 4글자 이상 작성해주세요!",
        "error"
      );
    }

    if (userNicknameList.List.indexOf(newNickname) == -1) {
      user.updateProfile({
        displayName: newDisplayName,
      });
      CreateTopDocument("User", user.uid, {
        userEmail: user.email,
        userId: user.uid,
        changedDisplayName: true,
        userNickname: newNickname,
        userBetaTester: Date.now() < 1680259308420 ? true : false,
      });

      UpdateTopDocument("User", "Nickname", {
        List: [...userNicknameList.List, newNickname],
      });
      navigation("/firstlogin-2");
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
              <Title>이름 </Title>
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
              <SubmitInput type="submit" value="다음" />
            </Form>
          </NameModify>
          <Progress>
            <ProgressText>프로필 생성중...</ProgressText>
            <ProgressbarBox>
              <Progressbar style={{ width: "25%" }}>25%</Progressbar>
            </ProgressbarBox>
          </Progress>
        </Wrapper>
      ) : (
        <Loading />
      )}
    </>
  );
}
