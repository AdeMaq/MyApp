const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Cart",
    tableName: "cart",
    columns: {
        cartId: {
            primary: true,
            type: "int",  
            generated: true
        },
        userId: {
            type: "int",
            nullable: false
        },
        productId: {
            type: "int",
            nullable: false
        },
        quantity: {
            type: "int",
            default: 1
        },
        price: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: true
        },
        createdAt: {
            type: "timestamp",
            createDate: true
        },
        updatedAt: {
            type: "timestamp",
            updateDate: true
        }
    },
    relations: {
        user: {
            target: "User",
            type: "many-to-one",
            joinColumn: { name: "userId" }, 
            onDelete: "CASCADE"
        },
        product: {
            target: "Product",
            type: "many-to-one",
            joinColumn: { name: "productId" }, 
            onDelete: "CASCADE"
        }
    }
});
