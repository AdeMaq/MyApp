const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Vent",
    tableName: "vents",
    columns: {
        ventId: {
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
        ventType: {
            target: "VentType",
            type: "many-to-one",
            joinColumn: { name: "ventTypeId" },
            nullable:true,
            onDelete: "CASCADE",
            eager: true,
        },
        ventItems: {
            target: "VentItem",
            type: "one-to-many",
            inverseSide: "vent",
            cascade: true,
            onDelete: "CASCADE",
        },
        products: {
            target: "Product",
            type: "one-to-many",
            inverseSide: "vent",
            onDelete: "SET NULL",
        },
    },
});
