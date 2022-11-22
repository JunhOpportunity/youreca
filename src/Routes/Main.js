import { useEffect, useState } from "react";
import Auth from "../Components/Auth.js";
import Home from "../Components/Home.js";
import Loading from "../Components/Loading.js";
import { authService} from "../firebase.js";
import FirstLogin from "./FirstLogin.js";

export default function Conatct() {
  const [init, setInit] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        //처음 로그인인지 확인하는 과정
        const createdDate = user.metadata.createdAt;
        const lastLoginDate = user.metadata.lastLoginAt;
        const idStatus = createdDate === lastLoginDate;


        // Login & Info
        setIsLogin(true);
        setUserInfo({
          userEmail: user.email,
          userId: user.uid,
          firstLogin: idStatus,
          changedDisplayName: false,
        });


        console.log("User Active? ", user);
        console.log(user.displayName);
      } else {
        setIsLogin(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        isLogin ? (
          <Home userInfo={userInfo} />
        ) : (
          <Auth userInfo={userInfo} />
        )
      ) : (
        <Loading />
      )}
    </>
  );
}
