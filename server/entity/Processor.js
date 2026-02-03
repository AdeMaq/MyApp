const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Processor",
    tableName: "processors",
    columns: {
        processorId: {
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
            mappedBy: "processors"
        }
    }
});