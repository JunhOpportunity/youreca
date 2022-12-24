import { useState } from "react";
import Loading from "../Components/Loading";
import { authService } from "../firebase";
import { dbService } from "../firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  display:flex;
  justify-content: center;
  align-items: center;
`;

const NameModify = styled.div`
  display:flex;
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



const NameInput = styled.input`
  border: none;
  height: 50px;
  background-color: #c8e6c9;
  outline: none;
  transition-duration: 1s;
  color: white;
  text-align: center;
  ::placeholder {
      color: #43a047;
      transition-duration: 1s;
      text-align: center;
    }
  :focus {
    background-color: #43a047;
    transition-duration: 1s;
    ::placeholder {
      color: white;
      transition-duration: 1s;
    }
  }
`;

const SubmitInput = styled.input`
  border: none;
  background-color: #66bb6a;
  color: white;
  height: 50px;
`;



export default function FirstLogin() {
  const user = authService.currentUser;

  const [newDisplayName, setNewDisplayName] = useState("");
  const navigation = useNavigate();

  const contactOnClick = () => {
    Swal.fire("정확하게 입력해주세요. \n ");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (user.displayName === null || user.displayName) {
      if (user.displayName === newDisplayName) {
        contactOnClick();
      } else {
        user.updateProfile({
          displayName: newDisplayName,
        });

        dbService
          .collection("User")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              dbService.collection("User").doc(user.uid).set({
                userEmail: user.email,
                userId: user.uid,
                changedDisplayName: true,
              });
            }
            navigation("/Responses-Chat/emailverification");
          });
      }
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  return (
    <>
      <Wrapper>
        <NameModify>
          <TitleBox>
            <Title>기본 프로필</Title>
          </TitleBox>
          <Form onSubmit={onSubmit}>
            <NameInput
              type="text"
              placeholder="실제 이름으로 설정해주세요!"
              value={newDisplayName}
              onChange={onChange}
              required
            />
            <SubmitInput type="submit" value="변경" />
          </Form>
        </NameModify>
      </Wrapper>
    </>
  );
}
