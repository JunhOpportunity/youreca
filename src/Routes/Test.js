import styled from "styled-components";

const Wrapper = styled.div`
  padding: 10px;
`;

const ProgressbarBox = styled.div`
  width: 100%;
  height: 40px;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Progressbar = styled.div`
  height: 40px;
  background-color: #2196f3;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bolder;
`;

export default function Test() {
  return (
    <Wrapper>
      <ProgressbarBox>
        <Progressbar style={{ width: "25%" }}>25%</Progressbar>
      </ProgressbarBox>
      <ProgressbarBox>
        <Progressbar style={{ width: "50%" }}>50%</Progressbar>
      </ProgressbarBox>
      <ProgressbarBox>
        <Progressbar style={{ width: "75%" }}>75%</Progressbar>
      </ProgressbarBox>
      <ProgressbarBox>
        <Progressbar style={{ width: "100%" }}>100%</Progressbar>
      </ProgressbarBox>
    </Wrapper>
  );
}
