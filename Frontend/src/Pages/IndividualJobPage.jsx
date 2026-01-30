import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../config/env";

const IndividualJobPage = () => {
  const [job, setJob] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  // get individual job request

  useEffect(() => {
    const fetchJobsdata = async () => {
      try {
        const res = await fetch(`${API_URL}/jobs/${id}`);
        if (!res.ok) throw new Error("Job not found");
        const jobdata = await res.json();
        setJob(jobdata);
      } catch (err) {
        console.log("error fetching data", err);
      }
    };
    fetchJobsdata();
  }, []); // Your effect depends on id, but dependency array is empty: If the route changes from /jobs/1 → /jobs/2,
  //React will not refetch.

  // delete job

  const deletejob = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/jobs/${id}`);

      toast.success("Job deleted");
      console.log("DELETED ", res.data);
      navigate("/jobs");
    } catch (err) {
      console.log("Error", err);
      toast.error("Something went wrong please try again later");
    }
  };

  const handledelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this job?",
    );
    if (isConfirmed) {
      deletejob(job._id);
    }
  };

  // edit job

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-3" /> Back to Job Listings
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{job.type}</div>
                <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                <div className=" mb-4 flex align-middle justify-center md:justify-start">
                  {/* <i className="fa-solid fa-location-dot text-lg text-orange-700 mr-2"></i> */}
                  <FaMapMarker className="inline text-lg mr-1 mb-2  text-orange-700" />
                  <p className="text-orange-700 ">{job.location}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Job Description
                </h3>

                <p className="mb-4">{job.description}</p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Salary
                </h3>

                <p className="mb-4">{job.salary} / Year</p>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside>
              {/* <!-- Company Info --> */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>

                <h2 className="text-2xl">{job.company?.name}</h2>

                <p className="my-2">{job?.company?.description}</p>

                <hr className="my-4" />

                <h3 className="text-xl">Contact Email:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job?.company?.contactEmail}
                </p>

                <h3 className="text-xl">Contact Phone:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job?.company?.contactPhone}
                </p>
              </div>

              {/* <!-- Manage --> */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                <Link
                  onClick={() => handleEdit(job._id)}
                  to={`/edit-job/${job._id}`}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Job
                </Link>

                <button
                  onClick={() => handledelete(job._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default IndividualJobPage;
