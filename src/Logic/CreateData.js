import { useEffect, useState } from "react";
import { dbService } from "../firebase";

export function CreateDownDocument(
  topCollection,
  topDocument,
  downCollection,
  downDocument,
  data
) {
  dbService
    .collection(topCollection)
    .doc(topDocument)
    .collection(downCollection)
    .doc(downDocument)
    .set(data);
}

export function CreateTopDocument(topCollection, topDocument, data) {
  dbService.collection(topCollection).doc(topDocument).set(data);
}

export function CreateTopCollection(topCollection, data) {
  dbService.collection(topCollection).add(data);
}
