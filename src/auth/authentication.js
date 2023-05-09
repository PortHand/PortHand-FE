import React, { createContext, useEffect, useState } from "react";
import { verifyToken } from "../API/authApi";
const authContext = createContext();

const Authcontext = ({ children }) => {
  const [islogin, setislogin] = useState();

  return (
    <authContext.Provider
      value={{
        islogin,
        setislogin,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export { Authcontext, authContext };
