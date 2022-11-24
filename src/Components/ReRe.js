import styled from "styled-components"
import Header from "./Header"
import Upload from "../Routes/Upload.js";
import { useNavigate } from "react-router-dom";



export default function ReRe() {
  const navigation = useNavigate();
  
  const goUpload = () => {
    navigation("upload")
  }

  return(<>
    <Header/>
    <h1>ReRe</h1>
    <button onClick={goUpload}>작성하러 가기</button>
  </>)
}