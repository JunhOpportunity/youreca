import { useState } from "react";
import styled from "styled-components";
import { authService, dbService } from "../firebase";
import Swal from "sweetalert2";
import { CreateDownDocument } from "../Logic/CreateData";
import { DeleteDownDocument } from "../Logic/DeleteFirestore";
import { UpdateTopDocument } from "../Logic/UpdateData";

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
  background-color: #ff3844;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
`;

const ReportBtn = styled.a`
  width: 100%;
  height: 30px;
  background-color: #2282dd;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
`;

const SelectBox = styled.select`
  width: 100%;
  height: 50px;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0px 0px 2px #7bb241;
  border: none;
  font-weight: bolder;
`;

const Option = styled.option``;

export default function ClientService() {
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);
  const [isDeleteReputationOpen, setIsDeleteReputationOpen] = useState(false);
  const [isBugreportOpen, setIsBugreportOpen] = useState(false);
  const [isJobCategoryContributeOpen, setIsJobCategoryContributeOpen] =
    useState(false);
  const [isDeleteReputationQAOpen, setIsDeleteReputationQAOpen] = useState(false);
  const [jobCategory, setJobCategory] = useState();
  const user = authService.currentUser;
  dbService
    .collection("User")
    .doc("Job-Category")
    .get()
    .then(async (doc) => {
      setJobCategory(doc.data().List);
    });

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
    } else if (id == "JobCategoryContribute") {
      setIsJobCategoryContributeOpen((e) => !e);
    } else if (id == "DeleteReputationQA") {
      setIsDeleteReputationQAOpen((e) => !e)
    }
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
          CreateDownDocument(
            "Client-Request",
            "Reputation",
            "Delete",
            user.uid,
            {
              userId: user.uid,
              userDisplayName: user.displayName,
              userEmail: user.email,
              reason: id,
              createdTime: koDate,
              deleteDate: deleteDate,
              deleteDateNumber: deleteDateNumber,
            }
          );
        } else if (id == "AccountDelete") {
          CreateDownDocument("Client-Request", "Account", "Delete", user.uid, {
            userId: user.uid,
            userDisplayName: user.displayName,
            userEmail: user.email,
            reason: id,
            createdTime: koDate,
            deleteDate: deleteDate,
            deleteDateNumber: deleteDateNumber,
          });
        }
        Swal.fire("신청되었습니다!", "", "success");
      }
    });
  };

  const CancleRequest = (requestCategory, request) => {
    DeleteDownDocument("Client-Request", requestCategory, request, user.uid);
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

  const onClickContributeBtn = (event) => {
    Swal.fire({
      title: "감사합니다",
      text: "어떤 직업을 추가하고 싶으신가요?",
      icon: "question",
      input: "text",
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "blue",
      confirmButtonText: `등록`,
      denyButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (jobCategory.indexOf(result.value) != -1) {
          return Swal.fire(
            "다시 확인해주세요..",
            "이미 존재하는 직업이네요!",
            "error"
          );
        }
        Swal.fire(
          "등록되었습니다!",
          "언제든지 추가로 작성해주세요.",
          "success"
        );
        UpdateTopDocument("User", "Job-Category", {
          List: [...jobCategory, result.value],
        });
        dbService
          .collection("User")
          .doc("Job-Category")
          .get()
          .then(async (doc) => {
            setJobCategory(doc.data().List);
          });
      }
    });
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
                style={{ backgroundColor: "#2282dd" }}
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
              <ReportBtn
                target="_blank"
                rel="noreferrer noopener"
                href="https://open.kakao.com/me/junhopportunity"
              >
                버그 신고하러 가기
              </ReportBtn>
            </SubmitBox>
          </ServiceBox>
          <PageTitleBox>도움을 주고 싶으신가요?</PageTitleBox>
          <ServiceBox>
            <TitleBox id="JobCategoryContribute" onClick={onClick}>
              <Svg
                isOpen={isJobCategoryContributeOpen}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 512"
              >
                <path d="M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
              </Svg>
              생각나는 직업 카테고리가 있어요
            </TitleBox>
            <SubmitBox isOpen={isJobCategoryContributeOpen}>
              <SelectBox>
                {jobCategory ? (
                  jobCategory.map((job) => {
                    return <Option>{job}</Option>;
                  })
                ) : (
                  <Option>...</Option>
                )}
              </SelectBox>
              <br />위 리스트에 해당하지 않는 직업인가요?
              <Btn
                style={{ backgroundColor: "#2282dd" }}
                id="ReputationDeleteCancle"
                onClick={onClickContributeBtn}
              >
                직업 카테고리 추천 기여하기
              </Btn>
            </SubmitBox>
          </ServiceBox>

          <PageTitleBox>Q/A</PageTitleBox>
          <ServiceBox>
            <TitleBox id="DeleteReputationQA" onClick={onClick}>
              <Svg
                isOpen={isDeleteReputationQAOpen}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 512"
              >
                <path d="M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
              </Svg>
              왜 평판 페이지를 직접 제거할 수 없는건가요?
            </TitleBox>
            <SubmitBox isOpen={isDeleteReputationQAOpen}>
              사용자분들의 평판은 중요한 데이터입니다!
              <br />
              따라서 실수를 방지하기 위해 여러 가지 기능을
              <br />
              고안해 보았지만 혹시 모를 계정 해킹 사례를 대비하여
              <br />
              페이지를 함부로 제거할 수 없도록 하였습니다.
              <br />
              추후 보안 문제가 해결된다면 추가할 예정입니다.
            </SubmitBox>
          </ServiceBox>
        </Wrapper>
      </CS>
    </>
  );
}
