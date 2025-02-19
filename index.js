const express = require("express");
const cors = require("cors");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const auth = require("./routes/Auth");
const complaint = require("./routes/Complaints");
require("dotenv").config();
database.connect();
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = 4000;

app.use("/api/v1/auth", auth);
app.use("/api/v1/complaint", complaint);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
