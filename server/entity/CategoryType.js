const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "CategoryType",
  tableName: "category_types",
  columns: {
    categoryTypeId:
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
    pic: { 
      type: "varchar",
      length: 255,
      nullable: true
    }
  },
  relations:
  {
    categories:
    {
      target: "Category",
      type: "one-to-many",
      inverseSide: "categoryType",
      cascade: true,
      onDelete: "CASCADE",
    },
    products:
    {
      target: "Product",
      type: "one-to-many",
      inverseSide: "categoryType",
      onDelete: "SET NULL",
    },
  },
});
