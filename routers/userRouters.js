const express = require("express")
const router = express.Router()

const { getAllEntries, getEntry, searchEntry } = require("../conrollers/userControllers")

router.get("/entries/:page", getAllEntries)
router.get("/entry/:title/:email", getEntry)
router.get("/search/:search/:page", searchEntry)


module.exports = router