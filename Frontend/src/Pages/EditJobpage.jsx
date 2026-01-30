import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditJobpage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    type: "",
    location: "",
    salary: "",
    description: "",
    company: {
      name: "",
      description: "",
      contactEmail: "",
      contactPhone: "",
    },
  });

  useEffect(() => {
    const jobdetail = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/jobs/${id}`);
        setJob(res.data);
        console.log(res.data);
      } catch (err) {
        console.log("error fetching data", err);
      }
    };
    jobdetail();
  }, [id]);

  // changes the by default value by curr value
  // handle change for nexted object

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "company.name") {
      setJob((prev) => ({
        ...prev,
        company: {
          ...prev.company,
          name: value,
        },
      }));
    } else if (name === "company.location") {
      setJob((prev) => ({
        ...prev,
        company: {
          ...prev.company,
          location: value,
        },
      }));
    } else if (name === "company.description") {
      setJob((prev) => ({
        ...prev,
        company: {
          ...prev.company,
          description: value,
        },
      }));
    } else if (name === "company.contactEmail") {
      setJob((prev) => ({
        ...prev,
        company: {
          ...prev.company,
          contactEmail: value,
        },
      }));
    } else if (name === "company.contactPhone") {
      setJob((prev) => ({
        ...prev,
        company: {
          ...prev.company,
          contactPhone: value,
        },
      }));
    } else {
      setJob((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handleupdate -submit
  const Handleupdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/edit-job/${job._id}`,
        job,
      );
      toast.success("Job updated successfully !!");
      // navigate("/jobs");
      setTimeout(() => {
        navigate("/jobs");
      }, 500);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form id="formsubmit" onSubmit={Handleupdate}>
              <h2 className="text-3xl text-center font-semibold mb-6">
                Edit Job
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Job Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="border rounded w-full py-2 px-3"
                  required
                  value={job.type}
                  onChange={handleChange}
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Remote">Remote</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Job Listing Name
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="border rounded w-full py-2 px-3 mb-2"
                  required
                  value={job.title}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="border rounded w-full py-2 px-3"
                  required
                  rows="4"
                  value={job.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Salary
                </label>
                <select
                  id="salary"
                  name="salary"
                  className="border rounded w-full py-2 px-3"
                  required
                  value={job.salary}
                  onChange={handleChange}
                >
                  <option value="Under $50K">Under $50K</option>
                  <option value="$50K - 60K">$50K - $60K</option>
                  <option value="$60K - 70K">$60K - $70K</option>
                  <option value="$70K - 80K">$70K - $80K</option>
                  <option value="$80K - 90K">$80K - $90K</option>
                  <option value="$90K - 100K">$90K - $100K</option>
                  <option value="$100K - 125K">$100K - $125K</option>
                  <option value="$125K - 150K">$125K - $150K</option>
                  <option value="$150K - 175K">$150K - $175K</option>
                  <option value="$175K - 200K">$175K - $200K</option>
                  <option value="Over $200K">Over $200K</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="border rounded w-full py-2 px-3 mb-2"
                  required
                  value={job.location}
                  onChange={handleChange}
                />
              </div>

              <h3 className="text-2xl mb-5">Company Info</h3>

              <div className="mb-4">
                <label
                  htmlFor="company"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company.name"
                  className="border rounded w-full py-2 px-3"
                  required
                  value={job.company.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="company_description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Company Description
                </label>
                <textarea
                  id="company_description"
                  name="company.description"
                  className="border rounded w-full py-2 px-3"
                  rows="4"
                  value={job.company.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="contact_email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contact_email"
                  name="company.contactEmail"
                  className="border rounded w-full py-2 px-3"
                  required
                  value={job.company.contactEmail}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="contact_phone"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Contact Phone
                </label>
                <input
                  type="tel"
                  id="contact_phone"
                  name="company.contactPhone"
                  className="border rounded w-full py-2 px-3"
                  value={job.company.contactPhone}
                  required
                  onChange={handleChange}
                />
              </div>

              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4"
                type="submit"
              >
                Edit Job
              </button>
            </form>
          </div>
          {/* {message && <p>{message}</p>} */}
        </div>
      </section>
    </>
  );
};

export default EditJobpage;
