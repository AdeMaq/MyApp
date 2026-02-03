const ventService = require("../services/ventService");

exports.getAllHierarchy = async (req, res) => {
    try {
        const vents = await ventService.getAllHierarchy();
        res.json(vents);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createVentType = async (req, res) => {
    try {
        const ct = await ventService.createVentType(req.body);
        res.json(ct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createVent = async (req, res) => {
    try {
        const cat = await ventService.createVent(req.body);
        res.json(cat);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createVentItem = async (req, res) => {
    try {
        const item = await ventService.createVentItem(req.body);
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createVentItemType = async (req, res) => {
    try {
        const item = await ventService.createVentItemType(req.body);
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// exports.clearAllVents = async (req, res) => {
//     try {
//         const result = await ventService.clearAllVents();
//         res.json(result);
//     } catch (err) {
//         res.status(500).json({ error: err.message || "Failed to clear vents" });
//     }
// };

// ---- UPDATE ----
exports.updateVentItem = async (req, res) => {
    try {
        const updated = await ventService.updateVentItem(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

// ---- DELETE ----
exports.deleteVentType = async (req, res) => {
    try {
        const out = await ventService.deleteVentType(req.params.id);
        res.json(out);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

exports.deleteVent = async (req, res) => {
    try {
        const out = await ventService.deleteVent(req.params.id);
        res.json(out);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

exports.deleteVentItem = async (req, res) => {
    try {
        const out = await ventService.deleteVentItem(req.params.id);
        res.json(out);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

exports.deleteVentItemType = async (req, res) => {
    try {
        const out = await ventService.deleteVentItemType(req.params.id);
        res.json(out);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

exports.clearAllVents = async (req, res) => {
    try {
        const out = await ventService.clearAllVents();
        res.json(out);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
