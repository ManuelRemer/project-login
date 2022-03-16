import { useEffect } from "react";

// customHooks
import { useAuthContext } from "./useAuthContext";

export const useClientLogin = (data) => {
  const { dispatch } = useAuthContext();
  useEffect(() => {
    if (data) {
      localStorage.setItem("userData", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data.user.name });
    }
  }, [data, dispatch]);
};
