import styled from "styled-components";

const SelectBox = styled.select`
  width: 200px;
  height: 200px;
`;

const Option = styled.option`
  background-color: orange;
`;

export default function Test() {
  const alphaArray = ["a", "b", "c"];
  const onClick = (e) => {
    console.log(e.target.value);
  };
  return (
    <>
      <SelectBox onChange={onClick}>
        {alphaArray.map((a) => {
          return (
            <Option  value={a}>
              a
            </Option>
          );
        })}
      </SelectBox>
    </>
  );
}
