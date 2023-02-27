import { useEffect, useState } from "react";
import { authService } from "../firebase";

export function useUserDataInit() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      setInit(true);
    });
  }, []);

  return init;
}

export function useGetUserDataInit() {
  const [data, setData] = useState();

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      setData(user);
    });
  }, []);

  return data;
}
