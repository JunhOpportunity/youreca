import { dbService } from "../firebase";

export function GetAllDocumentData(collection) {
  dbService.collection(collection).onSnapshot(async (snapshot) => {
    const data = snapshot.docs.map((doc) => ({ ...doc.data() }));
    return data;
  });
}

export function GetAllDownDocumentData(topCollection, topDoc, downCollection) {
  dbService
    .collection(topCollection)
    .doc(topDoc)
    .collection(downCollection)
    .get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data() }));
    });

}
