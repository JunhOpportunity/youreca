import styled from "styled-components";

const Person = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: gray;
`;

const PersonImg = styled.image`
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #696969;
  background-color: blue;
`;

const PersonName = styled.div`
  width: 200px;
  height: 100px;
  text-align: center;
  color: #696969;
  font-weight: bold;
  background-color: red;
`;

const PersonInfo = styled.div`
  width: 400px;
  height: 200px;
  background-color: yellow;
`;

export default function PersonBox({ re }) {
  
  return (
    <Person>
      <PersonImg>
    
      </PersonImg>
      <PersonName>

      </PersonName>
      <PersonInfo>

      </PersonInfo>
    </Person>
  )
}
