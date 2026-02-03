import { MigrationInterface, QueryRunner } from "typeorm";

export class Auction1755079101988 implements MigrationInterface {
    name = 'Auction1755079101988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favourites" DROP CONSTRAINT "FK_b75b5e4a2475d03acfe11eac1d1"`);
        await queryRunner.query(`CREATE TABLE "auctions" ("auctionId" SERIAL NOT NULL, "type" character varying(50) NOT NULL DEFAULT 'Auction', "title" character varying(255) NOT NULL, "image" text, "startingPrice" double precision NOT NULL DEFAULT '0', "timeLeft" character varying(100), "timeLeftSeconds" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_4c313a748e8de8e62b5a67674ba" PRIMARY KEY ("auctionId"))`);
        await queryRunner.query(`ALTER TABLE "favourites" ADD CONSTRAINT "FK_b75b5e4a2475d03acfe11eac1d1" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE  CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favourites" DROP CONSTRAINT "FK_b75b5e4a2475d03acfe11eac1d1"`);
        await queryRunner.query(`DROP TABLE "auctions"`);
        await queryRunner.query(`ALTER TABLE "favourites" ADD CONSTRAINT "FK_b75b5e4a2475d03acfe11eac1d1" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
