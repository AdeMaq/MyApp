const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/:userId", cartController.getCart);
router.post("/:userId", cartController.addCartItem);
router.delete("/:cartId", cartController.removeCartItem);
router.delete("/user/:userId", cartController.clearCart);

module.exports = router;
