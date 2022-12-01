import ReName from "../Components/ReName";
import { authService } from "../firebase";

export default function Profile() {

  const user = authService.currentUser;
  console.log(user)
  return (
    <>
      <h1>Profile</h1>
      <ReName />
    </>
  );
}
