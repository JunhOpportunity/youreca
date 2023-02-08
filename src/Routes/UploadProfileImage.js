import { useEffect, useRef, useState } from "react";
import Loading from "../Components/Loading.js";
import { storageService } from "../firebase.js";
import { authService } from "../firebase.js";

export function UploadProfileImage() {
  const [attachment, setAttachment] = useState();
  const [init, setInit] = useState(false);
  const fileInput = useRef();
  let user;

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      user = authService.currentUser;
      setInit(true);
      console.log(user.uid)
    });
  }, []);

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const fileRef = await storageService.ref().child(`123/456`);
    
    const response = await fileRef.putString(attachment, "data_url");
    console.log(response);
  };
  const onClearAttachment = () => {
    fileInput.current.value = "";
    setAttachment(null);
  };
  return (
    <>
      {" "}
      {init ? (
        <>
          <input type="file" accept="image/*" onChange={onFileChange} />
          {attachment && (
            <div>
              <img
                src={attachment}
                ref={fileInput}
                width="50px"
                height="50px"
              />
              <button onClick={onClearAttachment}>clear</button>
              <button onClick={onSubmit}>submit</button>
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
