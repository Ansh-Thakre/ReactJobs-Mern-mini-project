const express = require("express");
const jobsData = require("../models/JobsData");

const router = express.Router();

// GET all jobs
router.get("/", async (req, res) => {
  const jobs = await jobsData.find();
  res.json(jobs);
});

// individual job

router.get("/:id", async (req, res) => {
  try {
    const jobs = await jobsData.findById(req.params.id);

    if (!jobs) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ message: "Invalid job ID" });
  }
});

// addjob route

router.post("/", async (req, res) => {
  try {
    const job = new jobsData(req.body);
    const savedjob = await job.save();
    res.status(201).json({
      message: "Job added successfully",
      job: savedjob,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete job

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deletejob = await jobsData.findByIdAndDelete(id);

    if (!deletejob) {
      return res.status(404).json({ message: "JOB NOT FOUND" });
    }
    res.json({
      message: "Job deleted successfully",
      deletejob,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// UPDATE REQUEST

router.put("/:id", async (req, res) => {
  // const id = req.params.id;
  // const data = req.body;
  console.log("Recieved put request for this id :");
  // console.log(data);
  try {
    const updatejob = await jobsData.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );
    res.status(200).json(updatejob);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
