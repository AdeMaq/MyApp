const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Product",
    tableName: "products",
    columns: {
        productId: {
            primary: true,
            type: "int",
            generated: true
        },
        title: {
            type: "varchar",
            length: 255,
            nullable: false
        },
        type: {
            type: "varchar",
            length: 50,
            nullable: false
        },
        image: {
            type: "text",
            nullable: true
        },
        condition: {
            type: "varchar",
            length: 100,
            nullable: true
        },
        delivery: {
            type: "varchar",
            length: 100,
            nullable: true
        },
        price: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: false
        },
        newPrice: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: true
        },
        discount: {
            type: "varchar",
            length: 50,
            nullable: true
        },
        tag: {
            type: "varchar",
            length: 50,
            nullable: true
        },
    },
    relations: {
        favourites: {
            target: "Favourite",
            type: "one-to-many",
            inverseSide: "product",
            cascade: true,
            onDelete: "CASCADE",
        },
        cart: {
            target: "Cart",
            type: "one-to-many",
            inverseSide: "product",
            cascade: true,
            onDelete: "CASCADE",
        },
        categoryType: {
            target: "CategoryType",
            type: "many-to-one",
            joinColumn: { name: "categoryTypeId" },
            nullable:true,
            onDelete: "SET NULL",
            eager: true,
        },
        category: {
            target: "Category",
            type: "many-to-one",
            joinColumn: { name: "categoryId" },
            nullable:true,
            onDelete: "SET NULL",
            eager: true,
        },
        categoryItem: {
            target: "CategoryItem",
            type: "many-to-one",
            joinColumn: { name: "categoryItemId" },
            nullable:true,
            onDelete: "SET NULL",
            eager: true,
        },
        ventType: {
            target: "VentType",
            type: "many-to-one",
            joinColumn: { name: "ventTypeId" },
            nullable:true,
            onDelete: "SET NULL",
            eager: true,
        },
        vent: {
            target: "Vent",
            type: "many-to-one",
            joinColumn: { name: "ventId" },
            nullable:true,
            onDelete: "SET NULL",
            eager: true,
        },
        ventItem: {
            target: "VentItem",
            type: "many-to-one",
            joinColumn: { name: "ventItemId" },
            nullable:true,
            onDelete: "SET NULL",
            eager: true,
        },
        ventItemType: {
            target: "VentItemType",
            type: "many-to-one",
            joinColumn: { name: "ventItemTypeId" },
            nullable:true,
            onDelete: "SET NULL",
            eager: true,
        },
        brandItem: {
            target: "BrandItem",
            type: "many-to-one",
            joinColumn: { name: "brandItemId" },
            nullable:true,
            onDelete: "SET NULL",
            eager: true
        },
    }
});
const { AppDataSource } = require('../data-source');
const productRepo = AppDataSource.getRepository('Product');

function cleanProductData(data) {
    const price = data.price ? parseFloat(data.price) : 0;
    let discountValue = data.discount ? data.discount.toString().trim() : null;
    let newPrice = null;

    if (discountValue) {
        if (discountValue.endsWith('%')) {
            const percent = parseFloat(discountValue.replace('%', ''));
            if (!isNaN(percent)) {
                newPrice = price - (price * (percent / 100));
            }
        } else {
            const fixed = parseFloat(discountValue);
            if (!isNaN(fixed)) {
                newPrice = price - fixed;
            }
        }
        if (newPrice < 0) newPrice = 0;
    }

    return {
        ...data,
        price,
        newPrice: newPrice !== null ? parseFloat(newPrice.toFixed(2)) : null,
        discount: discountValue || null
    };
}

module.exports = {
    async getAll(filters = {}) {
        const where = {};
        if (filters.categoryTypeId && !isNaN(filters.categoryTypeId)) {
            where.categoryType = { categoryTypeId: parseInt(filters.categoryTypeId) };
        }
        if (filters.categoryId && !isNaN(filters.categoryId)) {
            where.category = { categoryId: parseInt(filters.categoryId) };
        }
        if (filters.categoryItemId && !isNaN(filters.categoryItemId)) {
            where.categoryItem = { categoryItemId: parseInt(filters.categoryItemId) };
        }
        if (filters.ventTypeId) where.ventType = { ventTypeId: +filters.ventTypeId };
        if (filters.ventId) where.vent = { ventId: +filters.ventId };
        if (filters.ventItemId) where.ventItem = { ventItemId: +filters.ventItemId };
        if (filters.ventItemTypeId) where.ventItemType = { ventItemTypeId: +filters.ventItemTypeId };
        return await productRepo.find({
            where,
            relations: ["categoryType", "category", "categoryItem", "ventType", "vent", "ventItem", "ventItemType"],
        });
        
    },

    async getById(id) {
        return await productRepo.findOne({
            where: { productId: id },
            relations: ["categoryType", "category", "categoryItem", "ventType", "vent", "ventItem", "ventItemType"],
        });
    },

    async create(data) {
        const product = productRepo.create({
            ...cleanProductData(data),
            categoryType: data.categoryTypeId ? { categoryTypeId: data.categoryTypeId } : null,
            category: data.categoryId ? { categoryId: data.categoryId } : null,
            categoryItem: data.categoryItemId ? { categoryItemId: data.categoryItemId } : null,

            // Optional vent relations
            ventType: data.ventTypeId ? { ventTypeId: data.ventTypeId } : null,
            vent: data.ventId ? { ventId: data.ventId } : null,
            ventItem: data.ventItemId ? { ventItemId: data.ventItemId } : null,
            ventItemType: data.ventItemTypeId ? { ventItemTypeId: data.ventItemTypeId } : null,
        });
        return await productRepo.save(product);
    },

    async update(id, data) {
        await productRepo.update(
            { productId: id },
            {
                ...cleanProductData(data),
                categoryType: data.categoryTypeId ? { categoryTypeId: data.categoryTypeId } : null,
                category: data.categoryId ? { categoryId: data.categoryId } : null,
                categoryItem: data.categoryItemId ? { categoryItemId: data.categoryItemId } : null,

                ventType: data.ventTypeId ? { ventTypeId: data.ventTypeId } : null,
                vent: data.ventId ? { ventId: data.ventId } : null,
                ventItem: data.ventItemId ? { ventItemId: data.ventItemId } : null,
                ventItemType: data.ventItemTypeId ? { ventItemTypeId: data.ventItemTypeId } : null,
            }
        );
        return await productRepo.findOne({
            where: { productId: id },
            relations: ["categoryType", "category", "categoryItem", "ventType", "vent", "ventItem", "ventItemType"],
        });
    },

    async remove(id) {
        return await productRepo.delete({ productId: id });
    }
};
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
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
