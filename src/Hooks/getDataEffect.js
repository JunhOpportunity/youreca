import { useEffect, useState } from "react";
import { dbService } from "../firebase";

export function useGetAllDownDocumentData(
  topCollection,
  topDoc,
  downCollection
) {
  const [data, setData] = useState();

  useEffect(() => {
    dbService
      .collection(topCollection)
      .doc(topDoc)
      .collection(downCollection)
      .get()
      .then((snapshot) => {
        const getData = snapshot.docs.map((doc) => ({ ...doc.data() }));
        setData(getData);
      });
  }, []);

  return data;
}

export function useGetAllDownDocumentData2(
  topCollection,
  topDoc,
  downCollection
) {
  const [data, setData] = useState();

  dbService
    .collection(topCollection)
    .doc(topDoc)
    .collection(downCollection)
    .get()
    .then((snapshot) => {
      const getData = snapshot.docs.map((doc) => ({ ...doc.data() }));
      
      setData(getData);
    });

  return data;
}

export function useGetAllDocumentData(collection) {
  const [data, setData] = useState();

  useEffect(() => {
    dbService
      .collection(collection)
      .get()
      .then((snapshot) => {
        const getData = snapshot.docs.map((doc) => ({ ...doc.data() }));
        setData(getData);
      });
  }, []);

  return data;
}

export function useGetAllDocumentDataArrange(collection, field, category) {
  const [data, setData] = useState();

  useEffect(() => {
    dbService
      .collection(collection)
      .orderBy(field, category)
      .onSnapshot((snapshot) => {
        const getData = snapshot.docs.map((doc) => ({ ...doc.data(), randomId: doc.id }));
        setData(getData);
      });
  }, []);

  return data;
}

export function useGetAllDocumentData2(topCollection) {
  const [data, setData] = useState();

  useEffect(() => {
    dbService
      .collection(topCollection)
      .get()
      .then((snapshot) => {
        const getData = snapshot.docs.map((doc) => ({ ...doc.data() }));
        setData(getData);
      });
  }, []);

  return data;
}

export function useGetDocumentData(collection, document) {
  const [data, setData] = useState();

  useEffect(() => {
    dbService
      .collection(collection)
      .doc(document)
      .get()
      .then((doc) => {
        const getData = doc.data();
        setData(getData);
      });
  }, []);

  return data;
}
