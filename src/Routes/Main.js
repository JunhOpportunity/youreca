import { useEffect, useState } from "react";
import Auth from "../Components/Auth.js";
import Home from "../Components/Home.js";
import Loading from "../Components/Loading.js";
import { authService } from "../firebase.js";

export default function Conatct() {
  const [init, setInit] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        console.log("User Active? ", user);
        setIsLogin(true);
        setUserInfo({
          userEmail : user.email,
          userId : user.uid,
        });
      }else {
        setIsLogin(false);
      }
      setInit(true);
    })
  },[])
  return (
  <>{init ? (
    isLogin ? <Home userInfo={userInfo}/> : <Auth userInfo={userInfo}/>) : <Loading/>}
    
  </>);
}
