const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["https://deploy-mern-1whq.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://tejas:MMs5hc2g3EKnUlNE@cluster0.dkfyse7.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Model
const FormData = require("./Model"); // Assuming your model file is named Model.js

// Start Server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Routes
app.post("/cards", async (req, res) => {
  try {
    const { name, id, schoolname, dob, phone, classes } = req.body;

    // Check if student already exists
    const existingStudent = await FormData.findOne({ id });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student already exists",
      });
    }

    // Create new student entry
    const newStudent = new FormData({
      name,
      id,
      schoolname,
      dob,
      phone,
      classes,
    });

    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Error saving form data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add this route to fetch all student data
app.get("/students", async (req, res) => {
  try {
    const students = await FormData.find();
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching student data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
