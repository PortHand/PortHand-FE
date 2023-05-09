import React, { useEffect, useState } from "react";
import styles from "./Handel.module.css";
import { MdDelete } from "react-icons/md";
import { MdOutlineDataSaverOn } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { TiDocumentDelete } from "react-icons/ti";
import { getworkethic } from "../API/apidataCall";
import { postWorkData } from "../API/apidataCall";
import { deletework } from "../API/apidataCall";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { verifyToken } from "../API/authApi";
import Select from "react-select";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuthCtx from "../auth/authContext";
import { TbLogout } from "react-icons/tb";
import { FaUserTie } from "react-icons/fa";
import { logoutadmin } from "../API/authApi";
const Handel = () => {
  const navigate = useNavigate();
  const domain = process.env.REACT_APP_DOMAINX;
  const hand = process.env.REACT_APP_WORK_PATH;
  const { islogin, setislogin } = useAuthCtx();

  console.log(islogin, 90);
  const options = [
    { label: "React", value: "re" },
    { label: "HTML/CSS", value: "hc" },
    { label: "HTML/CSS3", value: "hc3" },
    { label: "HTML5/CSS", value: "hc5" },
    { label: "Javascript", value: "js" },
    { label: "Responsive", value: "res" },
    { label: "C++", value: "cpp" },
    { label: "C", value: "c" },
    { label: "MongoDb", value: "mdb" },
    { label: "Express", value: "ex" },
    { label: "NodeJs", value: "njs" },
    { label: "Figma", value: "fig" },
    { label: "Animation", value: "an" },
    { label: "Bootstrap", value: "b" },
    { label: "Flex-Box", value: "fb" },
    { label: "Redux", value: "rx" },
    { label: "RapidApi", value: "ra" },
  ];
  const [change, setchange] = useState(false);
  const [work, setwork] = useState([]);
  const [newwork, setnewwork] = useState({
    tittle: "",
    preview: "",
    depoly: "",
    desc: "",
  });
  const [imagex, setImagex] = useState("");
  console.log(imagex);

  const [skills, setSkills] = useState([]);

  const handleChangeSkill = (skills) => {
    setSkills(skills || []);
  };

  useEffect(() => {
    getworkethic((err, res) => {
      if (err) {
        return;
      } else {
        setwork(res.data);
      }
    });
  }, [change]);
  const handelcut = () => {
    console.log("clicked");
    setnewwork({
      tittle: "",
      preview: "",
      depoly: "",
      desc: "",
    });
    setSkills([]);
    setImagex({});
  };
  const handelinputChange = (e) => {
    const { name, value } = e.target;
    setnewwork((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handelSave = () => {
    const formdata = new FormData();
    formdata.append("tittle", newwork.tittle);
    console.log("-- ", imagex);
    formdata.append("banner", imagex);
    formdata.append("preview_link", newwork.preview);
    formdata.append("deploy_link", newwork.depoly);
    formdata.append("desc", newwork.desc);
    formdata.append("skills", JSON.stringify(skills));
    console.log(formdata);
    postWorkData(formdata, (err, res) => {
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
        handelcut();
        return;
      }
    });
  };

  const handeldelte = (id) => {
    deletework(id, (err, res) => {
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
        toast.success("Sucessfully Deleted", {
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
            <Link to="/adminpanelaboutme">
              <FaUserTie className="right_social_icons" />
            </Link>
              <button onClick={handelLogout}>
                logout <TbLogout className="right_social_icons" />
              </button>
            </div>
            <div className={styles.handelWraper}>
              <div className={styles.portfolioTabel}>
                <div id="head">
                  <div className="tittle">
                    <p>My works</p>
                    <h3>Admin Panel</h3>
                  </div>
                  <div className="desc">
                    <p>
                      Add the details of your works and you can delete it from
                      here
                    </p>
                  </div>
                </div>
                <div className={styles.worktabel}>
                  <table>
                    <tr>
                      <th>tittle</th>
                      <th>banner</th>
                      <th>preview Link</th>
                      <th>deploy Link</th>
                      <th>description</th>
                      <th>skills</th>
                      <th>Action</th>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="text"
                          placeholder="Tittle of work"
                          name="tittle"
                          value={newwork.tittle}
                          onChange={handelinputChange}
                        />
                      </td>
                      <td>
                        <input
                          type="file"
                          onChange={(e) => {
                            setImagex(e.target.files[0]);
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          placeholder="Add preview link"
                          name="preview"
                          value={newwork.preview}
                          onChange={handelinputChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          placeholder="Code link"
                          name="depoly"
                          value={newwork.depoly}
                          onChange={handelinputChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          placeholder="Sort description"
                          name="desc"
                          value={newwork.desc}
                          onChange={handelinputChange}
                        />
                      </td>
                      <td className={styles.skillsoption}>
                        <Select
                          options={options}
                          onChange={handleChangeSkill}
                          value={skills}
                          isMulti
                        />
                      </td>
                      <td>
                        <div className={styles.actions}>
                          <button
                            className={`actionButton ${styles.deleteaction}`}
                            onClick={handelcut}
                          >
                            <TiDocumentDelete />
                          </button>
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
                        <th>banner</th>
                        <th>tittle</th>
                        <th>preview Link</th>
                        <th>deploy Link</th>
                        <th>description</th>
                        <th>skills</th>
                        <th>Action</th>
                      </tr>
                      {work.map((val, ind) => (
                        <tr>
                          <td>
                            <div className={styles.banner}>
                              <img src={`${domain}${val?.banner}`} />
                            </div>
                          </td>
                          <td style={{ textTransform: "capitalize" }}>
                            {val?.tittle}
                          </td>
                          <td>
                            {" "}
                            <a
                              href={val?.preview_link}
                            >{`preview.${val?.tittle}.com`}</a>
                          </td>
                          <td>
                            <a
                              href={val?.deploy_link}
                            >{`depoly.${val?.tittle}.com`}</a>
                          </td>
                          <td>{val?.desc}</td>
                          <td>html/css </td>
                          <td>
                            <div className={styles.actions}>
                              <button
                                className={`actionButton ${styles.deleteaction}`}
                                onClick={() => {
                                  handeldelte(val?._id);
                                }}
                              >
                                <MdDelete />
                              </button>
                              <Link to={`${hand}/${val?._id}`}>
                                <button
                                  className={`actionButton ${styles.edit}`}
                                >
                                  <TbEdit />
                                </button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </table>
                  </div>
                </div>
              </div>
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

export default Handel;
