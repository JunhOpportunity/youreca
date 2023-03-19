import { useState } from "react";
import styled from "styled-components";
import { UpdateTopDocument } from "../Logic/UpdateData.js";
import Swal from "sweetalert2";

const Box = styled.div`
  padding: 10px;
`;

const Svg = styled.svg`
  width: 15px;
  height: 15px;
  fill: blue;
`;

const Name = styled.div`
  width: 100%;
`;

const Email = styled.div`
  width: 100%;
`;

const Feedback = styled.div`
  width: 300px;
  height: 100px;
  background-color: lightgray;
  border-radius: 5px;
  padding: 10px;
  overflow: auto;
`;

const Date = styled.div``;

const Form = styled.form`
  display: flex;
`;

const TextArea = styled.textarea`
  border: none;
  width: 200px;
  height: 30px;
  resize: none;
  box-shadow: 0px 0px 5px #7bb241;
`;

const InputBtn = styled.input`
  cursor: pointer;
  width: 50px;
  border-radius: 0.25em;
  font-weight: bolder;
  border: none;
  padding: 10px;
  color: white;
  background-color: #7bb241;
`;

export default function FeedbackBox({ feedbackData }) {
  const [answer, setAnswer] = useState("");
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setAnswer(value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    UpdateTopDocument("FeedBack", feedbackData.randomId, {
      answer: answer,
    });
    Swal.fire("등록되었습니다!", "", "success");
  };

  return (
    <>
      <Box>
        {feedbackData.answer ? (
          <>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
            </Svg>
          </>
        ) : (
          <>
            <Svg
              style={{ fill: "red" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
            </Svg>
          </>
        )}
        <Name>{feedbackData.userName}</Name>
        <Email>{feedbackData.userEmail}</Email>
        <Feedback>{feedbackData.feedback}</Feedback>
        <Date>{feedbackData.createdAt}</Date>
        {!feedbackData.answer ? (
          <Form onSubmit={onSubmit}>
            <TextArea
              value={answer}
              onChange={onChange}
              type="textarea"
              required
            />
            <InputBtn type="submit" value="제출" />
          </Form>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}
