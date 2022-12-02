import ReName from "../Components/ReName";
import { dbService, authService } from "../firebase";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import ReBox from "../Components/ReBox";
import Loading from "../Components/Loading";

export default function Profile() {
  const [init, setInit] = useState(false);
  const [myResponse, setMyResponse] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      setInit(true);
      console.log("abc", user);
      dbService
        .collection("ReArchive")
        .doc(user.uid)
        .onSnapshot((snapshot) => {
          console.log(snapshot.data());
          const responseArray = snapshot.data((doc) => ({ ...doc.data() }));
          setMyResponse(responseArray);
        });
    });
  }, []);
  return (
    <>
      {init ? (
        <>
          <Header />
          <ReName re={myResponse}/>
          {myResponse ? <ReBox re={myResponse} /> : <></>}
          
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
