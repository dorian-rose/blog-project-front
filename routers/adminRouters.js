const express = require("express")
const router = express.Router()
const { uploadMiddleware } = require("../middleware/multer")
//const { validateAuthor } = require("../middleware/validateUserAuthor")
const { validateJwt } = require("../middleware/validateJWT")
const { getEntries, getEntry, createEntry, showNewEntriesForm, showUpdateEntryForm, updateEntry, deleteEntry, showAdminLoginPage, loginUserAuthor, logout } = require("../controllers/adminControllers")


router.get("/login", showAdminLoginPage)
router.post("/author/verification", loginUserAuthor)
//protect url middleware
//router.use(validateAuthor)

router.get("/entries/:email/:page", validateJwt, getEntries)
router.get("/entry/:title/:email", validateJwt, getEntry)
router.get("/form/new/:email", validateJwt, showNewEntriesForm);
router.post("/create/:email", validateJwt, uploadMiddleware.single("image"), createEntry)
router.get("/form/update/:title/:email", validateJwt, showUpdateEntryForm);
router.post("/update/:title/:email", validateJwt, uploadMiddleware.single("image"), updateEntry)
router.get("/delete/:title/:email", validateJwt, deleteEntry)
router.get("/logout", logout)


module.exports = router