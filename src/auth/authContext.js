import { useContext } from "react";
import { authContext } from "../auth/authentication";

const useAuthCtx = () => {
  return useContext(authContext);
};

export default useAuthCtx;
