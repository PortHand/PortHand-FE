import React, { useEffect } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { RiServiceLine } from "react-icons/ri";
import { BiMessageSquareDetail } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import { useState } from "react";

const Navbar = ({ iv1, iv2, iv3, iv4, iv5 }) => {
  const [val, setval] = useState(1);
  useEffect(() => {
    if (iv1) {
      setval(1);
    } else if (iv2) {
      setval(2);
    } else if (iv3) {
      setval(3);
    } else if (iv4) {
      setval(4);
    } else if (iv5) {
      setval(5);
    }
  }, [iv1, iv2, iv3, iv4, iv5]);
  return (
    <>
      <nav className="link">
        <li>
          <a
            href="/#HOME"
            onClick={() => {
              setval(1);
            }}
            className={val === 1 ? "active" : ""}
          >
            <AiOutlineHome />
          </a>
        </li>
        <li>
          <a
            href="/#eabout"
            onClick={() => {
              setval(2);
            }}
            className={val === 2 ? "active" : ""}
          >
            <AiOutlineUser />
          </a>
        </li>
        <li>
          <a
            href="/#services"
            onClick={() => {
              setval(3);
            }}
            className={val === 3 ? "active" : ""}
          >
            <RiServiceLine />
          </a>
        </li>
        <li>
          <a
            href="/#portfolio"
            onClick={() => {
              setval(4);
            }}
            className={val === 4 ? "active" : ""}
          >
            <AiOutlineSetting />
          </a>
        </li>
        <li>
          <a
            href="/#contact"
            onClick={() => {
              setval(5);
            }}
            className={val === 5 ? "active" : ""}
          >
            <BiMessageSquareDetail />
          </a>
        </li>
      </nav>
    </>
  );
};

export default Navbar;
