import Auth from "./Auth.js"
import ReRe from "./ReRe.js";

export default function Home({userInfo}) {
  return (<>
  <ReRe userInfo={userInfo}></ReRe></>);
}
