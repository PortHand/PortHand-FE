import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { postlogin } from "../API/authApi";
import useAuthCtx from "../auth/authContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const hand = process.env.REACT_APP_WORK_PATH;

  const navigate = useNavigate();

  const [logindata, setlogindata] = useState({
    userid: "",
    password: "",
  });
  const { islogin, setislogin } = useAuthCtx();

  const handelsubmit = (e) => {
    e.preventDefault();
    const data = {
      email: logindata.userid,
      password: logindata.password,
    };
    postlogin(data, (err, res) => {
      if (err) {
        toast.error("Invalid userId/password", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
      toast.success("Welcome back sir!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setislogin(true);
      localStorage.setItem("admin_acess_token", res.data);
    });
  };
  const handelchnage = (e) => {
    const { name, value } = e.target;
    setlogindata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <>
      {islogin ? (
        navigate(`${hand}`)
      ) : (
        <div>
          <div className={styles.loginContainer}>
            <div className={styles.loginWraper}>
              <div id="head">
                <div className="tittle">
                  <p>Enter Admin Login credentials</p>
                  <h3>Admin Panel</h3>
                </div>
                <div className={`${styles.loginform}`}>
                  <form action="" onSubmit={handelsubmit}>
                    <input
                      type="text"
                      placeholder="UserId"
                      required
                      name="userid"
                      value={logindata.userid}
                      onChange={handelchnage}
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={logindata.password}
                      onChange={handelchnage}
                      required
                    />
                    <button type="submit" className={styles.backbutton}>
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Login;
