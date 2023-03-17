import { useState } from "react";
import styled from "styled-components";
import Loading from "../Components/Loading";
import { authService } from "../firebase";
import { useGetDocumentData } from "../Hooks/getDataEffect";
import { UpdateTopDocument } from "../Logic/UpdateData";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
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

const SelectBox = styled.select`
  width: 100px;
  height: 50px;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0px 0px 2px #7bb241;
  border: none;
  font-weight: bolder;
`;

const Option = styled.option``;

const Label = styled.label`
  font-size: 15px;
  font-weight: bolder;
`;

const Check = styled.div`
  display: flex;
`;

const CheckBox = styled.input``;

const InputBundle = styled.div`
  flex-direction: column;
  align-items: center;
  gap: 20px;
  display: ${(props) => (props.isCheck ? "none" : "flex")};
`;

const InputTitle = styled.div`
  font-size: 13px;
  text-align: center;
`;

const InputText = styled.input`
  width: 200px;
  border: none;
  height: 50px;
  box-shadow: 0px 0px 2px #7bb241;
  text-align: center;
`;

const SubmitInput = styled.input`
  border: none;
  background-color: #66bb6a;
  color: white;
  height: 50px;
  width: 200px;
  cursor: pointer;
`;

const Progress = styled.div`
  position: fixed;
  bottom: 50px;
  width: 90%;
  padding: 20px;
`;

const ProgressText = styled.div`
  color: #7bb241;
  font-weight: bolder;
  text-align: center;
`;

const ProgressbarBox = styled.div`
  width: 100%;
  height: 40px;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
`;

const Progressbar = styled.div`
  height: 40px;
  background-color: #66bb6a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  font-weight: bolder;
`;

export default function FirstLoginJob() {
  const categoryList = useGetDocumentData("User", "Job-Category");
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const user = authService.currentUser;
  const navigation = useNavigate();

  const onClick = (e) => {
    const job = e.target.value;
    setSelectedCategory(job);
  };

  const onChangeInput = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(value);
  };

  const onChangeCheckbox = (event) => {
    const result = event.target.checked;
    setIsCheck(result);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (isCheck == true) {
      if(categoryList.List.indexOf(category) != -1) {
        return Swal.fire("다시 확인해주세요..", "잘 찾아보세요! 입력하신 직업이 리스트에 포함되어있습니다.", "warning");
      }
      UpdateTopDocument("User", "Job-Category", {
        List: [...categoryList.List, category],
      });
      UpdateTopDocument("User", user.uid, { userJob: category });
      return navigation("/firstlogin-3");
    }
    UpdateTopDocument("User", user.uid, { userJob: selectedCategory });

    navigation("/firstlogin-3");
  };
  return (
    <>
      {categoryList ? (
        <Wrapper>
          
          <Form onSubmit={onSubmit}>
            <Title>직업</Title>
            <SelectBox onChange={onClick} disabled={isCheck}>
              {categoryList.List.map((job) => {
                return <Option value={job}>{job}</Option>;
              })}
            </SelectBox>
            <Check>
              <Label for="checkbox">해당하는 직업이 목록에 없으신가요?</Label>
              <CheckBox
                id="checkbox"
                onChange={onChangeCheckbox}
                type="checkbox"
              />
            </Check>
            <InputBundle isCheck={!isCheck}>
              <InputTitle>
                직접 추가하시면 다른 사람들에게도 도움을 줄 수 있습니다!
              </InputTitle>
              <InputText
                value={category}
                onChange={onChangeInput}
                type="text"
                placeholder="당신의 직업을 적어주세요"
                required={isCheck ? true : false}
              />
            </InputBundle>
            <SubmitInput type="submit" value="다음" />
          </Form>
          <Progress>
            <ProgressText>프로필 생성중...</ProgressText>
            <ProgressbarBox>
              <Progressbar style={{ width: "50%" }}>50%</Progressbar>
            </ProgressbarBox>
          </Progress>
        </Wrapper>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
}
