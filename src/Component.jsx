import React, { useEffect, useState } from "react";
import { BsGithub } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsGlobe } from "react-icons/bs";
import { BsCapslockFill } from "react-icons/bs";
import CV from "./assect/Prince_raj-resume.pdf";
import { getaboutMe } from "./API/apidataCall";
const Component = (prop) => {
  const domain = process.env.REACT_APP_DOMAINX;
  const hand = process.env.REACT_APP_WORK_PATH;

  const [data, setcv] = useState();
  useEffect(() => {
    getaboutMe((err, res) => {
      if (err) return;
      else {
        setcv(res.data[0]);
      }
    });
  }, []);
  return (
    <>
      <div id="home">
        <div className="cv">
          <a
            href={data?.resume ? CV : data?.resume}
            target="_blank"
            download
            className="btn1 download"
          >
            <p>Download CV</p>
          </a>
          <div className="btn1 talk">
            <a href="#contact">
              <p>Let's Talk</p>
            </a>
          </div>
        </div>
        <div className="right">
          <a
            href="https://github.com/Prince8032"
            target="_blank"
            rel="noreferrer"
          >
            <BsGithub className="right_social_icons" />
          </a>
          <a
            href="www.linkedin.com/in/prince-raj-597b8b214"
            target="_blank"
            rel="noreferrer"
          >
            <BsLinkedin className="right_social_icons" />
          </a>
          <a
            href="https://www.fiverr.com/prince00raj"
            target="_blank"
            rel="noreferrer"
          >
            <BsGlobe className="right_social_icons" />
          </a>
          <a href={hand} target="_blank" rel="noreferrer">
            <BsCapslockFill className="right_social_icons" />
          </a>
        </div>
        <div className="box">
          <div className="text">
            <h1>
              {prop.tone}
              <br />
              <span>{prop.ttwo}</span>
            </h1>
            <p style={{ fontFamily: "serif" }}>
              {data ? data?.tag : "MERNSTACK Web developer"}
            </p>
            <p>
              I create websites and digital goods for start-up companies,
              well-known brands, and creative entrepreneurs.
            </p>
            <a href="#services">
              <button className="btn">services</button>
            </a>
          </div>
          <div className="img">
            <img src={prop.img} alt="" />
          </div>
        </div>
        <div className="left">
          <a href="#eabout">Scroll down</a>
        </div>
      </div>
    </>
  );
};
export default Component;
