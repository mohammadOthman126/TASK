const express = require("express");
const router = express.Router();
const linkController = require("../contollers/LinkController");


router.post("/", linkController.createLink);


router.get("/", linkController.getLinks);

module.exports = router;
