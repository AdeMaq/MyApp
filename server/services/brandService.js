const { AppDataSource } = require("../data-source");
const BrandRepo = AppDataSource.getRepository("Brand");
const BrandItemRepo = AppDataSource.getRepository("BrandItem");

class BrandService {
  static async createBrand(data) {
    const brand = BrandRepo.create(data);
    return await BrandRepo.save(brand);
  }

  static async getBrands() {
    return await BrandRepo.find({ relations: ["brandItems"] });
  }

  static async createBrandItem(brandId, data) {
    const brand = await BrandRepo.findOne({ where: { brandId } });
    if (!brand) throw new Error("Brand not found");
    const brandItem = BrandItemRepo.create({ ...data, brand });
    return await BrandItemRepo.save(brandItem);
  }

  static async getBrandItems(brandId) {
    return await BrandItemRepo.find({
      where: { brand: { brandId } },
      relations: ["products"],
    });
  }

  static async deleteBrand(brandId) {
    const brand = await BrandRepo.findOne({ where: { brandId }, relations: ["brandItems"] });
    if (!brand) throw new Error("Brand not found");
    await BrandRepo.remove(brand);
    return { message: "Brand deleted successfully" };
  }

  static async deleteBrandItem(brandId, brandItemId) {
    const brandItem = await BrandItemRepo.findOne({
      where: { brandItemId },
      relations: ["brand"],
    });
    if (!brandItem) throw new Error("Brand item not found");
    if (!brandItem.brand || brandItem.brand.brandId !== brandId) {
      throw new Error("Brand item does not belong to brand");
    }

    await BrandItemRepo.remove(brandItem);
    return { message: "Brand item deleted successfully" };
  }
}

module.exports = BrandService;
