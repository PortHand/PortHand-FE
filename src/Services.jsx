import React, { useEffect, useState } from "react";
import Card from "./Card";
import data from "./Data";
import { getworkethic } from "./API/apidataCall";
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
            {portdata?.map((val, ind) => {
              if (ind < 6)
                return (
                  <Card
                    key={ind}
                    pro={val.banner}
                    info={val.desc}
                    skill={val.skills}
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
              <p>Tap to view All of Works till Now </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
