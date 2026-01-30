import React from "react";
import jobsdata from "../jobs.json";
import Singlejoblisting from "./Singlejoblisting";
import { useState, useEffect } from "react";
import { use } from "react";
import { useLocation } from "react-router-dom";

const Joblistings = ({ isHome = false }) => {
  const location = useLocation();

  const [jobs, setJobs] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:5000/jobs")
  //     .then((res) => res.json())
  //     .then((data) => setJobs(data));
  // }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.log("error fetching data ", err);
      }
    };
    fetchJobs();
    // if (location.state?.newJob) { // state pass from add-job page // 
    //   setJobs((prev) => [...prev, location.state.newJob]); // adding that new job in the previous array
    // }
  }, ); //[location.state]

  const Jobslisting = isHome ? jobs.slice(0, 3) : jobs;

  return (
    <>
      {/* <!-- Browse Jobs --> */}
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {isHome ? "Recent Jobs" : "Browse Jobs"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-4">
            {/* <!-- Job Listing 1 --> */}
            {Jobslisting.map((job) => (
              <Singlejoblisting key={job._id} jobsData={job} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Joblistings;
