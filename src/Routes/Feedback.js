import { useState } from "react";
import styled from "styled-components";
import Loading from "../Components/Loading";
import { authService } from "../firebase";
import Swal from "sweetalert2";
import Header from "../Components/Header";
import { useUserDataInit } from "../Hooks/InitEffect";
import { CreateTopCollection } from "../Logic/CreateData";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const PageInfo = styled.div`
  text-align: center;
  padding: 50px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextArea = styled.textarea`
  border: none;
  width: 70vw;
  height: 200px;
  resize: none;
  padding: 10px;
  box-shadow: 0px 0px 2px #7bb241;
`;

const InputBtn = styled.input`
  cursor: pointer;
  width: 100%;
  border-radius: 0.25em;
  font-weight: bolder;
  border: none;
  padding: 10px;
  color: white;
  background-color: #7bb241;
`;

export default function Feedback() {
  const [supplementation, setSupplementation] = useState("");
  const user = authService.currentUser;
  const init = useUserDataInit();

  const onSubmit = async (event) => {
    event.preventDefault();
    CreateTopCollection("FeedBack", {
      feedback: supplementation,
      userName: user.displayName,
      userEmail: user.email,
    });
    Swal.fire("등록되었습니다!", "", "success");
    setSupplementation("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSupplementation(value);
  };

  return (
    <>
      {init ? (
        <>
          <Header />
          <Wrapper>
            <PageInfo>
              <h3>개선할 점이 있다면</h3>
              <h2>알려주세요!</h2>
              <h1>+</h1>
              <h3>이 사이트의 사용 소감을</h3>
              <h2>알려주세요!</h2>
            </PageInfo>
            <Form onSubmit={onSubmit}>
              <TextArea
                value={supplementation}
                onChange={onChange}
                type="textarea"
                placeholder="자유롭게 작성해주세요!"
                required
              />
              <InputBtn type="submit" value="제출하기" />
            </Form>
          </Wrapper>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
