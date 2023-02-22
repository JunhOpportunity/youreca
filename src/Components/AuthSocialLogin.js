import { authService, firebaseInstance } from "../firebase.js";
import styled from "styled-components";

const SocialLogin = styled.div``;

const SocialLoginBtnBundle = styled.div`
  gap: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SocialLoginBtn = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DivideLineBox = styled.div`
  font-size: 20px;
`;

const DivideLine = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  color: #696969;
`;

const SocialIcon = styled.img`
  width: 50px;
  height: 50px;
`;

export default function AuthSocialLogin() {
  const onClickSocialLogin = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };

  return (
    <>
      <SocialLogin>
        <DivideLineBox>
          <DivideLine>OR</DivideLine>
        </DivideLineBox>
        <SocialLoginBtnBundle>
          <SocialLoginBtn>
            <SocialIcon
              name="google"
              onClick={onClickSocialLogin}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/640px-Google_%22G%22_Logo.svg.png"
            ></SocialIcon>
          </SocialLoginBtn>
          <SocialLoginBtn>
            <SocialIcon
              name="github"
              onClick={onClickSocialLogin}
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            ></SocialIcon>
          </SocialLoginBtn>
        </SocialLoginBtnBundle>
      </SocialLogin>
    </>
  );
}
