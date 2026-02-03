const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandController");

router.post("/", brandController.createBrand);
router.get("/", brandController.getBrands);
router.post("/:brandId/items", brandController.createBrandItem);
router.get("/:brandId/items", brandController.getBrandItems);
router.delete("/:brandId", brandController.deleteBrand);
router.delete("/:brandId/items/:brandItemId", brandController.deleteBrandItem);

module.exports = router;
