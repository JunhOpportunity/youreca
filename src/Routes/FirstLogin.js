import { useState } from "react";
import Loading from "../Components/Loading";
import { authService } from "../firebase";
import { dbService } from "../firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

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
            navigation("/");
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
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="실제 이름으로 설정해주세요"
          value={newDisplayName}
          onChange={onChange}
          required
        />
        <input type="submit" value="확인" />
      </form>
    </>
  );
}
