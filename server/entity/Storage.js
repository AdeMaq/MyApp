const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Storage",
    tableName: "storages",
    columns: {
        storageId: {
            primary: true,
            type: "int",
            generated: true
        },
        value: {
            type: "varchar",
            length: 150,
            nullable: false
        },
    },
    relations: {
        ventItems: {
            target: "VentItem",
            type: "many-to-many",
            mappedBy: "storages"
        }
    }
});
