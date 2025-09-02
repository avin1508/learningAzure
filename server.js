// const express = require("express");
// const path = require("path");

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Serve static files from "public" folder
// app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("🚀 Hello Avinash! Your Azure app is running successfully.");
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
