import React, { useEffect, useState } from "react";
// import {Routes, Route,Navigate} from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import WrapHome from "./WrapHome";
import Mywork from "./mywork/Mywork";
import Handel from "./handel/Handel";
import Handeledit from "./handel/Handeledit";
import Handelabout from "./handel/Handelabout";
import Login from "./Login/Login";
import useAuthCtx from "./auth/authContext";
import { verifyToken } from "./API/authApi";
const App = () => {
  const hand = process.env.REACT_APP_WORK_PATH;
  const handx = process.env.REACT_APP_WORK_PATHX;
  const { islogin, setislogin } = useAuthCtx();
  useEffect(() => {
    if (!localStorage.getItem("admin_acess_token")) {
      setislogin(false);
      return;
    }
    console.log(localStorage.getItem("admin_acess_token"));
    verifyToken((err, res) => {
      if (err) {
        setislogin(false);
        return;
      }
      setislogin(true);
    });
  }, []);
  return (
    <>
      <Routes>
        <Route exact path="/" element={<WrapHome />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/work" element={<Mywork />} />
        <Route path={hand} element={<Handel />} />
        <Route path={handx} element={<Handelabout />} />
        <Route path={`${hand}/:id`} element={<Handeledit />} />
      </Routes>
    </>
  );
};

export default App;
