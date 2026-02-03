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
        ventItem: {
            target: "VentItem",
            type: "many-to-one",
            joinColumn: { name: "ventItemId" },
            onDelete: "SET NULL",
            eager: true,
        },
    }
});

const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "VentItem",
    tableName: "vent_items",
    columns: {
        ventItemId: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar",
            length: 100,
            nullable: false
        },
        storage: {
            type: "varchar",
            length: 500,
            nullable: false
        }
    },
    relations: {
        products: {
            target: "Product",
            type: "one-to-many",
            inverseSide: "ventItem",
            onDelete: "SET NULL",
        },
    },
});

const { AppDataSource } = require("../data-source");

const VentTypeRepo = AppDataSource.getRepository("VentType");
const VentRepo = AppDataSource.getRepository("Vent");
const VentItemRepo = AppDataSource.getRepository("VentItem");
const VentItemTypeRepo = AppDataSource.getRepository("VentItemType");

class VentService {
    async getAllHierarchy() {
        return await VentTypeRepo.find({
            relations: [
                "vents",
                "vents.ventItems",
                "vents.ventItems.ventItemTypes"
            ],
            order: { ventTypeId: "ASC" },
        });
    }

    async createVentItem(data) {
        const item = VentItemRepo.create({
            name: String(data.name).trim(),
            storage: data.storage ? String(data.storage).trim() : "",
            vent: data.ventId ? { ventId: data.ventId } : null
        });
        return await VentItemRepo.save(item);
    }


}

module.exports = new VentService();
const express = require("express");
const router = express.Router();
const ventController = require("../controllers/ventController");

router.get("/", ventController.getAllHierarchy);
router.post("/type", ventController.createVentType);
router.post("/vent", ventController.createVent);
router.post("/item", ventController.createVentItem);
router.post("/itemtype", ventController.createVentItemType);
router.delete("/clear", ventController.clearAllVents);

module.exports = router;

const { AppDataSource } = require('../data-source');
const productRepo = AppDataSource.getRepository('Product');
// const VentItemRepo = AppDataSource.getRepository("VentItem");

module.exports = {

    async create(data) {
        const product = productRepo.create({
            ...cleanProductData(data),
            categoryType: data.categoryTypeId ? { categoryTypeId: data.categoryTypeId } : null,
            category: data.categoryId ? { categoryId: data.categoryId } : null,
            categoryItem: data.categoryItemId ? { categoryItemId: data.categoryItemId } : null,
            ventType: data.ventTypeId ? { ventTypeId: data.ventTypeId } : null,
            vent: data.ventId ? { ventId: data.ventId } : null,
            ventItem: data.ventItemId ? { ventItemId: data.ventItemId } : null,
            ventItemType: data.ventItemTypeId ? { ventItemTypeId: data.ventItemTypeId } : null,
        });
        // return await productRepo.save(product);
        if (data.ventItemId && data.storage) {
            try {
                const ventItem = await VentItemRepo.findOneBy({ ventItemId: data.ventItemId });
                if (ventItem) {
                    ventItem.storage = String(data.storage).trim();
                    await VentItemRepo.save(ventItem);
                }
            } catch (err) {
                console.error("Error updating VentItem storage:", err);
            }
        }

        return await productRepo.save(product);
    },

};




