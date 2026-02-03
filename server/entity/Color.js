const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Color",
    tableName: "colors",
    columns: {
        colorId: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar",
            length: 150,
            nullable: true
        },
        quantity:{
            type:"int",
            nullable:true
        }
    },
    relations: {
        products: {
            target: "Product",
            type: "one-to-many",
            inverseSide: "color",
            cascade: true,
            onDelete: "CASCADE"
        }
    }
});
