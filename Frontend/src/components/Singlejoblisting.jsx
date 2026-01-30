import React, { useEffect, useState } from "react";
import { FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";

const Singlejoblisting = ({ jobsData }) => {
  const [SFdescription, setSFDescription] = useState(false);

  // let description = jobsData.description;
  let description = jobsData.description ?? "";

  if (!SFdescription) {
    description = description.substring(0, 80) + "...";
  }

  const toggledescription = () => {
    setSFDescription((prev) => !prev);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md relative">
        <div className="p-4">
          <div className="mb-6">
            <div className="text-gray-600 my-2">{jobsData.type}</div>
            <h3 className="text-xl font-bold">{jobsData.title}</h3>
          </div>

          <div className="mb-5">
            {description}{" "}
            <button
              onClick={toggledescription}
              className="text-indigo-500 cursor-pointer"
            >
              {SFdescription ? "See Less" : "See more"}
            </button>
          </div>

          <h3 className="text-indigo-500 mb-2">{jobsData.salary} / Year</h3>

          <div className="border border-gray-100 mb-5"></div>

          <div className="flex flex-col lg:flex-row justify-between mb-4">
            <div className="text-orange-700 mb-3">
              <FaMapMarker className="inline text-lg mr-1 mb-2" />
              {jobsData.location}
            </div>
            <Link
              to={`/jobs/${jobsData._id}`}
              className="h-9 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Singlejoblisting;
