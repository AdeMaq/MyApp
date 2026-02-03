const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Size",
    tableName: "sizes",
    columns: {
        sizeId: {
            primary: true,
            type: "int",
            generated: true
        },
        size: {
            type: "varchar",
            length: 150,
            nullable: false
        },
    },
    relations: {
        product: {
            target: "product",
            type: "one-to-many",
            inverseSide: "size",
            cascade: true,
            onDelete: "CASCADE"
        }
    }
});
