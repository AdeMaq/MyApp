const categoryService = require("../services/CategoryService");

exports.getAllHierarchy = async (req, res) => {
    try {
        const categories = await categoryService.getAllHierarchy();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createCategoryType = async (req, res) => {
    try {
        const ct = await categoryService.createCategoryType(req.body);
        res.json(ct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const cat = await categoryService.createCategory(req.body);
        res.json(cat);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createCategoryItem = async (req, res) => {
    try {
        const item = await categoryService.createCategoryItem(req.body);
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.clearAllCategories = async (req, res) => {
    try {
        const result = await categoryService.clearAllCategories();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message || "Failed to clear categories" });
    }
};