const express = require("express")
const router = express.Router()
const { uploadMiddleware } = require("../middleware/multer")
const { getEntries, getEntry, createEntry, showNewEntriesForm, showUpdateEntryForm, updateEntry, deleteEntry } = require("../conrollers/adminControllers")

router.get("/entries/:email/:page", getEntries)
router.get("/entry/:title/:email", getEntry)
router.get("/form/new/:email", showNewEntriesForm);
router.post("/create/:email", uploadMiddleware.single("image"), createEntry)
router.get("/form/update/:title/:email", showUpdateEntryForm);
router.post("/update/:title/:email", uploadMiddleware.single("image"), updateEntry)
router.get("/delete/:title/:email", deleteEntry)


module.exports = router