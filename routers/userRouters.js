const express = require("express")
const router = express.Router()
const { validateReader } = require("../middleware/validateUserReader")
const { getAllEntries, getEntry, showSearchForm, searchEntry, showLoginPage, loginUserReader, showIndex, logout } = require("../conrollers/userControllers")

router.get("/", showIndex)
router.get("/login", showLoginPage)
router.post("/reader/verification", loginUserReader)
//proteger url middleware
router.use(validateReader)

router.get("/entries/:page", getAllEntries)
router.get("/entry/:title/:email", getEntry)
router.get("/form/search", showSearchForm)
router.post("/search/:page", searchEntry)
router.get("/logout", logout)




module.exports = router