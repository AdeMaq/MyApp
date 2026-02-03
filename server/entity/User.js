const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'User',
    tableName: 'users',
    columns: {
        userId: {
            primary: true,
            type: 'int',
            generated: true,
        },
        name: {
            type: 'varchar',
            nullable: false,
        },
        email: {
            type: 'varchar',
            unique: false,
        },
        password: {
            type: 'varchar',
            nullable: false,
        },
        profilePic: {
            type: 'text',
            nullable: true,
        },
    },
    relations: {
        favourites: {
            target: "Favourite",
            type: "one-to-many",
            inverseSide: "user",
            cascade: true,
            onDelete: "CASCADE"
        },
        cart: {
            target: "Cart",
            type: "one-to-many",
            inverseSide: "user",
            cascade: true,
            onDelete: "CASCADE"
        },
    }
});
