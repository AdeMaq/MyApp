const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "BrandItem",
    tableName: "brand_items",
    columns: {
        brandItemId: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar",
            length: 150,
            nullable: false
        },
        pic: {
            type: "text", 
            nullable: true
        }
    },
    relations: {
        brand: {
            target: "Brand",
            type: "many-to-one",
            joinColumn: { name: "brandId" },
            onDelete: "CASCADE",
            eager: true
        },
        products: {
            target: "Product",
            type: "one-to-many",
            inverseSide: "brandItem",
            cascade: true,
            onDelete: "CASCADE"
        }
    }
});
