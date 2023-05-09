import React, { useEffect } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { useState } from "react";

const Navportfolio = () => {
  const [val, setval] = useState(1);
  return (
    <>
      <nav className="link">
        <li>
          <a
            href="/"
            onClick={() => {
              setval(1);
            }}
            className={val === 1 ? "active" : ""}
          >
            <AiOutlineHome />
          </a>
        </li>
      </nav>
    </>
  );
};

export default Navportfolio;
