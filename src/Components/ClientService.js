import { useState } from "react";
import styled from "styled-components";
import { authService, dbService } from "../firebase";
import Swal from "sweetalert2";

const CS = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 1280px;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PageTitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #7bb241;
  margin-bottom: 20px;
`;

const ServiceBox = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 2px #7bb241;
  margin-bottom: 20px;
  padding: 0px 10px;
`;

const TitleBox = styled.div`
  position: relative;
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SubmitBox = styled.div`
  overflow-y: hidden;
  transition-duration: 0.3s;
  max-height: ${(props) => (props.isOpen ? "200px" : "0px")};
  padding: ${(props) => (props.isOpen ? "20px 0px" : "0px")};
  width: 100%;
`;

const Svg = styled.svg`
  transform: ${(props) => (props.isOpen ? "rotate(90deg)" : "rotate(0deg)")};
  transition-duration: 0.3s;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  fill: #696969;
  pointer-events: none;
`;

const Btn = styled.div`
  width: 100%;
  height: 30px;
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
`;

const ReportBtn = styled.a`
  width: 100%;
  height: 30px;
  background-color: blue;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
`;

export default function ClientService() {
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);
  const [isDeleteReputationOpen, setIsDeleteReputationOpen] = useState(false);
  const [isBugreportOpen, setIsBugreportOpen] = useState(false);

  const user = authService.currentUser;

  const onClick = async (event) => {
    const {
      target: { id },
    } = event;
    if (id == "DeleteAccount") {
      setIsDeleteAccountOpen((e) => !e);
    } else if (id == "DeleteReputation") {
      setIsDeleteReputationOpen((e) => !e);
    } else if (id == "Bugreport") {
      setIsBugreportOpen((e) => !e);
    }
  };

  const UploadRequest = (requestCategory, request, id, koDate, deleteDate, deleteDateNumber) => {
    dbService
      .collection("Client-Request")
      .doc(requestCategory)
      .collection(request)
      .doc(`${user.uid}`)
      .set({
        userId: user.uid,
        userDisplayName: user.displayName,
        userEmail: user.email,
        userEmailName: user.email.split("@")[0],
        reason: id,
        createdTime: koDate,
        deleteDate: deleteDate,
        deleteDateNumber: deleteDateNumber,
      });
  };

  const onClickDeleteBtn = async (event) => {
    const {
      target: { id },
    } = event;

    const date = new Date();

    const koDate = date.toLocaleString("ko", {
      minute: "numeric",
      hour: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      weekday: "short",
    });

    let deleteDate = new Date();
    const deleteDateNumber = deleteDate.setDate(date.getDate() + 7);
    deleteDate = deleteDate.toLocaleString("ko", {
      minute: "numeric",
      hour: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      weekday: "short",
    });

    event.preventDefault();

    Swal.fire({
      title: "정말 신청하시겠습니까?",
      html: `<h6 style='color:red'> 7일 이내 취소하지 않으실 경우 <br/>${deleteDate} 이후 삭제됩니다. </h6>`,
      icon: "warning",
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "신청",
      denyButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        if (id == "ReputationDelete") {
          UploadRequest("Reputation", "Delete", id, koDate, deleteDate, deleteDateNumber);
        } else if (id == "AccountDelete") {
          UploadRequest("Account", "Delete", id, koDate, deleteDate, deleteDateNumber);
        }
        Swal.fire("신청되었습니다!", "", "success");
      }
    });
  };

  const CancleRequest = (requestCategory, request) => {
    dbService
      .collection("Client-Request")
      .doc(requestCategory)
      .collection(request)
      .doc(`${user.uid}`)
      .delete();
  };

  const onClickCancleBtn = async (event) => {
    const {
      target: { id },
    } = event;

    event.preventDefault();

    if (id == "ReputationDeleteCancle") {
      CancleRequest("Reputation", "Delete");
    } else if (id == "AccountDeleteCancle") {
      CancleRequest("Account", "Delete");
    }
    Swal.fire("취소되었습니다!", "", "success");
  };

  return (
    <>
      <CS>
        <Wrapper>
          <PageTitleBox>도움이 필요하신가요?</PageTitleBox>
          <ServiceBox>
            <TitleBox id="DeleteReputation" onClick={onClick}>
              <Svg
                isOpen={isDeleteReputationOpen}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 512"
              >
                <path d="M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
              </Svg>
              제 평판 페이지를 제거하고 싶어요
            </TitleBox>
            <SubmitBox isOpen={isDeleteReputationOpen}>
              정말로 평판을 제거하고싶으신가요?
              <Btn id="ReputationDelete" onClick={onClickDeleteBtn}>
                평판 제거 신청하기
              </Btn>
              이미 평판 제거를 신청하셨나요?
              <br />
              혹시 평판 제거를 취소하고 싶으신가요?
              <Btn
                style={{ backgroundColor: "blue" }}
                id="ReputationDeleteCancle"
                onClick={onClickCancleBtn}
              >
                평판 제거 신청 취소하기
              </Btn>
            </SubmitBox>
          </ServiceBox>

          <ServiceBox>
            <TitleBox id="DeleteAccount" onClick={onClick}>
              <Svg
                isOpen={isDeleteAccountOpen}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 512"
              >
                <path d="M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
              </Svg>
              계정 탈퇴가 하고싶어요
            </TitleBox>
            <SubmitBox isOpen={isDeleteAccountOpen}>
              계정을 삭제하고싶으신가요?
              <Btn id="AccountDelete" onClick={onClickDeleteBtn}>
                계정 삭제하기
              </Btn>
            </SubmitBox>
          </ServiceBox>
          <ServiceBox>
            <TitleBox id="Bugreport" onClick={onClick}>
              <Svg
                isOpen={isBugreportOpen}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 512"
              >
                <path d="M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
              </Svg>
              버그를 신고하고싶어요
            </TitleBox>
            <SubmitBox isOpen={isBugreportOpen}>
              어떤 버그를 신고하고싶으신가요?
              <ReportBtn target="_blank" rel="noreferrer noopener" href="https://open.kakao.com/me/junhopportunity">
                버그 신고하러 가기
              </ReportBtn>
            </SubmitBox>
          </ServiceBox>
        </Wrapper>
      </CS>
    </>
  );
}
