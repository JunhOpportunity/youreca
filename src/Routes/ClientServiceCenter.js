import styled from "styled-components";
import ClientService from "../Components/ClientService";
import Header from "../Components/Header";

const TopEmptyBox = styled.div`
  height: 50px;
  @media only screen and (min-width: 768px) {
    height: 100px;
  }
`;

export default function ClientServiceCenter() {
  return(
    <>
      <Header />
      <TopEmptyBox />
      <ClientService/>
    </>
  )
}