const { AppDataSource } = require("../data-source");

const VentTypeRepo = AppDataSource.getRepository("VentType");
const VentRepo = AppDataSource.getRepository("Vent");
const VentItemRepo = AppDataSource.getRepository("VentItem");
const VentItemTypeRepo = AppDataSource.getRepository("VentItemType");

class VentService {
    async getAllHierarchy() {
        return await VentTypeRepo.find({
            relations: [
                "vents",
                "vents.ventItems",
                "vents.ventItems.ventItemTypes"
            ],
            order: { ventTypeId: "ASC" },
        });
    }

    async createVentType(data) {
        const vt = VentTypeRepo.create(data);
        return await VentTypeRepo.save(vt);
    }

    async createVent(data) {
        const vat = VentRepo.create({
            name: data.name,
            ventType: data.ventTypeId ? { ventTypeId: data.ventTypeId } : null
        });
        return await VentRepo.save(vat);
    }

    async createVentItem(data) {
        const item = VentItemRepo.create({
            name: String(data.name).trim(),
            storage: data.storage ? String(data.storage).trim() : "",
            vent: data.ventId ? { ventId: data.ventId } : null
        });
        return await VentItemRepo.save(item);
    }


    async createVentItemType(data) {
        const item = VentItemTypeRepo.create({
            name: data.name,
            ventItem: data.ventItemId ? { ventItemId: data.ventItemId } : null
        });
        return await VentItemTypeRepo.save(item);
    }

    // async clearAllVents() {
    //     try {
    //         const allTypes = await VentTypeRepo.find({
    //             relations: [
    //                 "vents",
    //                 "vents.ventItems",
    //                 "vents.ventItems.ventItemTypes"
    //             ]
    //         });
    //         const itemTypes = await VentItemRepo.find();
    //         if (allTypes.length > 0) {
    //             await VentTypeRepo.remove(allTypes);
    //         }
    //         if (itemTypes.length > 0) {
    //             await VentItemRepo.remove(itemTypes);
    //         }
    //         return { message: "All vents cleared!" };
    //     } catch (err) {
    //         console.error("Error clearing vents:", err);
    //         throw new Error("Failed to clear vents");
    //     }
    // }
    // ---- UPDATE (for inline storage edit) ----
    async updateVentItem(ventItemId, payload) {
        const item = await VentItemRepo.findOneBy({ ventItemId: Number(ventItemId) });
        if (!item) throw new Error("Vent item not found");
        if (payload.name !== undefined) item.name = payload.name;
        if (payload.storage !== undefined) item.storage = payload.storage;
        return await VentItemRepo.save(item);
    }

    async deleteVentType(ventTypeId) {
        const result = await VentTypeRepo.delete({ ventTypeId: Number(ventTypeId) });
        if (result.affected === 0) throw new Error("Vent type not found");
        return { message: "Vent type deleted" };
    }

    async deleteVent(ventId) {
        const result = await VentRepo.delete({ ventId: Number(ventId) });
        if (result.affected === 0) throw new Error("Vent not found");
        return { message: "Vent deleted" };
    }

    async deleteVentItem(ventItemId) {
        const result = await VentItemRepo.delete({ ventItemId: Number(ventItemId) });
        if (result.affected === 0) throw new Error("Vent item not found");
        return { message: "Vent item deleted" };
    }

    async deleteVentItemType(ventItemTypeId) {
        const result = await VentItemTypeRepo.delete({ ventItemTypeId: Number(ventItemTypeId) });
        if (result.affected === 0) throw new Error("Vent item type not found");
        return { message: "Vent item type deleted" };
    }

    async clearAllVents() {
        try {
            await VentItemTypeRepo.clear();
            await VentItemRepo.clear();
            await VentRepo.clear();
            await VentTypeRepo.clear();
            return { message: "All vents cleared!" };
        } catch (err) {
            console.error("Error clearing vents:", err);
            throw new Error("Failed to clear vents");
        }
    }
}

module.exports = new VentService();
