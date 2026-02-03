const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");

router.get("/", categoryController.getAllHierarchy);
router.post("/type", categoryController.createCategoryType);
router.post("/category", categoryController.createCategory);
router.post("/item", categoryController.createCategoryItem);
router.delete("/clear", categoryController.clearAllCategories);



module.exports = router;
