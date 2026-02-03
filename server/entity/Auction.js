const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Auction",
    tableName: "auctions",
    columns: {
        auctionId: {
            primary: true,
            type: "int",
            generated: true
        },
        type: {
            type: "varchar",
            length: 50,
            default: "Auction"
        },
        title: {
            type: "varchar",
            length: 255,
            nullable: false
        },
        image: {
            type: "text",
            nullable: true
        },
        startingPrice: {
            type: "float",
            nullable: false,
            default: 0
        },
        timeLeft: {
            type: "varchar",
            length: 100,
            nullable: true
        },
        timeLeftSeconds: {
            type: "int",
            nullable: false,
            default: 0
        },
        createdAt: {
            type: "timestamp",
            createDate: true, 
        },
        updatedAt: {
            type: "timestamp",
            updateDate: true, 
        }
    }
});
