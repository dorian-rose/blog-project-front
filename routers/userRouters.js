const express = require("express")
const router = express.Router()
const { validateReader } = require("../middleware/validateUserReader")
const { getAllEntries, getEntry, showSearchForm, searchEntry, showLoginPage, loginUserReader, showIndex, logout } = require("../conrollers/userControllers")

router.get("/", showIndex)
router.get("/login", showLoginPage)
router.post("/reader/verification", loginUserReader)

//protect url middleware
//router.use(validateReader)

router.get("/entries/:page", validateReader, getAllEntries)
router.get("/entry/:title/:email", validateReader, getEntry)
router.get("/form/search", validateReader, showSearchForm)
router.post("/search/:page", validateReader, searchEntry)
router.get("/logout", logout)




module.exports = router