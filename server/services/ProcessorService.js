const { AppDataSource } = require("../data-source");
const ProcessorRepo = AppDataSource.getRepository("Processor");
const VentItemRepo = AppDataSource.getRepository("VentItem");

class ProcessorService {
    async getAll() {
        return await ProcessorRepo.find();
    }

    async create(data) {
        const processor = ProcessorRepo.create({ value: data.value });
        return await ProcessorRepo.save(processor);
    }

    async delete(id) {
        return await ProcessorRepo.delete(id);
    }

    async assignToVentItem(ventItemId, processorIds) {
        const ventItem = await VentItemRepo.findOne({
            where: { ventItemId },
            relations: ["processors"]
        });
        if (!ventItem) throw new Error("VentItem not found");

        const processors = await ProcessorRepo.findByIds(processorIds);
        ventItem.processors = [...ventItem.processors, ...processors];
        return await VentItemRepo.save(ventItem);
    }
}

module.exports = new ProcessorService();