const { AppDataSource } = require("../data-source");

const CategoryTypeRepo = AppDataSource.getRepository("CategoryType");
const CategoryRepo = AppDataSource.getRepository("Category");
const CategoryItemRepo = AppDataSource.getRepository("CategoryItem");

class CategoryService {
    async getAllHierarchy() {
        return await CategoryTypeRepo.find({
            relations: [
                "categories",
                "categories.categoryItems"
            ],
            order: { categoryTypeId: "ASC" }
        });
    }

    async createCategoryType(data) {
        const ct = CategoryTypeRepo.create(data);
        return await CategoryTypeRepo.save(ct);
    }

    async createCategory(data) {
        const cat = CategoryRepo.create({
            name: data.name,
            categoryType: data.categoryTypeId ? { categoryTypeId: data.categoryTypeId } : null
        });
        return await CategoryRepo.save(cat);
    }

    async createCategoryItem(data) {
        const item = CategoryItemRepo.create({
            name: data.name,
            category: data.categoryId ? { categoryId: data.categoryId } : null
        });
        return await CategoryItemRepo.save(item);
    }
    async clearAllCategories() {
        try {
            const allTypes = await CategoryTypeRepo.find({
                relations: ["categories", "categories.categoryItems"]
            });
            const itemTypes = await CategoryItemRepo.find();
            if (allTypes.length > 0) {
                await CategoryTypeRepo.remove(allTypes);
            }
            if (itemTypes.length > 0) {
                await CategoryItemRepo.remove(itemTypes);
            }
            return { message: "All categories cleared!" };
        } catch (err) {
            console.error("Error clearing categories:", err);
            throw new Error("Failed to clear categories");
        }
    }
}

module.exports = new CategoryService();
