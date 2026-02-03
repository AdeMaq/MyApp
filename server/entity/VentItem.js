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
        storage:{
            type:"varchar",
            length:500,
            nullable:true,
        }
    },
    relations: {
        vent: {
            target: "Vent",
            type: "many-to-one",
            joinColumn: { name: "ventId" },
            onDelete: "CASCADE",
            eager: true,
        },
        ventItemTypes: { 
            target: "VentItemType",
            type: "one-to-many",
            inverseSide: "ventItem",
            cascade: true,
            onDelete: "CASCADE",
        },
        products: {
            target: "Product",
            type: "one-to-many",
            inverseSide: "ventItem",
            onDelete: "SET NULL",
        },
    },
});
