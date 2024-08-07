const express = require("express");
const router = express.Router();

const { uploadFile, getFile, upload, deleteFile } = require("../controllers/files-controller");

router.post("/upload", upload().single("file"), uploadFile);
router.get("/file/:Id", getFile);
router.delete("/delete/:fileId", deleteFile);

module.exports = router;