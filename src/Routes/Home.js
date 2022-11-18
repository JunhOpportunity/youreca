import Auth from "../Components/Auth.js"

export default function Home({ loginCheck}) {
  return (<>
  {loginCheck ? <h1>Home</h1> : <Auth/>}</>);
}
