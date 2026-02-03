const express = require("express");
const router = express.Router();
const processorController = require("../controllers/processorController");

router.get("/", processorController.getAll);
router.post("/", processorController.create);
router.delete("/:id", processorController.delete);
router.post("/assign", processorController.assignToVentItem);

module.exports = router;