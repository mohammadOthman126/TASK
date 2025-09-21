require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const linkRoutes = require("./routes/LinkRoutes");
const linkController = require("./contollers/LinkController");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.use("/", linkRoutes);


app.get("/:slug", linkController.redirect);


app.get("/", (req, res) => res.send("Mini URL Shortener Server is running"));


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
