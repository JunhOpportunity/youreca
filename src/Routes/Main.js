import { async } from "@firebase/util";
import { useEffect, useState } from "react";
import Auth from "../Components/Auth.js";
import Home from "../Components/Home.js";
import Loading from "../Components/Loading.js";
import { authService } from "../firebase.js";
import { dbService } from "../firebase.js";

export default function Conatct() {
  const [init, setInit] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      console.log(user);
      if (user) {
        setIsLogin(true);

        //처음 로그인인지 확인하는 과정
        const createdDate = user.metadata.createdAt;
        const lastLoginDate = user.metadata.lastLoginAt;
        const idStatus = createdDate === lastLoginDate;

        // First Login Check & Set User Data
        var docRef = await dbService.collection("User").doc(user.uid);
        docRef.get().then((doc) => {
          if (!doc.exists) {
            // Not found Document of User
            dbService.collection("User").doc(user.uid).set({
              userEmail: user.email,
              userId: user.uid,
              changedDisplayName: false,
            });
          }
        });
      } else {
        setIsLogin(false);
      }

      setInit(true);
    });
  }, []);
  return <>{init ? isLogin ? <Home/> : <Auth /> : <Loading />}</>;
}
