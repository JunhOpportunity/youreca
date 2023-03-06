import { dbService } from "../firebase";

export function UpdateTopDocument(topCollection, topDocument, data) {
  dbService
    .collection(topCollection)
    .doc(topDocument)
    .update(data)
    .catch((error) => console.log(error));
}
