const { AppDataSource } = require("../data-source");
const Favourite = require("../entity/Favourite");
const Product = require("../entity/Product");
const favouriteRepo = AppDataSource.getRepository("Favourite");
const productRepo = AppDataSource.getRepository("Product");

class FavouriteService {
    async getFavouritesByUser(userId) {
        return await favouriteRepo.find({ where: { userId: parseInt(userId) }, relations: ["product"] });
    }
    async addFavourite(userId, productId) {
        const existing = await favouriteRepo.findOne({ where: { userId, productId } });
        if (existing) {
            throw new Error("Alredy in favourites");
        }
        const product = await productRepo.findOne({ where: { productId } });
        if (!product) {
            throw new Error("Product not found");
        }
        const newFav = favouriteRepo.create({ userId, productId });
        return await favouriteRepo.save(newFav);
    }
    async removeFavourite(favouriteId) {
        const fav = await favouriteRepo.findOne({ where: { favouriteId: parseInt(favouriteId) } });
        if (!fav) {
            throw new Error("Favourite not Found");
        }
        return await favouriteRepo.remove(fav);
    }
}

module.exports = new FavouriteService();