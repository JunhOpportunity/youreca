import { useEffect, useState } from "react";
import Auth from "../Components/Auth.js";
import Home from "../Components/Home.js";
import Loading from "../Components/Loading.js";
import { authService } from "../firebase.js";
import { dbService } from "../firebase.js";
import { useUserDataInit } from "../Hooks/InitEffect.js";
import { CreateTopDocument } from "../Logic/CreateData.js";

export default function Main() {
  const init = useUserDataInit();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLogin(true);

        // First Login Check & Set User Data
        var docRef = await dbService.collection("User").doc(user.uid);
        docRef.get().then((doc) => {
          if (!doc.exists) {
            // Not found Document of User
            CreateTopDocument("User", user.uid, {
              userEmail: user.email,
              userId: user.uid,
              changedDisplayName: false,
            });
          }
        });
      } else {
        setIsLogin(false);
      }
    });
  }, []);

  return <>{init ? isLogin ? <Home /> : <Auth /> : <Loading />}</>;
}
