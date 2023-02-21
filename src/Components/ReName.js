import { useEffect, useState } from "react";
import { authService, dbService } from "../firebase";
import Loading from "./Loading";
import Swal from "sweetalert2";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  background-color: #43a047;
  color: white;
  text-align: center;
  padding: 5px;
`;

const NameModify = styled.div`
  border: 1px solid green;
  padding: 10px;
  margin-bottom: 10px;
`;

const NameInput = styled.input`
  width: 100%;
  border: none;
  height: 25px;
  background-color: #c8e6c9;
`;

const Distribute = styled.div`
  display: flex;
  justify-content: center;
`;
const DistributeBar = styled.div`
  width: 100%;
  height: 1px;
  background-color: gray;
  margin: 20px 0px;
`;

const ResponseModify = styled.div``;

const BtnBundle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Btn = styled.button`
  cursor: pointer;
  width: 50vw;
  height: 30px;
  border: 0;
  border-radius: 0.25em;
  color: white;
  font-weight: bolder;
`;

const TextArea = styled.textarea`
  border: none;
  background-color: beige;
  width: 100%;
  height: 200px;
  resize: none;
  padding: 10px;
  background-color: #c8e6c9;
`;

const SubmitInput = styled.input`
  border: none;
  background-color: #66bb6a;
  color: white;
`;

const Text = styled.div`
  font-size: 5px;
  text-align: center;
  color: red;
  font-weight: bold;
`;

export default function ReName() {
  const [newDisplayName, setNewDisplayName] = useState("");
  const [init, setInit] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [docExist, setDocExist] = useState(false);
  const [modify, setModify] = useState("");

  const navigate = useNavigate();

  const user = authService.currentUser;

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      setInit(true);
      dbService
        .collection("ReArchive")
        .doc(user.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setDocExist(true);
          } else {
            setDocExist(false);
          }
        });
    });
  }, []);

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
        dbService
          .collection("ReArchive")
          .doc(user.uid)
          .update({ userDisplayName: newDisplayName });
        dbService
          .collection("Person")
          .doc(user.uid)
          .update({ userDisplayName: newDisplayName })
          .then()
          .catch((error) => {
            console.log("Doc 없으니까 만들면 제대로 적용 됩니다~!");
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
