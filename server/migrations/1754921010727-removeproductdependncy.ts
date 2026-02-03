import { MigrationInterface, QueryRunner } from "typeorm";

export class Removeproductdependncy1754921010727 implements MigrationInterface {
    name = 'Removeproductdependncy1754921010727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "condition"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "condition" character varying`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "delivery"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "delivery" character varying`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "discount"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "discount" character varying`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "tag"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "tag" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "tag"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "tag" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "discount"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "discount" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "delivery"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "delivery" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "condition"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "condition" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "type" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "title" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
