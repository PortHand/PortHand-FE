import React, { useEffect, useState } from "react";
import styles from "./Handel.module.css";
import { MdDelete } from "react-icons/md";
import { MdOutlineDataSaverOn } from "react-icons/md";
import { getaboutMe } from "../API/apidataCall";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateaboutme } from "../API/apidataCall";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuthCtx from "../auth/authContext";
import { logoutadmin } from "../API/authApi";
import { TbLogout } from "react-icons/tb";

const Handelabout = () => {
  const { islogin, setislogin } = useAuthCtx();
  const navigate = useNavigate();

  const domain = process.env.REACT_APP_DOMAINX;
  const hand = process.env.REACT_APP_WORK_PATH;
  const [aboutme, setaboutme] = useState([]);
  const [change, setchange] = useState(false);

  const [mydata, setmydata] = useState({
    tag: "",
    about: "",
  });
  const [profile, setprofile] = useState();
  const [resume, setresume] = useState();

  useEffect(() => {
    getaboutMe((err, res) => {
      if (err) {
        return;
      } else {
        setaboutme(res.data);
        setmydata({
          tag: res.data[0]?.tag,
          about: res.data[0]?.about,
        });
        setprofile(res.data[0]?.profile);
        setresume(res.data[0]?.resume);
      }
    });
  }, [change]);

  const handelinputChange = (e) => {
    const { name, value } = e.target;
    setmydata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handelSave = () => {
    const formdata = new FormData();
    formdata.append("tag", mydata.tag);
    formdata.append("about", mydata.about);
    formdata.append("profile", profile);
    formdata.append("resume", resume);
    updateaboutme(aboutme[0]?._id, formdata, (err, res) => {
      if (err) {
        toast.error("something went wrong", {
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
      } else {
        setchange(!change);

        toast.success("Sucessfully Saved", {
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
    });
  };

  const handelLogout = () => {
    logoutadmin((err, res) => {
      if (err) {
        toast.error("something went wrong", {
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
      toast.success("Logout sucessfull", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      localStorage.removeItem("admin_acess_token");
      setislogin(false);
    });
  };

  return (
    <>
      {islogin ? (
        <div>
          <div className={styles.handelContainer}>
            <div className={styles.logout}>
              <button onClick={handelLogout}>
                logout <TbLogout />
              </button>
            </div>
            <div className={styles.handelWraper}>
              <div className={styles.portfolioTabel}>
                <div id="head">
                  <div className="tittle">
                    <p>My details</p>
                    <h3>About Me</h3>
                  </div>
                </div>
                <div className={styles.worktabel}>
                  <table>
                    <tr>
                      <th>tag</th>
                      <th>profile</th>
                      <th>resume</th>
                      <th>about</th>
                      <th>update</th>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="text"
                          placeholder="Tittle of work"
                          name="tag"
                          value={mydata.tag}
                          onChange={handelinputChange}
                        />
                      </td>
                      <td>
                        <input
                          type="file"
                          onChange={(e) => {
                            setprofile(e.target.files[0]);
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="file"
                          onChange={(e) => {
                            setresume(e.target.files[0]);
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          placeholder="About me"
                          name="about"
                          value={mydata?.about}
                          onChange={handelinputChange}
                        />
                      </td>
                      <td>
                        <div className={styles.actions}>
                          <button
                            className={`actionButton ${styles.saveaction}`}
                            onClick={handelSave}
                          >
                            <MdOutlineDataSaverOn />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
                <div className={styles.workTabelpreview}>
                  <div id="head">
                    <div className="tittle">
                      <h3>Work preview</h3>
                    </div>
                  </div>
                  <div className={styles.workcontent}>
                    <table>
                      <tr>
                        <th>profile</th>
                        <th>Tag</th>
                        <th>resume</th>
                        <th>about</th>
                      </tr>
                      <tr>
                        <td>
                          <div className={styles.banner}>
                            <img src={`${aboutme[0]?.profile}`} />
                          </div>
                        </td>
                        <td>
                          <p>{aboutme[0]?.tag}</p>
                        </td>
                        <td>
                          <a
                            href={`${aboutme[0]?.resume}`}
                            target="_blank"
                            download
                          >
                            myresume.pdf
                          </a>
                        </td>
                        <td>
                          <p>{aboutme[0]?.about}</p>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <Link to={hand}>
                <button className={styles.backbutton}>admin panel</button>
              </Link>
            </div>
          </div>
          <ToastContainer />
        </div>
      ) : (
        navigate("/login")
      )}
    </>
  );
};

export default Handelabout;
