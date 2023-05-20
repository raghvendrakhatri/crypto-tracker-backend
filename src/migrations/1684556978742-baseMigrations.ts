import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseMigrations1684556978742 implements MigrationInterface {
    name = 'BaseMigrations1684556978742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" BIGSERIAL NOT NULL, "first_name" character varying NOT NULL DEFAULT '', "last_name" character varying NOT NULL DEFAULT '', "email" character varying NOT NULL DEFAULT '', "password" character varying, "profile_picture" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "coin_alerts" ("id" BIGSERIAL NOT NULL, "coin_id" bigint NOT NULL, "user_id" bigint NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_8d598ee0ac566cf8c6e231c68c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "coins" ("id" BIGSERIAL NOT NULL, "coin_name" character varying NOT NULL DEFAULT '', "coin_id" character varying NOT NULL, "coin_symbol" character varying NOT NULL DEFAULT '', "coinPrice" double precision, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_d16119baa1fea9ca79a093d5e20" UNIQUE ("coin_symbol"), CONSTRAINT "PK_af01e5dcef2c05e6385611205c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_coin_mapping" ("id" BIGSERIAL NOT NULL, "coin_id" bigint NOT NULL, "user_id" bigint NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_16da95601819df16241f94076ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "coin_alerts" ADD CONSTRAINT "FK_f17da1453cf0ff333552c22d3d5" FOREIGN KEY ("coin_id") REFERENCES "coins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_coin_mapping" ADD CONSTRAINT "FK_6d36cffbd19b8cf519b67b648f1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_coin_mapping" ADD CONSTRAINT "FK_01f89bd395905feb0ed95970cfe" FOREIGN KEY ("coin_id") REFERENCES "coins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_coin_mapping" DROP CONSTRAINT "FK_01f89bd395905feb0ed95970cfe"`);
        await queryRunner.query(`ALTER TABLE "user_coin_mapping" DROP CONSTRAINT "FK_6d36cffbd19b8cf519b67b648f1"`);
        await queryRunner.query(`ALTER TABLE "coin_alerts" DROP CONSTRAINT "FK_f17da1453cf0ff333552c22d3d5"`);
        await queryRunner.query(`DROP TABLE "user_coin_mapping"`);
        await queryRunner.query(`DROP TABLE "coins"`);
        await queryRunner.query(`DROP TABLE "coin_alerts"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
