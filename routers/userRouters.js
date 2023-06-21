const express = require("express")
const router = express.Router()

const { getAllEntries, getEntry, showSearchForm, searchEntry, showIndex, } = require("../controllers/userControllers")

router.get("/", showIndex)



router.get("/entries/:page", getAllEntries)
router.get("/entry/:title/:email", getEntry)
router.get("/form/search", showSearchForm)
router.post("/search/:page", searchEntry)





module.exports = router