const { EntitySchema } = require("typeorm");
module.exports = new EntitySchema({
    name: "Favourite",
    tableName: "favourites",
    columns: {
        favouriteId: {
            primary: true,
            type: "int",
            generated: true,
        },
        userId: {
            type: "int",
            nullable: false,
        },
        productId: {
            type: "int",
            nullable: false,
        },
        createdAt: {
            type: "timestamp",
            createDate: true,
        }
    },
    relations: {
        user: {
            target: "User",
            type: "many-to-one",
            joinColumn: { name: "userId" },
            onDelete: " CASCADE"
        },
        product: {
            target: "Product",
            type: "many-to-one",
            joinColumn: { name: "productId" },
            onDelete: "CASCADE"
        }
    }
})