import { useEffect, useState } from "react";
import { authService, dbService } from "../firebase";
import Loading from "./Loading";
import Swal from "sweetalert2";
import styled from "styled-components";

const Form = styled.form``;

const Title = styled.div`
  padding-top: 100px;
`;

export default function ReName({re}) {
  const user = authService.currentUser;
  const [init, setInit] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      setInit(true);
      console.log("abc", user);
    });
  }, []);

  const [newDisplayName, setNewDisplayName] = useState("");

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

    const onReChange = (event) => {
      const {
        target: { value },
      } = event;
      setNewDisplayName(value);
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
          .update({ userDisplayName: newDisplayName })
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
    };

    return (
      <>
        {init ? (
          <>
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
            <Form onSubmit={onReSubmit}>
              <input
                type="text"
                placeholder={user.displayName}
                value={newDisplayName}
                onChange={onReChange}
                required
              />
              <input type="submit" value="변경" />
            </Form>
          </>
        ) : (
          <Loading />
        )}
      </>
    );
  };
}
