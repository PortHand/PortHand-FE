import React, { useEffect, useState } from "react";
import styles from "./Handel.module.css";
import { MdOutlineDataSaverOn } from "react-icons/md";
import { TiDocumentDelete } from "react-icons/ti";
import { getworkethic } from "../API/apidataCall";
import { postWorkData } from "../API/apidataCall";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getworkasperid } from "../API/apidataCall";
import { updateWorkData } from "../API/apidataCall";
import useAuthCtx from "../auth/authContext";
import { logoutadmin } from "../API/authApi";
import { TbLogout } from "react-icons/tb";

const Handeledit = () => {
  const { islogin, setislogin } = useAuthCtx();
  const navigate = useNavigate();

  const hand = process.env.REACT_APP_WORK_PATH;
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
  const [thisdata, setthisdata] = useState([]);
  const [change, setchange] = useState(false);
  //   const [work, setwork] = useState([]);
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

  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    getworkasperid(id, (err, res) => {
      if (err) {
        return;
      } else {
        setthisdata(res.data);
        // console.log(res.data[0].skills);
        setSkills(res.data[0]?.skills);
        setnewwork({
          tittle: res.data[0].tittle,
          preview: res.data[0].preview_link,
          depoly: res.data[0].deploy_link,
          desc: res.data[0].desc,
        });
      }
    });
  }, [id]);

  //   useEffect(() => {
  //     getworkethic((err, res) => {
  //       if (err) {
  //         return;
  //       } else {
  //         setwork(res.data);
  //       }
  //     });
  //   }, [change]);
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
    // console.log(formdata);
    updateWorkData(id, formdata, (err, res) => {
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
                    <p>Edit current work</p>
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
                          {/* <button
                        className={`actionButton ${styles.deleteaction}`}
                        onClick={handelcut}
                      >
                         <TiDocumentDelete /> 
                      </button> */}
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
                <Link to={hand}>
                  <button className={styles.backbutton}>admin panel</button>
                </Link>
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

export default Handeledit;
