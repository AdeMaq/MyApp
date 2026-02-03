const processorService = require("../services/ProcessorService");

exports.getAll = async (req, res) => {
    try {
        const processors = await processorService.getAll();
        res.json(processors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const processor = await processorService.create(req.body);
        res.json(processor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await processorService.delete(req.params.id);
        res.json({ message: "Processor deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.assignToVentItem = async (req, res) => {
    try {
        const { ventItemId, processorIds } = req.body;
        const result = await processorService.assignToVentItem(ventItemId, processorIds);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
