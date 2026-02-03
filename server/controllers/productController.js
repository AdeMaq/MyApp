const productService = require('../services/productService');

module.exports = {
    async getProducts(req, res) {
        try {
            const products = await productService.getAll(req.query); 
            res.json(products);
        } catch (err) {
            console.error("Error fetching products:", err);
            res.status(500).json({ error: err.message });
        }
    },

    async getProduct(req, res) {
        try {
            const product = await productService.getById(parseInt(req.params.id));
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.json(product);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async createProduct(req, res) {
        try {
            const newProduct = await productService.create(req.body);
            res.status(201).json(newProduct);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async updateProduct(req, res) {
        try {
            const updated = await productService.update(parseInt(req.params.id), req.body);
            if (!updated) return res.status(404).json({ message: 'Product not found' });
            res.json(updated);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async deleteProduct(req, res) {
        try {
            await productService.remove(parseInt(req.params.id));
            res.json({ message: 'Product deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
