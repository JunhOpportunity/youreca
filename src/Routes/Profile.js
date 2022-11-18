export default function Profile({ loginCheck }) {
  return <>{loginCheck ? <h1>Profile</h1> : <h1>로그인 후 이용해주세요</h1>}</>;
}
