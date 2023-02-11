import { useEffect, useRef, useState } from "react";
import Loading from "../Components/Loading.js";
import { dbService, storageService } from "../firebase.js";
import { authService } from "../firebase.js";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ProfileImgBox = styled.div`
  height: 200px;
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
  border: 1px solid #7bb241;
  background-color: #7bb241;
`;

const InputImg = styled.input`
  display: none;
`;

const InputImgButton = styled.button`
  all: unset; // Remove Button Decoration (23.02.10) https://stackoverflow.com/questions/2460100/remove-the-complete-styling-of-an-html-button-submit
  text-align: center;
  width: 200px;
  height: 50px;
  border-radius: 25px;
  background-color: #696969;
`;

const ButtonDiv = styled.div`
  display: flex;
`;

const ImgButton = styled.button`
  transition-duration: 0.5s;
  width: 200px;
  height: 50px;
  border: 0;
  font-size: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25em;
  color: white;
  cursor: pointer;
`;

const SelectDefaultImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #66bb6a;
  color: white;
  height: 50px;
  position: fixed;
  bottom: 0;
  width: 100%;
  cursor: pointer;
`;

export function UploadProfileImage() {
  const navigation = useNavigate();
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


  // 첫 로그인 시 프로필 이미지 설정 (Set Profile Image At First Login)
  const onSubmit = async (event) => {
    event.preventDefault();
    if (attachment) {
      const fileRef = storageService.ref().child(`profileImage/${user.uid}`);
      const response = await fileRef.putString(attachment, "data_url");
      const attachmentUrl = await response.ref.getDownloadURL();
      console.log(attachmentUrl)

      Swal.fire({
        title: "이 사진으로 선택하시겠습니까?",
        text: "프로필 사진은 Profile 페이지에서 변경하실 수 있습니다.",
        icon: "success",
        showCancelButton: false,
        showDenyButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "확인",
        denyButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          dbService
            .collection("User")
            .doc(user.uid)
            .update({ profileImgUrl: attachmentUrl });
          Swal.fire("업로드 되었습니다!", "", "success");
          setTimeout(() => {
            navigation("/Responses-Chat/");
          }, 1000);
        }
      });
    }
  };

  // 기본 이미지로 설정하는 버튼을 클릭했을 경우 (In case of Clicked Set Default Image Button)
  const onClickedDefaultImageButton = () => {
    navigation("/Responses-Chat/");
  };

  const onClearAttachment = (e) => {
    console.log(fileInput.current.value);
    fileInput.current.value = null;
    setAttachment(null);
    console.log(attachment);
  };

  const onClickImageUpload = () => {
    fileInput.current.click();
  };

  return (
    <>
      {init ? (
        <Wrapper>
          <ProfileImgBox>
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
            사진 첨부하기
          </InputImgButton>
          <ButtonDiv>
            <ImgButton
              onClick={onClearAttachment}
              style={
                attachment
                  ? { visibility: "visible", backgroundColor: "#DC3741" }
                  : { visibility: "hidden" }
              }
            >
              삭제
            </ImgButton>
            <ImgButton
              onClick={onSubmit}
              style={
                attachment
                  ? { visibility: "visible", backgroundColor: "#3085D6" }
                  : { visibility: "hidden" }
              }
            >
              업로드
            </ImgButton>
          </ButtonDiv>

          <InputImg
            id="image-upload"
            type="file"
            accept="image/*"
            ref={fileInput}
            onChange={onFileChange}
          />
          <SelectDefaultImage onClick={onClickedDefaultImageButton}>
            기본 이미지로 설정하기
          </SelectDefaultImage>
        </Wrapper>
      ) : (
        <Loading />
      )}
    </>
  );
}