const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Brand",
    tableName: "brands",
    columns: {
        brandId: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar",
            length: 150,
            nullable: false
        },
        icon: {
            type: "text",
            nullable: true
        },
    },
    relations: {
        brandItems: {
            target: "BrandItem",
            type: "one-to-many",
            inverseSide: "brand",
            cascade: true,
            onDelete: "CASCADE"
        }
    }
});
