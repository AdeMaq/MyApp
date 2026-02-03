const express = require("express");
const router = express.Router();
const favouriteController = require("../controllers/favouriteController");


router.get("/:userId", favouriteController.getFavouritesByUser);
router.post("/:userId", favouriteController.addFavourite);
router.delete("/:favouriteId", favouriteController.removeFavourite);

module.exports = router;