const express = require("express");
const router = express.Router();
const auctionController = require("../controllers/auctionController");

router.get("/", auctionController.getAll);
router.get("/:id", auctionController.getOne);
router.post("/", auctionController.create);
router.put("/:id", auctionController.update);
router.delete("/:id", auctionController.remove);

module.exports = router;