const express = require("express");
const router = express.Router();
const ventController = require("../controllers/ventController");

router.get("/", ventController.getAllHierarchy);
router.post("/type", ventController.createVentType);
router.post("/vent", ventController.createVent);
router.post("/item", ventController.createVentItem);
router.post("/itemtype", ventController.createVentItemType);
// router.delete("/clear", ventController.clearAllVents);

router.put("/item/:id", ventController.updateVentItem);
router.delete("/type/:id", ventController.deleteVentType);
router.delete("/vent/:id", ventController.deleteVent);
router.delete("/item/:id", ventController.deleteVentItem);
router.delete("/itemtype/:id", ventController.deleteVentItemType);

router.delete("/clear", ventController.clearAllVents);

module.exports = router;
