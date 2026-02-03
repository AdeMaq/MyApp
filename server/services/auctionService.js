const { getRepository } = require("typeorm");
const { AppDataSource } = require("../data-source");
const Auction = require("../entity/Auction");
const auctionRepo = AppDataSource.getRepository("Auction");

module.exports = {
    async findAll() {
        return auctionRepo.find({ order: { auctionId: "ASC" } });
    },
    async findById(auctionId) {
        return auctionRepo.findOne({ where: { auctionId } });
    },
    async createAuction(data) {
        const entity = auctionRepo.create(data);
        return auctionRepo.save(entity);
    },
    async updateAuction(auctionId, data) {
        await auctionRepo.update({ auctionId }, data);
        return findByOne({ where: { auctionId } });
    },
    async deleteAuction(auctionId) {
        return auctionRepo.delete({ auctionId });
    },
}






