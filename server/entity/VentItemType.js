const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "VentItemType",
    tableName: "vent_item_types",
    columns: {
        ventItemTypeId: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar",
            length: 100,
            nullable: false
        },
    },
    relations: {
        ventItem: { 
            target: "VentItem",
            type: "many-to-one",
            joinColumn: { name: "ventItemId" },
            onDelete: "CASCADE",
            eager: true,
        },
        products: {
            target: "Product",
            type: "one-to-many",
            inverseSide: "ventItemType",
            onDelete: "SET NULL",
        },
    },
});
