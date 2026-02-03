const favouriteService = require("../services/favouriteService");
exports.getFavouritesByUser = async (req, res) => {
    try {
        const favourites = await favouriteService.getFavouritesByUser(req.params.userId);
        res.json(
            favourites.map(fav => ({
                favouriteId: fav.favouriteId,
                ...fav.product
            }))
        );
    } catch (error) {
        console.error("error fetching favourite");
        res.status(500).json({ message: error.message })
    }
};
exports.addFavourite = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const fav = await favouriteService.addFavourite(userId, productId);
        res.status(201).json(fav);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.removeFavourite = async (req, res) => {
    try {
        await favouriteService.removeFavourite(req.params.favouriteId);
        res.json({ message: "favourite removed" });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

