import { useState } from "react";
import { authService } from "../firebase";
import Loading from "./Loading";
import Swal from "sweetalert2";
import styled from "styled-components";
import { UpdateTopDocument } from "../Logic/UpdateData";
import { useGetDocumentData } from "../Hooks/getDataEffect";

const Form = styled.form`
  display: flex;
  justify-content: center;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const Title = styled.div`
  width: 100px;
  border-radius: 25px;
  font-weight: bolder;
  box-shadow: 0px 0px 5px #7bb241;
  color: #7bb241;
  text-align: center;
  padding: 5px;
`;

const JobModify = styled.div`
  border-bottom: 1px solid #43a047;
  padding: 10px;
  margin-bottom: 10px;
`;

const SelectBox = styled.select`
  width: 100%;
  height: 30px;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0px 0px 2px #7bb241;
  border: none;
  font-weight: bolder;
`;

const Option = styled.option``;

const SubmitInput = styled.input`
  border: none;
  background-color: #43a047;
  color: white;
  cursor: pointer;
`;

export default function RechangeJob() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const categoryList = useGetDocumentData("User", "Job-Category");
  const user = authService.currentUser;

  const onClick = (e) => {
    const job = e.target.value;
    setSelectedCategory(job);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (selectedCategory == "") {
      return Swal.fire("변경할 직업을 선택해주세요", ``, "warning");
    }
    Swal.fire("변경되었습니다!", `당신의 직업: ${selectedCategory}`, "success");
    UpdateTopDocument("User", user.uid, { userJob: selectedCategory });
    UpdateTopDocument("Person", user.uid, {
      userJob: selectedCategory,
    });
  };

  return (
    <>
      {categoryList ? (
        <>
          <JobModify>
            <TitleBox>
              <Title>직업 변경</Title>
            </TitleBox>
            <Form onSubmit={onSubmit}>
              <SelectBox onChange={onClick}>
                <Option disabled selected value>
                  변경할 직업을 선택해주세요.
                </Option>
                {categoryList.List.map((job) => {
                  return <Option value={job}>{job}</Option>;
                })}
              </SelectBox>
              <SubmitInput type="submit" value="변경" />
            </Form>
          </JobModify>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
