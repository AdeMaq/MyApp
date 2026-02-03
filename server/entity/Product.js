const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Product",
    tableName: "products",
    columns: {
        productId: {
            primary: true,
            type: "int",
            generated: true
        },
        title: {
            type: "varchar",
            length: 255,
            nullable: false
        },
        type: {
            type: "varchar",
            length: 50,
            nullable: false
        },
        image: {
            type: "text",
            nullable: true
        },
        condition: {
            type: "varchar",
            length: 100,
            nullable: true
        },
        delivery: {
            type: "varchar",
            length: 100,
            nullable: true
        },
        price: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: false
        },
        newPrice: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: true
        },
        discount: {
            type: "varchar",
            length: 50,
            nullable: true
        },
        tag: {
            type: "varchar",
            length: 50,
            nullable: true
        },
        // quantity:{
        //     type:"int",
        //     nullable:true
        // }
    },
    relations: {
        favourites: {
            target: "Favourite",
            type: "one-to-many",
            inverseSide: "product",
            cascade: true,
            onDelete: "CASCADE",
        },
        cart: {
            target: "Cart",
            type: "one-to-many",
            inverseSide: "product",
            cascade: true,
            onDelete: "CASCADE",
        },
        categoryType: {
            target: "CategoryType",
            type: "many-to-one",
            joinColumn: { name: "categoryTypeId" },
            nullable:true,
            onDelete: "SET NULL",
            eager: true,
        },
        category: {
            target: "Category",
            type: "many-to-one",
            joinColumn: { name: "categoryId" },
            nullable:true,
            onDelete: "SET NULL",
            eager: true,
        },
        categoryItem: {
            target: "CategoryItem",
            type: "many-to-one",
            joinColumn: { name: "categoryItemId" },
            nullable:true,
            onDelete: "SET NULL",
            eager: true,
        },
        ventType: {
            target: "VentType",
            type: "many-to-one",
            joinColumn: { name: "ventTypeId" },
            nullable:true,
            onDelete: "SET NULL",
            eager: true,
        },
        vent: {
            target: "Vent",
            type: "many-to-one",
            joinColumn: { name: "ventId" },
            nullable:true,
            onDelete: "SET NULL",
            eager: true,
        },
        ventItem: {
            target: "VentItem",
            type: "many-to-one",
            joinColumn: { name: "ventItemId" },
            nullable:true,
            onDelete: "SET NULL",
            eager: true,
        },
        ventItemType: {
            target: "VentItemType",
            type: "many-to-one",
            joinColumn: { name: "ventItemTypeId" },
            nullable:true,
            onDelete: "SET NULL",
            eager: true,
        },
        brandItem: {
            target: "BrandItem",
            type: "many-to-one",
            joinColumn: { name: "brandItemId" },
            nullable:true,
            onDelete: "SET NULL",
            eager: true
        },
    }
});
