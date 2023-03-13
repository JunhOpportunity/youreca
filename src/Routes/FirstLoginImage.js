import { useRef, useState } from "react";
import Loading from "../Components/Loading.js";
import { dbService, storageService } from "../firebase.js";
import { authService } from "../firebase.js";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useUserDataInit } from "../Hooks/InitEffect.js";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 10px;
`;

const Title = styled.div`
  width: 100px;
  border-radius: 25px;
  color: #7bb241;
  text-align: center;
  font-weight: bolder;
  padding: 5px;
  box-shadow: 0px 0px 5px #7bb241;
`;

const ProfileImgBox = styled.div`
  height: 150px;
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
  color: white;
  background-color: #66bb6a;
`;

const ButtonDiv = styled.div`
  display: flex;
  gap: 10px;
`;

const ImgButton = styled.button`
  transition-duration: 0.5s;
  width: 100px;
  height: 50px;
  border: 0;
  font-size: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25em;
  font-weight: bolder;
  color: white;
  cursor: pointer;
`;

const SelectDefaultImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: red;
  color: white;
  height: 50px;
  width: 200px;
  cursor: pointer;
  border-radius: 5px;
`;

export function FirstLoginImage() {
  const navigation = useNavigate();
  const [attachment, setAttachment] = useState();
  const init = useUserDataInit();
  const fileInput = useRef();
  let user = authService.currentUser;

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
      Swal.fire({
        title: "이 사진으로 선택하시겠습니까?",
        text: "프로필 페이지에서 변경하실 수 있습니다.",
        icon: "success",
        showCancelButton: false,
        showDenyButton: true,
        confirmButtonColor: "#66bb6a",
        cancelButtonColor: "#d33",
        confirmButtonText: "확인",
        denyButtonText: "취소",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const fileRef = storageService
            .ref()
            .child(`profileImage/${user.uid}`);
          const response = await fileRef.putString(attachment, "data_url");
          const attachmentUrl = await response.ref.getDownloadURL();
          dbService
            .collection("User")
            .doc(user.uid)
            .update({ profileImgUrl: attachmentUrl });
          Swal.fire("등록 되었습니다!", "", "success");
          setTimeout(() => {
            navigation("/firstlogin-4");
          }, 1000);
        }
      });
    }
  };

  // 기본 이미지로 설정하는 버튼을 클릭했을 경우 (In case of Clicked Set Default Image Button)
  const onClickedDefaultImageButton = () => {
    navigation("/firstlogin-4");
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
          <Title>프로필 사진</Title>
          <ProfileImgBox>
            {attachment ? (
              <>
                <ProfileImg>
                  <img src={attachment} width="100px" height="100px" />
                </ProfileImg>
              </>
            ) : (
              <ProfileImg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
              </ProfileImg>
            )}
          </ProfileImgBox>
          <InputImgButton onClick={onClickImageUpload}>
            사진 선택하기
          </InputImgButton>
          <InputImg
            id="image-upload"
            type="file"
            accept="image/*"
            ref={fileInput}
            onChange={onFileChange}
          />
          <SelectDefaultImage
            style={attachment ? { display: "none" } : { display: "flex" }}
            onClick={onClickedDefaultImageButton}
          >
            나중에 하기
          </SelectDefaultImage>
          <ButtonDiv>
            <ImgButton
              onClick={onClearAttachment}
              style={
                attachment
                  ? { display: "flex", backgroundColor: "#DC3741" }
                  : { display: "none" }
              }
            >
              삭제
            </ImgButton>
            <ImgButton
              onClick={onSubmit}
              style={
                attachment
                  ? { display: "flex", backgroundColor: "#66bb6a" }
                  : { display: "none" }
              }
            >
              업로드
            </ImgButton>
          </ButtonDiv>
        </Wrapper>
      ) : (
        <Loading />
      )}
    </>
  );
}
