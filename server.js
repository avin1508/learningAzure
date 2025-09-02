const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// API route for button click
app.get("/api/greet", (req, res) => {
  res.json({ message: "🚀 Hello Avinash! Your button works perfectly on Azure!" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
