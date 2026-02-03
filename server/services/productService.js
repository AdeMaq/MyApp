const { AppDataSource } = require('../data-source');
const productRepo = AppDataSource.getRepository('Product');
const VentItemRepo = AppDataSource.getRepository("VentItem");

function cleanProductData(data) {
    const price = data.price ? parseFloat(data.price) : 0;
    let discountValue = data.discount ? data.discount.toString().trim() : null;
    let newPrice = null;

    if (discountValue) {
        if (discountValue.endsWith('%')) {
            const percent = parseFloat(discountValue.replace('%', ''));
            if (!isNaN(percent)) {
                newPrice = price - (price * (percent / 100));
            }
        } else {
            const fixed = parseFloat(discountValue);
            if (!isNaN(fixed)) {
                newPrice = price - fixed;
            }
        }
        if (newPrice < 0) newPrice = 0;
    }

    return {
        ...data,
        price,
        newPrice: newPrice !== null ? parseFloat(newPrice.toFixed(2)) : null,
        discount: discountValue || null
    };
}

module.exports = {
    async getAll(filters = {}) {
        const where = {};
        if (filters.categoryTypeId && !isNaN(filters.categoryTypeId)) {
            where.categoryType = { categoryTypeId: parseInt(filters.categoryTypeId) };
        }
        if (filters.categoryId && !isNaN(filters.categoryId)) {
            where.category = { categoryId: parseInt(filters.categoryId) };
        }
        if (filters.categoryItemId && !isNaN(filters.categoryItemId)) {
            where.categoryItem = { categoryItemId: parseInt(filters.categoryItemId) };
        }
        if (filters.ventTypeId) where.ventType = { ventTypeId: +filters.ventTypeId };
        if (filters.ventId) where.vent = { ventId: +filters.ventId };
        if (filters.ventItemId) where.ventItem = { ventItemId: +filters.ventItemId };
        if (filters.ventItemTypeId) where.ventItemType = { ventItemTypeId: +filters.ventItemTypeId };
        return await productRepo.find({
            where,
            relations: ["categoryType", "category", "categoryItem", "ventType", "vent", "ventItem", "ventItemType"],
        });

    },

    async getById(id) {
        return await productRepo.findOne({
            where: { productId: id },
            relations: ["categoryType", "category", "categoryItem", "ventType", "vent", "ventItem", "ventItemType"],
        });
    },

    async create(data) {
        const product = productRepo.create({
            ...cleanProductData(data),
            categoryType: data.categoryTypeId ? { categoryTypeId: data.categoryTypeId } : null,
            category: data.categoryId ? { categoryId: data.categoryId } : null,
            categoryItem: data.categoryItemId ? { categoryItemId: data.categoryItemId } : null,
            ventType: data.ventTypeId ? { ventTypeId: data.ventTypeId } : null,
            vent: data.ventId ? { ventId: data.ventId } : null,
            ventItem: data.ventItemId ? { ventItemId: data.ventItemId } : null,
            ventItemType: data.ventItemTypeId ? { ventItemTypeId: data.ventItemTypeId } : null,
        });
        // return await productRepo.save(product);
        if (data.ventItemId && data.storage) {
            try {
                const ventItem = await VentItemRepo.findOneBy({ ventItemId: data.ventItemId });
                if (ventItem) {
                    ventItem.storage = String(data.storage).trim();
                    await VentItemRepo.save(ventItem);
                }
            } catch (err) {
                console.error("Error updating VentItem storage:", err);
            }
        }

        return await productRepo.save(product);
    },

    async update(id, data) {
        await productRepo.update(
            { productId: id },
            {
                ...cleanProductData(data),
                categoryType: data.categoryTypeId ? { categoryTypeId: data.categoryTypeId } : null,
                category: data.categoryId ? { categoryId: data.categoryId } : null,
                categoryItem: data.categoryItemId ? { categoryItemId: data.categoryItemId } : null,

                ventType: data.ventTypeId ? { ventTypeId: data.ventTypeId } : null,
                vent: data.ventId ? { ventId: data.ventId } : null,
                ventItem: data.ventItemId ? { ventItemId: data.ventItemId } : null,
                ventItemType: data.ventItemTypeId ? { ventItemTypeId: data.ventItemTypeId } : null,
            }
        );
        return await productRepo.findOne({
            where: { productId: id },
            relations: ["categoryType", "category", "categoryItem", "ventType", "vent", "ventItem", "ventItemType"],
        });
    },

    async remove(id) {
        return await productRepo.delete({ productId: id });
    }
};
