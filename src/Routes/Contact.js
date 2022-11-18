export default function Conatct({ loginCheck}) {
  return <>{loginCheck ? <h1>Auth</h1> : <h1>로그인 하러 가세요.</h1>}</>;
}
