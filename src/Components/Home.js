import { useEffect, useState } from "react";
import { authService } from "../firebase.js";
import { dbService } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import FirstLogin from "../Routes/FirstLogin.js";
import Auth from "./Auth.js";
import Loading from "./Loading.js";
import ReRe from "./ReRe.js";

export default function Home() {
  const navigation = useNavigate();
  const [isChanged, setIsChanged] = useState();
  const [init, setInit] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        var docRef = dbService.collection("User").doc(user.uid);
        await docRef.get().then(async (doc) => {
          if (doc.exists) {
            setIsChanged(doc.data().changedDisplayName)
          }
        });
      }
      setInit(true); 
    });
    
  }, []);

  return <>{init ? (isChanged ? <ReRe /> : navigation("/firstlogin")) : <Loading/>}</>;
}
