import { useState } from "react";
import FirstLogin from "../Routes/FirstLogin.js";
import Auth from "./Auth.js";
import ReRe from "./ReRe.js";

export default function Home({ userInfo }) {
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  setIsFirstLogin(userInfo.firstLogin);

  return <>{isFirstLogin ? <FirstLogin /> : <ReRe userInfo={userInfo} />}</>;
}
