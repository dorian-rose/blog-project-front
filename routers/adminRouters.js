const express = require("express")
const router = express.Router()
const { uploadMiddleware } = require("../middleware/multer")
const { validateAuthor } = require("../middleware/validateUserAuthor")
const { getEntries, getEntry, createEntry, showNewEntriesForm, showUpdateEntryForm, updateEntry, deleteEntry, showAdminLoginPage, loginUserAuthor, } = require("../conrollers/adminControllers")


router.get("/login", showAdminLoginPage)
router.post("/author/verification", loginUserAuthor)
//protect url middleware
//router.use(validateAuthor)

router.get("/entries/:email/:page", validateAuthor, getEntries)
router.get("/entry/:title/:email", validateAuthor, getEntry)
router.get("/form/new/:email", validateAuthor, showNewEntriesForm);
router.post("/create/:email", validateAuthor, uploadMiddleware.single("image"), createEntry)
router.get("/form/update/:title/:email", validateAuthor, showUpdateEntryForm);
router.post("/update/:title/:email", validateAuthor, uploadMiddleware.single("image"), updateEntry)
router.get("/delete/:title/:email", validateAuthor, deleteEntry)


module.exports = router