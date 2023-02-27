import { useEffect, useState } from "react";
import styled from "styled-components";
import { authService, dbService } from "../firebase";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const ProfileImgBox = styled.div`
  overflow: hidden;
  fill: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #7bb241;
  background-color: #7bb241;
`;

const RereBox = styled.div`
  margin-bottom: 20px;
  box-shadow: 5px 5px 10px;
  position: relative;
  z-index: 0;
`;

const TopBox = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  gap: 10px;
`;

const TopLeft = styled.div``;

const TopRight = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopBtn = styled.div`
  display: flex;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bolder;
`;

const Representation = styled.div`
  font-size: 10px;
`;

const MiddleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const BottomBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  font-size: 15px;
  color: #aeaeae;
`;

const ResponseBox = styled.div`
  width: 80vw;
  height: 100px;
  border-radius: 10px;
  padding: 10px;
  overflow-y: auto;
  background-color: #e8f5e9;
`;

const Svg = styled.svg`
  width: 15px;
  height: 15px;
  fill: blue;
`;

const ProfileImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  fill: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #7bb241;
  background-color: #7bb241;
`;

const BtnBundle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  right: 10px;
  top: 10px;
`;

const Btn = styled.div`
  cursor: pointer;
  width: 50px;
  height: 50px;
  border: 0;
  border-radius: 0.25em;
  color: white;
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
`;

const TextArea = styled.textarea`
  border: none;
  resize: none;
  width: 80vw;
  height: 100px;
  border-radius: 10px;
  padding: 10px;
  overflow-y: auto;
  background-color: #e8f5e9;
`;

const SubmitInput = styled.input`
  border: none;
  background-color: #66bb6a;
  color: white;
`;

export default function MyReBox({ re }) {
  const [toggle, setToggle] = useState(false);
  const [modify, setModify] = useState(re.response);

  const user = authService.currentUser;

  const { id } = useParams();

  // Response Exchange

  useEffect(() => {
    setModify(re.response);
  }, [re.response]);

  const onReChange = (event) => {
    const {
      target: { value },
    } = event;
    setModify(value);
  };

  const onReSubmit = (event) => {
    event.preventDefault();

    // 변경 & 빈칸 만들기
    setTimeout(() => {
      // Doc update https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
      dbService
        .collection(id)
        .doc(user.uid)
        .update({ response: modify })
        .then()
        .catch((error) => {
          console.log("Doc 없으니까 만들면 제대로 적용 됩니다~!");
        });
    }, 1000);

    // 안내
    let timerInterval;
    Swal.fire({
      title: "변경하는 중입니다...",
      icon: "success",
      timer: 1000,
      timerProgressBar: true,
      showConfirmButton: false,
      willClose: () => {
        clearInterval(timerInterval);
      },
    });
    setToggle(false);
  };

  const onModifyBtnClick = () => {
    // Modify (Update Doc)
    setToggle((e) => !e);
  };

  const onDeleteBtnClick = () => {
    // Delete
    setToggle(false);
    Swal.fire({
      title: "삭제하시겠습니까?",
      text: "언제든 다시 작성하실 수 있습니다!",
      icon: "error",
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      denyButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dbService.doc(`${id}/${user.uid}`).delete();
        Swal.fire("삭제되었습니다!", "", "success");
      }
    });
  };

  return (
    <RereBox key={re.userId}>
      <TopBox>
        <TopLeft>
          {re.profileImgUrl ? (
            <>
              <ProfileImg>
                <img src={re.profileImgUrl} width="50px" height="50px" />
              </ProfileImg>
            </>
          ) : (
            <ProfileImg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
            </ProfileImg>
          )}
        </TopLeft>
        <TopRight>
          <Name>
            {re.userDisplayName || "NAME"}{" "}
            {re.emailVer ? (
              <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
              </Svg>
            ) : (
              // <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              //   <path d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM625 177L497 305c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L591 143c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
              // </Svg>
              <></>
            )}
          </Name>
          <Representation>{re.representation}</Representation>
        </TopRight>
        <TopBtn>
          <BtnBundle>
            <Btn
              onClick={onModifyBtnClick}
              style={{ backgroundColor: "#3085D6" }}
            >
              {!toggle ? (
                <Svg
                  style={{ fill: "white" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                </Svg>
              ) : (
                <Svg
                  style={{ fill: "white" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                </Svg>
              )}
            </Btn>
            <Btn
              onClick={onDeleteBtnClick}
              style={{ backgroundColor: "#DC3741" }}
            >
              <Svg
                style={{ fill: "white" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </Svg>
            </Btn>
          </BtnBundle>
        </TopBtn>
      </TopBox>
      <MiddleBox>
        {!toggle ? (
          <ResponseBox>
            {re.response.split("\n").map((text) => (
              <>
                {text}
                <br />
              </>
            ))}
          </ResponseBox>
        ) : (
          <Form onSubmit={onReSubmit}>
            <TextArea
              type="text"
              placeholder=""
              value={modify}
              onChange={onReChange}
              required
            />
            <SubmitInput type="submit" value="변경" />
          </Form>
        )}
      </MiddleBox>
      <BottomBox>{re.createdTime}</BottomBox>
    </RereBox>
  );
}
