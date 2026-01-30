import { useState } from "react";
import Navbar from "./components/Navbar";
import Homepage from "./Pages/Homepage";
import { Route, Routes } from "react-router-dom";
import JobsPage from "./Pages/JobsPage";
import NotfoundPage from "./Pages/NotfoundPage";
import IndividualJobPage from "./Pages/IndividualJobPage";
import AddJobpage from "./Pages/AddJobpage";
import EditJobpage from "./Pages/EditJobpage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/addjob" element={<AddJobpage />} />
        <Route path="/jobs/:id" element={<IndividualJobPage />} />
        <Route path="/edit-job/:id" element={<EditJobpage />} />
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
