import { dbService } from "../firebase";

export function GetAllDocumentData(collection) {
  dbService.collection(collection).onSnapshot(async (snapshot) => {
    const data = snapshot.docs.map((doc) => ({ ...doc.data() }));
    return data;
  });
}

export function getAllDownDocumentData(topCollection, topDoc, downCollection) {
  let newData = dbService
    .collection(topCollection)
    .doc(topDoc)
    .collection(downCollection)
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data() }));
      return data;
    });
  return newData
}
