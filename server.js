const express = require("express");
const path = require("path");
require("dotenv").config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// API route for button click
app.get("/api/greet", (req, res) => {
    console.log("Greet API called");
  res.json({ message: process.env.GREETING_MESSAGE });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
