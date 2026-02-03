const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "VentType",
    tableName: "vent_types",
    columns: {
        ventTypeId: {
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
        vents: {
            target: "Vent",
            type: "one-to-many",
            inverseSide: "ventType",
            cascade: true,
            onDelete: "CASCADE",
        },
        products: {
            target: "Product",
            type: "one-to-many",
            inverseSide: "ventType",
            onDelete: "SET NULL",
        },
    },
});
