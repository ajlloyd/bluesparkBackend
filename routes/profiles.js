const express = require("express")
const router = express.Router()
const { MyProfile } = require("../controllers/profileController")

router.post("/profile", MyProfile);

module.exports = router