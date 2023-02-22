import styled from "styled-components";

const ProfileImgBox = styled.div`
  overflow: hidden;
  fill: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #7bb241;
  background-color: #7bb241;
`;

const RereBox = styled.div`
  margin-bottom: 20px;
  box-shadow: 0px 0px 1px;
`;

const TopBox = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  gap: 10px;
`;

const TopLeft = styled.div``;

const TopRight = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bolder;
`;

const Representation = styled.div`
  font-size: 10px;
`;

const MiddleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const BottomBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  font-size: 15px;
  color: #aeaeae;
`;

const ResponseBox = styled.div`
  width: 80vw;
  height: 100px;
  border-radius: 10px;
  padding: 10px;
  overflow-y: auto;
  background-color: #e8f5e9;
`;

const Svg = styled.svg`
  width: 15px;
  height: 15px;
  fill: blue;
`;

const ProfileImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  fill: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #7bb241;
  background-color: #7bb241;
`;

export default function ReBox({ re, isMine }) {
  return (
    <RereBox key={re.userId}>
      <TopBox>
        <TopLeft>
          {re.profileImgUrl ? (
            <>
              <ProfileImg>
                <img src={re.profileImgUrl} width="50px" height="50px" />
              </ProfileImg>
            </>
          ) : (
            <ProfileImg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
            </ProfileImg>
          )}
        </TopLeft>
        <TopRight>
          <Name>
            {re.userDisplayName || "NAME"}{" "}
            {re.emailVer ? (
              <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
              </Svg>
            ) : (
              // <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              //   <path d="M211 7.3C205 1 196-1.4 187.6 .8s-14.9 8.9-17.1 17.3L154.7 80.6l-62-17.5c-8.4-2.4-17.4 0-23.5 6.1s-8.5 15.1-6.1 23.5l17.5 62L18.1 170.6c-8.4 2.1-15 8.7-17.3 17.1S1 205 7.3 211l46.2 45L7.3 301C1 307-1.4 316 .8 324.4s8.9 14.9 17.3 17.1l62.5 15.8-17.5 62c-2.4 8.4 0 17.4 6.1 23.5s15.1 8.5 23.5 6.1l62-17.5 15.8 62.5c2.1 8.4 8.7 15 17.1 17.3s17.3-.2 23.4-6.4l45-46.2 45 46.2c6.1 6.2 15 8.7 23.4 6.4s14.9-8.9 17.1-17.3l15.8-62.5 62 17.5c8.4 2.4 17.4 0 23.5-6.1s8.5-15.1 6.1-23.5l-17.5-62 62.5-15.8c8.4-2.1 15-8.7 17.3-17.1s-.2-17.3-6.4-23.4l-46.2-45 46.2-45c6.2-6.1 8.7-15 6.4-23.4s-8.9-14.9-17.3-17.1l-62.5-15.8 17.5-62c2.4-8.4 0-17.4-6.1-23.5s-15.1-8.5-23.5-6.1l-62 17.5L341.4 18.1c-2.1-8.4-8.7-15-17.1-17.3S307 1 301 7.3L256 53.5 211 7.3z" />
              // </Svg>
              <></>
            )}
          </Name>
          <Representation>{re.representation}</Representation>
        </TopRight>
      </TopBox>
      <MiddleBox>
        <ResponseBox>
          {re.response.split("\n").map((text) => (
            <>
              {text}
              <br />
            </>
          ))}
        </ResponseBox>
      </MiddleBox>
      <BottomBox>{re.createdTime}</BottomBox>
    </RereBox>
  );
}
