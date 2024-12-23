import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1734900010452 implements MigrationInterface {
  name = "Init1734900010452";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cities" ("id" SERIAL NOT NULL, "geonameId" integer NOT NULL, "cityName" character varying(255) NOT NULL, "country" character varying(255) NOT NULL, "longitude" double precision NOT NULL, "latitude" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "cities"`);
  }
}
