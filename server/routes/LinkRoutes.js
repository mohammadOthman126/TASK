const express = require("express");
const router = express.Router();
const linkController = require("../contollers/LinkController");


router.post("/api/links", linkController.createLink);

router.get("/api/links", linkController.getLinks);

router.post("/api/links/:slug/click", linkController.incrementClicks);

module.exports = router;
