import { useEffect, useRef, useState } from "react";
import Loading from "./Loading.js";
import { dbService, storageService } from "../firebase.js";
import { authService } from "../firebase.js";
import styled from "styled-components";
import Swal from "sweetalert2";
import { UpdateTopDocument } from "../Logic/UpdateData.js";

const Wrapper = styled.div`
  margin-bottom: 10px;
  border: 1px solid #43a047;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProfileImgBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProfileImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  fill: white;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid #66bb6a;
  background-color: #66bb6a;
`;

const InputImg = styled.input`
  display: none;
`;

const InputImgButton = styled.button`
  all: unset; // Remove Button Decoration (23.02.10) https://stackoverflow.com/questions/2460100/remove-the-complete-styling-of-an-html-button-submit
  text-align: center;
  width: 200px;
  height: 50px;
  border-radius: 5px;
  color: #7bb241;
`;

const ButtonDiv = styled.div`
  display: flex;
  gap: 10px;
`;

const ImgButton = styled.div`
  width: 100px;
  height: 30px;
  font-size: 16px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;

export function RechangeProfileImage() {
  const [attachment, setAttachment] = useState();
  const [init, setInit] = useState(false);
  const [currentProfileImage, setCurrentProfileImage] = useState();
  const fileInput = useRef();
  let user = authService.currentUser;

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      user = authService.currentUser;
      dbService
        .collection("User")
        .doc(user.uid)
        .onSnapshot((snapshot) => {
          setCurrentProfileImage(snapshot.data().profileImgUrl);
        });
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
    if (attachment) {
      Swal.fire({
        title: "이 사진으로 선택하시겠습니까?",
        html: "<h6 style='color:red'> 사진을 변경해도 이미 작성한 글에 대한 사진은 바꿀 수 없습니다. <br/>사진 변경 후에 글을 다시 작성해야 사진 변경이 적용됩니다. </h6>",
        icon: "success",
        showCancelButton: false,
        showDenyButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "변경",
        denyButtonText: "취소",
      }).then(async (result) => {
        const fileRef = storageService.ref().child(`profileImage/${user.uid}`);
        const response = await fileRef.putString(attachment, "data_url");
        const attachmentUrl = await response.ref.getDownloadURL();
        if (result.isConfirmed) {
          UpdateTopDocument("User", user.uid, { profileImgUrl: attachmentUrl });
          UpdateTopDocument("Person", user.uid, {
            profileImgUrl: attachmentUrl,
          });
          Swal.fire("변경 되었습니다!", "", "success");
          setAttachment(null);
        }
      });
    }
  };

  const onDelete = async (event) => {
    event.preventDefault();
    Swal.fire({
      title: "삭제하시겠습니까?",
      html: "<h6 style='color:red'> 사진을 삭제해도 이미 작성한 글에 대한 사진은 삭제되지 않습니다. <br/>사진 삭제 후에 글을 다시 작성해야 사진 삭제가 적용됩니다. </h6>",
      icon: "success",
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      denyButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        UpdateTopDocument("User", user.uid, { profileImgUrl: "" });
        UpdateTopDocument("Person", user.uid, { profileImgUrl: "" });
        Swal.fire("삭제 되었습니다!", "", "success");
      }
    });
  };

  const onClearAttachment = (e) => {
    fileInput.current.value = null;
    setAttachment(null);
  };

  const onClickImageUpload = () => {
    fileInput.current.click();
  };

  return (
    <>
      {init ? (
        <Wrapper>
          <ProfileImgBox onClick={onClickImageUpload}>
            {attachment ? (
              <>
                <ProfileImg>
                  <img
                    style={{ transitionDelay: "1s" }}
                    src={attachment}
                    width="100px"
                    height="100px"
                  />
                </ProfileImg>
              </>
            ) : currentProfileImage ? (
              <>
                <ProfileImg>
                  <img
                    style={{ transitionDelay: "1s" }}
                    src={currentProfileImage}
                    width="100px"
                    height="100px"
                  />
                </ProfileImg>
              </>
            ) : (
              <ProfileImg>
                <svg
                  style={{ transitionDuration: "1s" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
              </ProfileImg>
            )}
          </ProfileImgBox>
          <InputImgButton onClick={onClickImageUpload}>
            프로필 사진 변경
          </InputImgButton>
          <ButtonDiv>
            <ImgButton
              onClick={onClearAttachment}
              style={
                attachment
                  ? { display: "flex", backgroundColor: "#DC3741" }
                  : { display: "none" }
              }
            >
              취소
            </ImgButton>
            <ImgButton
              onClick={onSubmit}
              style={
                attachment
                  ? { display: "flex", backgroundColor: "#43a047" }
                  : { display: "none" }
              }
            >
              변경
            </ImgButton>
            <ImgButton
              onClick={onDelete}
              style={
                attachment
                  ? { display: "none" }
                  : { display: "flex", backgroundColor: "red", width: "200px" }
              }
            >
              프로필 사진 삭제
            </ImgButton>
          </ButtonDiv>

          <InputImg
            id="image-upload"
            type="file"
            accept="image/*"
            ref={fileInput}
            onChange={onFileChange}
          />
        </Wrapper>
      ) : (
        <Loading />
      )}
    </>
  );
}
