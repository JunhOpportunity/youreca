import { dbService } from "../firebase";
import { DeleteTopDocument } from "./DeleteFirestore";

export function DeleteUserAccountData(userRequest) {
  // 첫 가입시 저장하는 User Data 삭제 - Collection : User
  dbService.collection("User").doc(userRequest.userId).delete();
  DeleteTopDocument();
  // 유저의 평판 제거
  DeleteUserReputation(userRequest);
}

export function DeleteUserReputation(userRequest) {
  // 유저의 평판 제거 - Collection : Person , Document : UserId
  dbService.collection("Person").doc(userRequest.userId).delete();
  // 유저의 평판 제거 요청 제거 - Collection: Client-Request , Document : Reputation , Collection : Delete , Document : userID
  dbService.collection("Client-Request").doc("Reputation").collection("Delete").doc(userRequest.userId).delete();
}
