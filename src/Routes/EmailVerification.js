import { useEffect, useState } from "react";
import { authService } from "../firebase";

export default function EmailVerification() {
  const [init, setInit] = useState(false);
  const user = authService.currentUser;
  console.log(user.email)
  setTimeout(() => {user.sendEmailVerification()}, 3000);
  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      setInit(true);
    });
  }, []);
  return <>{init ? <></> : <></>}</>;
}
