import { useEffect, useRef, useState } from "react";
import Loading from "../Components/Loading.js";
import { storageService } from "../firebase.js";
import { authService } from "../firebase.js";
import styled from "styled-components";

const InputCircle = styled.div``;

const InputImg = styled.input`
  display: none;
`;

export function UploadProfileImage() {
  const [attachment, setAttachment] = useState();
  const [init, setInit] = useState(false);
  const fileInput = useRef();
  let user = authService.currentUser;

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      user = authService.currentUser;
      setInit(true);
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
    const fileRef = storageService.ref().child(`profileImage/${user.uid}`);
    const response = await fileRef.putString(attachment, "data_url");
    const attachmentUrl = await response.ref.getDownloadURL();
  };

  const onClearAttachment = (e) => {
    console.log(fileInput.current.value);
    fileInput.current.value = null;
    setAttachment(null);
    console.log(attachment);
  };

  return (
    <>
      {init ? (
        <>
          <label for="image-upload">
            Upload Image
            <InputCircle>
              <InputImg
                id="image-upload"
                type="file"
                accept="image/*"
                ref={fileInput}
                onChange={onFileChange}
              />
            </InputCircle>
          </label>
          {attachment && (
            <div>
              <img src={attachment} width="50px" height="50px" />
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
