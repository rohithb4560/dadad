import {MigrationInterface, QueryRunner} from "typeorm";

export class filedbGenerate1652279518404 implements MigrationInterface {
    name = 'filedbGenerate1652279518404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "datasourceconfig" ("id" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "enterpriseID" character varying NOT NULL, "dataTransferMechanism" character varying NOT NULL, "fTPLocation" character varying NOT NULL, "fileArrivalCutoff" TIMESTAMP WITH TIME ZONE NOT NULL, "fileFormat" character varying NOT NULL, "fileParsingContract" character varying NOT NULL, "successFilePath" character varying NOT NULL, "failureFilePath" character varying NOT NULL, CONSTRAINT "PK_0de6b92f319747045ae48619068" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file" ("id" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dataSourceConfigId" character varying NOT NULL, "direction" character varying NOT NULL, "processedOn" TIMESTAMP WITH TIME ZONE NOT NULL, "fileOriginalName" character varying NOT NULL, "fileDestinationPath" character varying NOT NULL, "isValid" boolean NOT NULL, "noOfRows" integer NOT NULL, "parsedOn" TIMESTAMP WITH TIME ZONE, "parseAttempts" integer, "parseStatus" text, "statusComment" text, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "email" character varying NOT NULL, "country" character varying NOT NULL, "postalCode" character varying NOT NULL, "street" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallet" ("id" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "balance" integer NOT NULL DEFAULT '0', "userId" character varying NOT NULL, CONSTRAINT "UQ_35472b1fe48b6330cd349709564" UNIQUE ("userId"), CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "wallet"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TABLE "datasourceconfig"`);
    }

}
