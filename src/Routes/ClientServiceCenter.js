import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

const ServiceBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleBox = styled.div`
  position: relative;
  background-color: gray;
  height: 100px;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Svg = styled.svg`
  position: absolute;
  margin-top: 0;
  margin-bottom: 0;
  right: 20px;
  height: 20px;
  width: 20px;
`;

const SubmitBox = styled.div`
  overflow-y: hidden;
  transition-duration: 0.5s;
  height: ${(props) => (props.isOpen ? "100px" : "0px")};
  /* visibility: ${(props) => (props.isOpen ? "visible" : "hidden")}; */
`;

// const DeleteAccountBox = styled.div``;

// const DeleteReputationBox = styled.div``;

// const UpdatePassword = styled.div``;

// const Bugreport = styled.div``;

export default function ClientServiceCenter() {
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);
  const [isDeleteReputationOpen, setIsDeleteReputationOpen] = useState(false);
  const [isBugreportOpen, setIsBugreportOpen] = useState(false);

  const onClick = async (event) => {
    const {
      target: { id },
    } = event;
    console.log(id);
    if (id == "DeleteAccount") {
      setIsDeleteAccountOpen((e) => !e);
    } else if (id == "DeleteReputation") {
      setIsDeleteReputationOpen((e) => !e);
    } else if (id == "Bugreport") {
      setIsBugreportOpen((e) => !e);
    }
  };

  return (
    <>
      <Wrapper>
        <ServiceBox>
          <TitleBox id="DeleteAccount" onClick={onClick}>
            제 평판 페이지를 제거하고 싶어요
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" />
            </Svg>
          </TitleBox>
          <SubmitBox isOpen={isDeleteAccountOpen}>
            정말로 평판을 제거하고싶으신가요? <br />
            평판 제거를 원하신다면 이곳을 클릭해주세요
          </SubmitBox>
        </ServiceBox>
        <ServiceBox>
          <TitleBox id="DeleteReputation" onClick={onClick}>
            계정 탈퇴가 하고싶어요
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" />
            </Svg>
          </TitleBox>
          <SubmitBox isOpen={isDeleteReputationOpen}>
            계정을 삭제하고싶으신가요?
            <br />
            계정 삭제를 원하신다면 이곳을 클릭해주세요
          </SubmitBox>
        </ServiceBox>
        <ServiceBox>
          <TitleBox id="Bugreport" onClick={onClick}>
            버그를 신고하고싶어요
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" />
            </Svg>
          </TitleBox>
          <SubmitBox isOpen={isBugreportOpen}>
            어떤 버그를 신고하고싶으신가요?
          </SubmitBox>
        </ServiceBox>
      </Wrapper>
    </>
  );
}
