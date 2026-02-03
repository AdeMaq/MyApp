import { MigrationInterface, QueryRunner } from "typeorm";

export class FavouriteEntity1754992531164 implements MigrationInterface {
    name = 'FavouriteEntity1754992531164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favourites" ("favouriteId" SERIAL NOT NULL, "userId" integer NOT NULL, "productId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7585936a9487a6aefc59e6000f2" PRIMARY KEY ("favouriteId"))`);
        await queryRunner.query(`ALTER TABLE "favourites" ADD CONSTRAINT "FK_b75b5e4a2475d03acfe11eac1d1" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE  CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favourites" ADD CONSTRAINT "FK_01f33e685427bbbc224dc552d6c" FOREIGN KEY ("productId") REFERENCES "products"("productId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favourites" DROP CONSTRAINT "FK_01f33e685427bbbc224dc552d6c"`);
        await queryRunner.query(`ALTER TABLE "favourites" DROP CONSTRAINT "FK_b75b5e4a2475d03acfe11eac1d1"`);
        await queryRunner.query(`DROP TABLE "favourites"`);
    }

}
