const storageService = require("../services/StorageService");

exports.getAll = async (req, res) => {
    try {
        const storages = await storageService.getAll();
        res.json(storages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const storage = await storageService.create(req.body);
        res.json(storage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await storageService.delete(req.params.id);
        res.json({ message: "Storage deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.assignToVentItem = async (req, res) => {
    try {
        const { ventItemId, storageIds } = req.body;
        const result = await storageService.assignToVentItem(ventItemId, storageIds);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
