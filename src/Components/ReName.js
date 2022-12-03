import { useEffect, useState } from "react";
import { authService, dbService } from "../firebase";
import Loading from "./Loading";
import Swal from "sweetalert2";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";

const Form = styled.form``;

const Title = styled.div``;

const NameModify = styled.div``;

const ResponseModify = styled.div``;

const BtnBundle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
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
  width: 200px;
  height: 200px;
  resize: none;
  padding: 10px;
  background-color: #f8f8f8;
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
      console.log("abc", user);
      dbService
        .collection("ReArchive")
        .doc(user.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setDocExist(true);
            console.log("yes");
          } else {
            setDocExist(false);
            console.log("no");
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
    user.updateProfile({
      displayName: newDisplayName,
    });
    dbService
      .collection("ReArchive")
      .doc(user.uid)
      .update({ userDisplayName: newDisplayName });
  };

  // Response Exchange
  const onReChange = (event) => {
    const {
      target: { value },
    } = event;
    setModify(value);
  };

  const onReSubmit = (event) => {
    event.preventDefault();

    // 변경 & 빈칸 만들기
    setTimeout(() => {
      console.log("Real Name:", user.displayName);
      // Doc update https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
      dbService
        .collection("ReArchive")
        .doc(user.uid)
        .update({ response: modify })
        .then()
        .catch((error) => {
          console.log("Doc 없으니까 만들면 제대로 적용 됩니다~!");
        });

      setNewDisplayName("");
    }, 1000);

    // 안내
    let timerInterval;
    Swal.fire({
      title: "변경하는 중입니다...",
      icon: "success",
      timer: 1000,
      timerProgressBar: true,
      showConfirmButton: false,
      willClose: () => {
        clearInterval(timerInterval);
      },
    });
    setModify("");
    setToggle(false);
  };

  const onModifyBtnClick = () => {
    // Modify (Update Doc)
    setToggle((e) => !e);
  };

  const onDeleteBtnClick = () => {
    // Delete
    Swal.fire({
      title: "삭제하시겠습니까?",
      text: "다시 작성하실 수 있습니다!",
      icon: "error",
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      denyButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dbService.doc(`ReArchive/${user.uid}`).delete();
        Swal.fire("삭제되었습니다!", "", "success");
        setDocExist(false);
        // navigate("/")
      }
    });
  };

  const onCancleClick = () => {
    setToggle(false);
  };

  return (
    <>
      {init ? (
        <>
          <NameModify>
            <Title>이름 변경</Title>
            <Form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder={user.displayName}
                value={newDisplayName}
                onChange={onChange}
                required
              />
              <input type="submit" value="변경" />
            </Form>
          </NameModify>
          {docExist ? (
            <BtnBundle>
              <Btn
                onClick={onModifyBtnClick}
                style={{ backgroundColor: "#3085D6" }}
              >
                수정
              </Btn>
              <Btn
                onClick={onDeleteBtnClick}
                style={{ backgroundColor: "#DC3741" }}
              >
                삭제
              </Btn>
            </BtnBundle>
          ) : (
            <></>
          )}
          <ResponseModify>
            {toggle ? (
              <>
                <Title>내용 변경</Title>
                <Form onSubmit={onReSubmit}>
                  <TextArea
                    type="text"
                    placeholder="변경할 내용"
                    value={modify}
                    onChange={onReChange}
                    required
                  />
                  <input type="submit" value="변경" />
                </Form>
                <Btn
                  style={{ backgroundColor: "gray" }}
                  onClick={onCancleClick}
                >
                  취소
                </Btn>
              </>
            ) : (
              <></>
            )}
          </ResponseModify>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
