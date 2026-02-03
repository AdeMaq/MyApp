import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryTableManagement1755765607504 implements MigrationInterface {
    name = 'CategoryTableManagement1755765607504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favourites" DROP CONSTRAINT "FK_b75b5e4a2475d03acfe11eac1d1"`);
        await queryRunner.query(`CREATE TABLE "categories" ("categoryId" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "categoryTypeId" integer, CONSTRAINT "PK_c9594c262e6781893a1068d91be" PRIMARY KEY ("categoryId"))`);
        await queryRunner.query(`CREATE TABLE "category_types" ("categoryTypeId" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_5efb2eb55215ea32c8385788ae7" PRIMARY KEY ("categoryTypeId"))`);
        await queryRunner.query(`CREATE TABLE "category_items" ("categoryItemId" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "categoryId" integer, CONSTRAINT "PK_6ee673bfd75aaf3d5d70af44d4e" PRIMARY KEY ("categoryItemId"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_2f5facebefe0f6257ab3c092a1d" FOREIGN KEY ("categoryTypeId") REFERENCES "category_types"("categoryTypeId") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ee8e92fc3b7ad0fad638d04d73b" FOREIGN KEY ("categoryItemId") REFERENCES "category_items"("categoryItemId") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favourites" ADD CONSTRAINT "FK_b75b5e4a2475d03acfe11eac1d1" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE  CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_2d575cb0398e1f47dc997a0bf47" FOREIGN KEY ("categoryTypeId") REFERENCES "category_types"("categoryTypeId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_items" ADD CONSTRAINT "FK_a6352d51c8f1814f0f58ec2c8d9" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_items" DROP CONSTRAINT "FK_a6352d51c8f1814f0f58ec2c8d9"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_2d575cb0398e1f47dc997a0bf47"`);
        await queryRunner.query(`ALTER TABLE "favourites" DROP CONSTRAINT "FK_b75b5e4a2475d03acfe11eac1d1"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ee8e92fc3b7ad0fad638d04d73b"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_2f5facebefe0f6257ab3c092a1d"`);
        await queryRunner.query(`DROP TABLE "category_items"`);
        await queryRunner.query(`DROP TABLE "category_types"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`ALTER TABLE "favourites" ADD CONSTRAINT "FK_b75b5e4a2475d03acfe11eac1d1" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
