// const { EntitySchema } = require("typeorm");

// module.exports = new EntitySchema({
//     name: "Condition",
//     tableName: "conditions",
//     columns: {
//         conditionId: {
//             primary: true,
//             type: "int",
//             generated: true
//         },
//         type: {
//             type: "varchar",
//             length: 50,
//             nullable: false
//         },
//         description: {
//             type: "varchar",
//             length: 100,
//             nullable: true
//         },
//         color:{
//             type:"varchar",
//             length:100,
//             nullable:true
//         },
//         size:{
//             type:"varchar",
//             length:100,
//             nullable:true
//         },
//         storage:{
//             type:"varchar",
//             length:100,
//             nullable:true
//         }
//     },
//     relations: {
//         product: {
//             target: "Product",
//             type: "many-to-one",
//             joinColumn: { name: "productId" },
//             onDelete: "CASCADE"
//         }
//     }
// });
