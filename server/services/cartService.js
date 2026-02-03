const { AppDataSource } = require("../data-source");
const cartRepo = AppDataSource.getRepository("Cart");
const productRepo = AppDataSource.getRepository("Product");

module.exports = {
    // async getCartByUser(userId) {
    //     return await cartRepo.find({ where: { userId }, relations: ["product"] });
    // },

    async getCartByUser(userId) {
        const cartItems = await cartRepo.find({ where: { userId: parseInt(userId) }, relations: ["product"] });

        return cartItems.map(item => ({
            cartId: item.cartId,
            quantity: item.quantity,
            userId: item.userId,
            productId: item.productId,
            title: item.product.title,
            image: item.product.image,
            condition: item.product.condition,
            price: item.product.price,
        }));
    },

    async addToCart(userId, productId, quantity = 1) {
        const product = await productRepo.findOne({ where: { productId } });
        if (!product) throw new Error("Product not found");

        const existing = await cartRepo.findOne({ where: { userId, productId } });
        if (existing) {
            existing.quantity += quantity;
            return await cartRepo.save(existing);
        }
        const newCartItem = cartRepo.create({ userId, productId, quantity });
        return await cartRepo.save(newCartItem);
    },

    async removeFromCart(cartId) {
        const item = await cartRepo.findOne({ where: { cartId } });
        if (!item) throw new Error("Item not found in cart");

        await cartRepo.remove(item);
        return { message: "Item removed from cart" };
    },

    async clearCart(userId) {
        await cartRepo.delete({ userId });
        return { message: "Cart cleared" };
    }
};
