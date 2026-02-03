const BrandService = require("../services/brandService");

exports.createBrand = async (req, res) => {
    try {
        const brand = await BrandService.createBrand(req.body);
        res.status(201).json(brand);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.getBrands = async (req, res) => {
    try {
        const brands = await BrandService.getBrands();
        res.json(brands);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.createBrandItem = async (req, res) => {
    try {
        const { brandId } = req.params;
        const brandItem = await BrandService.createBrandItem(parseInt(brandId), req.body);
        res.status(201).json(brandItem);
    } catch (err) {
        console.error(err);
        if (err.message === "Brand not found") return res.status(404).json({ error: err.message });
        res.status(500).json({ error: err.message });
    }
};

exports.getBrandItems = async (req, res) => {
    try {
        const { brandId } = req.params;
        const items = await BrandService.getBrandItems(parseInt(brandId));
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.deleteBrand = async (req, res) => {
    try {
        const { brandId } = req.params;
        const result = await BrandService.deleteBrand(parseInt(brandId));
        res.json(result);
    } catch (err) {
        console.error(err);
        if (err.message === "Brand not found") return res.status(404).json({ error: err.message });
        res.status(500).json({ error: err.message });
    }
};

exports.deleteBrandItem = async (req, res) => {
    try {
        const { brandId, brandItemId } = req.params;
        const result = await BrandService.deleteBrandItem(parseInt(brandId), parseInt(brandItemId));
        res.json(result);
    } catch (err) {
        console.error(err);
        if (err.message === "Brand item not found" || err.message === "Brand item does not belong to brand") {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: err.message });
    }
};
