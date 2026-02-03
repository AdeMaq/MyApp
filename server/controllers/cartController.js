const cartService = require("../services/cartService");

module.exports = {
    async getCart(req, res) {
        try {
            const { userId } = req.params;
            const cartItems = await cartService.getCartByUser(Number(userId));
            res.json(cartItems);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async addCartItem(req, res) {
        try {
            const { userId } = req.params;
            const { productId, quantity } = req.body;
            const cartItem = await cartService.addToCart(Number(userId), Number(productId), quantity);
            res.json(cartItem);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async removeCartItem(req, res) {
        try {
            const { cartId } = req.params;
            const result = await cartService.removeFromCart(Number(cartId));
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async clearCart(req, res) {
        try {
            const { userId } = req.params;
            const result = await cartService.clearCart(Number(userId));
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
