# RE-CHAT

## Outline
### 이 프로젝트는 주변 사람들의 반응, 평판, 추천 등을 작성할 수 있는 프로젝트입니다.
##### 포트폴리오 사이트를 개발하던 도중 이런 생각이 떠올랐습니다. 
##### '대학교 교수님, 직장 상사 등의 주변 인물들의 추천서를 받아서 포트폴리오에 올리는 것도 괜찮은 생각인 것 같다. 그런데 꼭 나를 위에서 내려다 본 사람들만의 추천만 있어야할까? 나와 같은 위치, 나보다 아래의 위치에서 나를 바라본 사람들의 추천서도 도움이 되지 않을까? 오히려 나에대해 더 잘 아는 사람들일테니 말이다.'
##### 그래서 주변 사람들, 즉 가까운 사람들에 대한 자신의 반응을 기록하고 추후 도움이 될 수 있도록 하기 위해 프로젝트를 진행하게되었습니다.


## Wire Frame
![image](https://user-images.githubusercontent.com/89464762/207522425-95653488-4e8b-4de3-88b3-38e9ceb7885a.png)


## Preview
### [Site Enter](https://junhopportunity.github.io/Responses-Chat/)

![image](https://user-images.githubusercontent.com/89464762/207521709-d00287c2-86d4-4897-b464-4d56906a9336.png)

## Used
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"><img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white"><img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"><img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">

## Reference
* [Humburger npm](https://github.com/luukdv/hamburger-react)
* [Nomad Coder](https://nomadcoders.co/nwitter/lobby)
* [Error Solution](https://velog.io/@junhopportunity)

## Precautions
* Github의 BrowserRouter 오류로 인해 Main Page 이외의 페이지에서 Refresh를 할 경우 404 Error가 발생하고 있습니다. HashRouter 로 대체해보았으나 구상했던 방식대로 렌더링 되지 않아서 BrowserRotuer 를 그대로 사용하였습니다.
* 현재 (22.12.11 기준) Refactoring과 React 최적화를 진행하지 않아서 로딩 시간이 다소 길어질 수 있습니다. 꾸준한 Refactoring과 React 최적화를 통해 원활한 사이트로 발전하도록 노력하겠습니다.

## Update
* 2022.12.10 (1.0.0) 출시
* 2022.12.24 (1.1.0) 업데이트 : EmailVerification 추가, Certification Bedge 추가
* 2023.02.12 (2.0.0) 업데이트 : Create My Reputation Page 추가 (개발자 한 명에 대한 주변 반응에서 다른 사람들도 자신의 반응, 평판들을 작성받을 수 있도록 개인 페이지를 추가하였습니다.)
* 2023.02.13 (2.1.0) 업데이트 : Set User Image 추가 (사용자의 프로필 이미지를 업로드하는 기능을 추가하였습니다.)
* 2023.02.23 (2.2.0) 업데이트 : 반응형 페이지로 변환 (이제 모바일, 웹 등 각각의 환경에 맞게 사이트가 유동적으로 변환되는 기능을 추가하였습니다.
* 2023.02.23 (2.3.0) 업데이트 : 전체 스타일 리뉴얼 (웹 사이트 전체의 스타일을 변경하였습니다. 더 깔끔해진 페이지를 경험해보세요!)
* 2023.02.25 (2.4.0) 업데이트 : 비밀번호 재설정 추가,  (이제 비밀번호를 재설정하실 수 있습니다.)
* 2023.02.26 (2.3.0) 업데이트 : 고객센터 페이지 추가 (고객센터 페이지가 추가되어 평판 제거, 계정 탈퇴, 버그 신고 등 다양한 기능을 사용하실 수 있습니다.)
* 2023.03.01 (2.4.0) 업데이트 : 관리자 페이지 추가 (관리자가 데이터를 직접 수정, 삭제하지 않고 관리자 페이지를 통해 간편하게 관리할 수 있는 페이지를 추가하였습니다.)
* 2023.03.03 (2.4.1) 업데이트 : 관리자 페이지 버그 해결 (평판 제거 작동 이상 문제를 해결하였습니다. 또한, 계정 탈퇴 버그도 해결하였습니다. 계정 탈퇴는 관리자가 하는 것이 아닌 사용자가 직접 해야합니다.)
* 2023.03.05 (2.5.0) 업데이트 : 사용자 닉네임 추가 (이제 사용자의 평판 페이지의 주소가 이메일의 앞자리가 아닌 닉네임으로 표시됩니다. 이로써 사용자의 개인정보 보안이 한 단계 업그레이드 되었습니다. 또한, 중복 검사를 수행하는 시스템을 추가해 데이터가 겹치는 문제를 사전에 예방하는 기능을 추가하였습니다.)
* 2023.03.07 (2.5.1) 업데이트 : 평판 업데이트 후 메인 페이지 이동 버그 해결 (평판을 작성한 후에 맨 처음 메인 페이지로 이동되는 버그를 수정하였습니다. 앞으로는 평판 작성을 완료하면 해당 유저의 평판 페이지로 이동합니다.)
* 2023.03.11 (2.6.0) 업데이트 : 사용자 직업 추가 (이제 사용자의 직업을 추가할 수 있습니다. 이로써 동일 이름을 가진 사용자라도 직업과 설명이 다르기 때문에 사용자를 찾기 수월해집니다.)
* 2023.03.13 (2.7.0) 업데이트 : 사용자 프로필 사진 제거 추가 (사용자의 프로필 사진을 변경하는 기능은 있지만 기본 이미지로 설정하는 기능이 없어 불편함을 겪었다는 피드백을 반영하였습니다. 이제 프로필 사진을 삭제해 기본 프로필로 설정할 수 있습니다.)
