import React from "react";
import { HiViewGrid } from "react-icons/hi";
import { MdOutlineDevices } from "react-icons/md";
import { MdAnimation } from "react-icons/md";
import { CgFigma } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { IoLogoCss3 } from "react-icons/io";
import { DiBootstrap } from "react-icons/di";
import { GrCode } from "react-icons/gr";
import { SiRedux } from "react-icons/si";
import { FaRegCopyright } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { SiExpressvpn } from "react-icons/si";
import { TbApiApp } from "react-icons/tb";

const Card = (prop) => {
  const domain = process.env.REACT_APP_DOMAINX;
  const skilllist = {
    re: <FaReact />,
    hc: <FaHtml5 />,
    hc3: <IoLogoCss3 />,
    hc5: <FaHtml5 />,
    js: <IoLogoJavascript />,
    res: <MdOutlineDevices />,
    cpp: <GrCode />,
    c: <FaRegCopyright />,
    mdb: <SiMongodb />,
    ex: <SiExpressvpn />,
    njs: <FaNodeJs />,
    fig: <CgFigma />,
    an: <MdAnimation />,
    b: <DiBootstrap />,
    fb: <HiViewGrid />,
    rx: <SiRedux />,
    ra: <TbApiApp />,
  };
  // console.log(prop, "xhexk");
  return (
    <>
      <div className="boxes">
        <div className="p_img">
          <img src={`${prop.pro}`} alt="product_one" />
        </div>
        <div className="hov">
          <div className="show">
            {prop.skill.map((val, ind) => (
              <li key={ind}>{skilllist[val.value]}</li>
            ))}
          </div>
          <div className="over">
            <div className="list_over">
              <div className="list_over_under">
                {prop.skill.map((val, ind) => (
                  <li key={ind}>
                    {skilllist[val.value]}
                    <span>{val.label}</span>
                  </li>
                ))}
              </div>
            </div>
            <p>{prop.info}</p>
            <a href={prop.link} target="_blank" rel="noreferrer">
              <button>{prop.text_link}</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Card;
