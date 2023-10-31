import React, { useEffect, useState } from "react";
import Card from "./Card";
import { getworkethic } from "./API/apidataCall";
import data from "./myworks.json";
import { Link } from "react-router-dom";
const Services = ({ ref4 }) => {
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
  // console.log(portdata);
  data.sort((a, b) => {
    return b.createdAt.$date.$numberLong - a.createdAt.$date.$numberLong;
  });
  return (
    <>
      <section id="portfolio" ref={ref4}>
        <div id="head">
          <div className="tittle">
            <p>My recent work</p>
            <h3>Portfolio</h3>
          </div>
          <div className="desc">
            <p>
              As a developer i have been working for an year in this sector, and
              i have completed lot's of projects.
            </p>
          </div>
        </div>
        <div id="service_product">
          <div id="products">
            {portdata
              ? portdata.map((val, ind) => {
                  if (ind < 6)
                    return (
                      <Card
                        key={ind}
                        pro={val.banner}
                        info={val.desc}
                        skill={val.skills}
                        text_link={
                          val?.preview_link !== "NA" ? "Preview" : "Git-Code"
                        }
                        link={
                          val?.preview_link !== "NA"
                            ? val?.preview_link
                            : val?.deploy_link
                        }
                      />
                    );
                  else return;
                })
              : data.map((val, ind) => {
                  if (ind < 6)
                    return (
                      <Card
                        key={ind}
                        pro={val.banner}
                        info={val.desc}
                        skill={val.skills}
                        text_link={
                          val?.preview_link !== "NA" ? "Preview" : "Git-Code"
                        }
                        link={
                          val?.preview_link !== "NA"
                            ? val?.preview_link
                            : val?.deploy_link
                        }
                      />
                    );
                  else return;
                })}
          </div>
        </div>
        <div className="redirect">
          <div className="desc">
            <Link to="work">
              <button className="btn">More Projects</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
