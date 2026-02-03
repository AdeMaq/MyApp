const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Category",
  tableName: "categories",
  columns: {
    categoryId: 
    { 
        primary: true, 
        type: "int", 
        generated: true 
    },
    name: 
    { 
        type: "varchar", 
        length: 100, 
        nullable: false 
    },
  },
  relations: 
  {
    categoryType: 
    {
      target: "CategoryType",
      type: "many-to-one",
      joinColumn: { name: "categoryTypeId" },
      onDelete: "CASCADE",
      eager: true,
    },
    categoryItems: 
    {
      target: "CategoryItem",
      type: "one-to-many",
      inverseSide: "category",
      cascade: true,
      onDelete: "CASCADE",
    },
    products: 
    {
      target: "Product",
      type: "one-to-many",
      inverseSide: "category",
      onDelete: "SET NULL",
    },
  },
});
