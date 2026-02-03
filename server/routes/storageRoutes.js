const express = require("express");
const router = express.Router();
const storageController = require("../controllers/StorageController");

router.get("/", storageController.getAll);
router.post("/", storageController.create);
router.delete("/:id", storageController.delete);
router.post("/assign", storageController.assignToVentItem);

module.exports = router;
