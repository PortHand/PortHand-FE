import React from "react";
import styles from "./mywork.module.css";
import data from "../Data";
import Card from "../Card";
import Navportfolio from "../Navportfolio";
import { getworkethic } from "../API/apidataCall";
import { useEffect, useState } from "react";
const Mywork = () => {
  const [portdata, setportdata] = useState();

  useEffect(() => {
    getworkethic((err, res) => {
      if (err) {
        return;
      } else {
        setportdata(res.data);
      }
    });
  }, []);
  console.log(portdata);
  return (
    <>
      <Navportfolio />
      <div className={styles.myworkContainer}>
        <div className={styles.myworkWrap}>
          <div className={styles.headerbox}>
            <div id="head">
              <div className="tittle">
                <p>My recent work</p>
                <h3>Portfolio</h3>
              </div>
              <div className="desc">
                <p>
                  As a desiginer i have been working for an year in this sector,
                  and i have completed lot's of projects.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.works}>
            <div id="service_product">
              <div id="products">
                {portdata?.map((val, ind) => {
                  return (
                    <Card
                      key={ind}
                      pro={val.banner}
                      info={val.desc}
                      text_link={
                        val?.preview_link !== "NA" ? "Preview" : "Git-Code"
                      }
                      skill={val.skills}
                      link={
                        val?.preview_link !== "NA"
                          ? val?.preview_link
                          : val?.deploy_link
                      }
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mywork;
