const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "CategoryItem",
  tableName: "category_items",
  columns: {
    categoryItemId: 
    { 
        primary: true, 
        type: "int", 
        generated: true 
    },
    name: 
    { 
        type: "varchar", 
        length: 100, 
        nullable: false },
  },
  relations: 
  {
    category: 
    {
      target: "Category",
      type: "many-to-one",
      joinColumn: { name: "categoryId" },
      onDelete: "CASCADE",
      eager: true,
    },
    products: 
    {
      target: "Product",
      type: "one-to-many",
      inverseSide: "categoryItem",
      onDelete: "SET NULL",
    },
  },
});
