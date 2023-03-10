import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

const SelectBox = styled.select`
  width: 200px;
  height: 200px;
`;

const Option = styled.option`
  background-color: orange;
`;

const CheckBox = styled.input`

`;

const InputText = styled.input`
  width: 100px;
  height: 50px;
`;

export default function Test() {
  const [category, setCategory] = useState();
  const alphaArray = ["a", "b", "c"];

  const onClick = (e) => {
    console.log(e.target.value);
  };

  const onChangeInput = (event) => {
    const {
      target: { value, type },
    } = event;
    if(type == "checkbox") {
      console.log("checkbox")
    } else if(type == "text") {
      console.log("text")
    }
    setCategory(value);
    console.log(category);
  };
  return (
    <Wrapper>
      <SelectBox disabled onChange={onClick}>
        {alphaArray.map((a) => {
          return <Option value={a}>{a}</Option>;
        })}
      </SelectBox>
      <label for="checkbox">직접 입력하기</label>
      <CheckBox id="checkbox" onChange={onChangeInput} type="checkbox"/>
      <InputText value={category} onChange={onChangeInput} type="text" />
    </Wrapper>
  );
}
