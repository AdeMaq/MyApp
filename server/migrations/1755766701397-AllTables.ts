import { MigrationInterface, QueryRunner } from "typeorm";

export class AllTables1755766701397 implements MigrationInterface {
    name = 'AllTables1755766701397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("productId" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "type" character varying(50) NOT NULL, "image" text, "condition" character varying(100), "delivery" character varying(100), "price" numeric(10,2) NOT NULL, "newPrice" numeric(10,2), "discount" character varying(50), "tag" character varying(50), "categoryTypeId" integer, "categoryId" integer, "categoryItemId" integer, CONSTRAINT "PK_7b3b507508cd0f86a5b2e923459" PRIMARY KEY ("productId"))`);
        await queryRunner.query(`CREATE TABLE "favourites" ("favouriteId" SERIAL NOT NULL, "userId" integer NOT NULL, "productId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7585936a9487a6aefc59e6000f2" PRIMARY KEY ("favouriteId"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("cartId" SERIAL NOT NULL, "userId" integer NOT NULL, "productId" integer NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "price" numeric(10,2), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_91b0c422e2c5187437d4dd29747" PRIMARY KEY ("cartId"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("categoryId" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "categoryTypeId" integer, CONSTRAINT "PK_c9594c262e6781893a1068d91be" PRIMARY KEY ("categoryId"))`);
        await queryRunner.query(`CREATE TABLE "category_types" ("categoryTypeId" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_5efb2eb55215ea32c8385788ae7" PRIMARY KEY ("categoryTypeId"))`);
        await queryRunner.query(`CREATE TABLE "category_items" ("categoryItemId" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "categoryId" integer, CONSTRAINT "PK_6ee673bfd75aaf3d5d70af44d4e" PRIMARY KEY ("categoryItemId"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_2f5facebefe0f6257ab3c092a1d" FOREIGN KEY ("categoryTypeId") REFERENCES "category_types"("categoryTypeId") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ee8e92fc3b7ad0fad638d04d73b" FOREIGN KEY ("categoryItemId") REFERENCES "category_items"("categoryItemId") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favourites" ADD CONSTRAINT "FK_b75b5e4a2475d03acfe11eac1d1" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE  CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favourites" ADD CONSTRAINT "FK_01f33e685427bbbc224dc552d6c" FOREIGN KEY ("productId") REFERENCES "products"("productId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_371eb56ecc4104c2644711fa85f" FOREIGN KEY ("productId") REFERENCES "products"("productId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_2d575cb0398e1f47dc997a0bf47" FOREIGN KEY ("categoryTypeId") REFERENCES "category_types"("categoryTypeId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_items" ADD CONSTRAINT "FK_a6352d51c8f1814f0f58ec2c8d9" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_items" DROP CONSTRAINT "FK_a6352d51c8f1814f0f58ec2c8d9"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_2d575cb0398e1f47dc997a0bf47"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_371eb56ecc4104c2644711fa85f"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "favourites" DROP CONSTRAINT "FK_01f33e685427bbbc224dc552d6c"`);
        await queryRunner.query(`ALTER TABLE "favourites" DROP CONSTRAINT "FK_b75b5e4a2475d03acfe11eac1d1"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ee8e92fc3b7ad0fad638d04d73b"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_2f5facebefe0f6257ab3c092a1d"`);
        await queryRunner.query(`DROP TABLE "category_items"`);
        await queryRunner.query(`DROP TABLE "category_types"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "favourites"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
