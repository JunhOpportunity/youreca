import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../Components/Header";
import Loading from "../Components/Loading";
import { authService, dbService } from "../firebase";
import Swal from "sweetalert2";


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
  background-color: beige;
  width: 70vw;
  height: 200px;
  resize: none;
  padding: 10px;
  background-color: #c8e6c9;
`;

const InputBtn = styled.input`
  cursor: pointer;
  width: 100%;
  border-radius: 0.25em;
  color: white;
  font-weight: bolder;
  background-color: #66bb6a;
  border: none;
  padding: 10px;
`;

export default function Feedback() {
  const [supplementation, setSupplementation] = useState("");
  const user = authService.currentUser;
  const [init, setInit] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      setInit(true);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("FeedBack").add({
      feedback: supplementation,
      userName: user.displayName,
      userEmail: user.email
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
              <h1>알려주세요!</h1>
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
