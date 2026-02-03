const auctionService = require("../services/auctionService");

module.exports = {
    async getAll(req, res) {
        try {
            const items = await auctionService.findAll();
            res.json(items);
        } catch (err) {
            console.error("GetAll auctions error:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    async getOne(req, res) {
        try {
            const id = parseInt(req.params.id);
            const item = await auctionService.findById(id);
            if (!item){
                return res.status(404).json({ error: "Auction not found" });
            }
            res.json(item);
        } catch (err) {
            console.error("GetOne auction error:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    async create(req, res) {
        try {
            const payload = req.body;
            if (!payload.title || payload.startingPrice == null || payload.timeLeftSeconds == null) {
                return res.status(400).json({ error: "title, startingPrice and timeLeftSeconds are required" });
            }
            const created = await auctionService.createAuction(payload);
            res.status(201).json(created);
        } catch (err) {
            console.error("Create auction error:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    async update(req, res) {
        try {
            const id = parseInt(req.params.id);
            const payload = req.body;
            const existing = await auctionService.findById(id);
            if (!existing){
                 return res.status(404).json({ error: "Auction not found" });
            }
            const updated = await auctionService.updateAuction(id, payload);
            res.json(updated);
        } catch (err) {
            console.error("Update auction error:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    async remove(req, res) {
        try {
            const id = parseInt(req.params.id);
            const existing = await auctionService.findById(id);
            if (!existing) return res.status(404).json({ error: "Auction not found" });
            await auctionService.deleteAuction(id);
            res.json({ success: true });
        } catch (err) {
            console.error("Delete auction error:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    }


}
