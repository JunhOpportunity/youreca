import styled from "styled-components";
import ClientService from "../Components/ClientService";
import HeaderTest from "../Components/HeaderTest";

const TopEmptyBox = styled.div`
  height: 50px;
  @media only screen and (min-width: 768px) {
    height: 100px;
  }
`;

export default function ClientServiceCenter() {
  return(
    <>
      <HeaderTest />
      <TopEmptyBox />
      <ClientService/>
    </>
  )
}