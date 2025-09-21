require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const linkRoutes = require("./routes/LinkRoutes");

const app = express();


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


app.use("/api/links", linkRoutes);


app.get("/", (req, res) => res.send("Mini URL Shortener Server is running"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
