import styled from "styled-components";
import Swal from "sweetalert2";

const Wrapper = styled.div``;

const Box = styled.div`
  width: 200px;
  box-shadow: 0px 0px 3px;
  margin-top: 10px;
  padding: 10px;
  background-color: ${(props) => (props.isExpire ? "red" : "white")};
`;

const UserName = styled.div`
  font-size: 20px;
`;
const UserInfo = styled.div`
  font-size: 10px;
`;
const RequestText = styled.div`
  background-color: black;
  border-radius: 5rem;
  color: red;
  text-align: center;
  font-size: 15px;
  cursor: pointer;
`;
const RequestDate = styled.div`
  font-size: 10px;
  text-align: center;
  color: #696969;
`;

export function RequestBox({ userRequest, requestFunction}) {
  const isExpire = Date.now() > userRequest.deleteDateNumber;

  const onClickBtn = () => {
    Swal.fire({
      title: "Warning!",
      html: `<h4 style='color:red'> 처리할까요?<br/>확실하시다면 <i style='color:#696969'>${userRequest.reason}</i> 를 기입해주세요</h4>`,
      icon: "warning",
      input: "text",
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "blue",
      confirmButtonText: `${userRequest.reason}`,
      denyButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value == userRequest.reason) {
          requestFunction(userRequest)
          Swal.fire("처리되었습니다", "", "success");
        } else {
          Swal.fire("실패했습니다", "", "error");
        }
      }
    });
  };
  return (
    <>
      {userRequest ? (
        <Box isExpire={isExpire}>
          <UserName>{userRequest.userDisplayName} </UserName>

          <UserInfo>
            {userRequest.userEmail}
            <br />
            {userRequest.userId}
            <br />
            요청 신청일: {userRequest.createdTime}
            <br />
            요청 만료일: {userRequest.deleteDate}
          </UserInfo>
          <RequestText onClick={onClickBtn}>{userRequest.reason}</RequestText>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
}
