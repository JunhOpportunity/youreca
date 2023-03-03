import { dbService } from "../firebase";

export function DeleteTopCollection(topCollectionName) {
  dbService.collection(topCollectionName).delete();
}

export function DeleteDownCollection(
  topCollectionName,
  topDocumentName,
  downCollectionName
) {
  dbService
    .collection(topCollectionName)
    .doc(topDocumentName)
    .collection(downCollectionName)
    .delete();
}

export function DeleteTopDocument(topCollectionName, topDocumentName) {
  dbService.collection(topCollectionName).doc(topDocumentName).delete();
}

export function DeleteDownDocument(
  topCollectionName,
  topDocumentName,
  downCollectionName,
  downDocumentName
) {
  dbService
    .collection(topCollectionName)
    .doc(topDocumentName)
    .collection(downCollectionName)
    .doc(downDocumentName)
    .delete();
}
