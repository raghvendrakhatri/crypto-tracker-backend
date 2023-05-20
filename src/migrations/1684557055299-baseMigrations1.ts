import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseMigrations11684557055299 implements MigrationInterface {
    name = 'BaseMigrations11684557055299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coins" RENAME COLUMN "coinPrice" TO "coin_price"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coins" RENAME COLUMN "coin_price" TO "coinPrice"`);
    }

}
