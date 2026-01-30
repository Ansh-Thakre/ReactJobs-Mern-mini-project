const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = 5000;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const jobRoutes = require("./routes/jobRoutes");
app.use("/jobs", jobRoutes);

// app.post("/addjob", (req, res) => {
//   const job = req.body;
//   console.log("recevied post request");
//   console.log(job);
//   res.status(201).json({
//     message: "Job added successfully",
//     job,
//   });
// });

app.use("/addjob",jobRoutes);
app.use("/edit-job",jobRoutes);