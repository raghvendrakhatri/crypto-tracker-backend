import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseMigrations1684246338381 implements MigrationInterface {
    name = 'BaseMigrations1684246338381'

    // this ensure we can use default: `uuid_generate_v4()`

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" BIGSERIAL NOT NULL, "first_name" character varying NOT NULL DEFAULT '', "last_name" character varying NOT NULL DEFAULT '', "email" character varying NOT NULL DEFAULT '', "password" character varying, "profile_picture" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
