import { useEffect, useState } from "react";
import { authService } from "../firebase";
import Loading from "./Loading";

export default function ReName() {
  const user = authService.currentUser;
  const [init, setInit] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      setInit(true);
      console.log(user)
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
    console.log("Right Now:", user.displayName);
    setTimeout(() => {
      console.log("Real Name:", user.displayName);
    }, 3000);
  };

  return (
    <>{init ? 
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="변경할 이름을 입력해주세요."
          value={newDisplayName}
          onChange={onChange}
          required
        />
        <input type="submit" value="변경" />
      </form> : <Loading/>}
    </>
  );
}
