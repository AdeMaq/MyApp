const { AppDataSource } = require("../data-source");
const StorageRepo = AppDataSource.getRepository("Storage");
const VentItemRepo = AppDataSource.getRepository("VentItem");

class StorageService {
    async getAll() {
        return await StorageRepo.find();
    }

    async create(data) {
        const storage = StorageRepo.create({ value: data.value });
        return await StorageRepo.save(storage);
    }

    async delete(id) {
        return await StorageRepo.delete(id);
    }

    async assignToVentItem(ventItemId, storageIds) {
        const ventItem = await VentItemRepo.findOne({
            where: { ventItemId },
            relations: ["storages"]
        });
        if (!ventItem) throw new Error("VentItem not found");

        const storages = await StorageRepo.findByIds(storageIds);
        ventItem.storages = [...ventItem.storages, ...storages];
        return await VentItemRepo.save(ventItem);
    }
}

module.exports = new StorageService();