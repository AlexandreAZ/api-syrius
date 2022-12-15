-- SCHEMA: ADM

-- DROP SCHEMA IF EXISTS "ADM" ;

CREATE SCHEMA IF NOT EXISTS "ADM"
    AUTHORIZATION postgres;

-- Table: ADM.CLIENTES

-- DROP TABLE IF EXISTS "ADM"."CLIENTES";

CREATE TABLE IF NOT EXISTS "ADM"."CLIENTES"
(
    "ID" SERIAL NOT NULL,
    "CODIGO" character varying COLLATE pg_catalog."default" NOT NULL,
    "NOME" character varying COLLATE pg_catalog."default" NOT NULL,
    "CPFCGC" character varying COLLATE pg_catalog."default" NOT NULL,
    "ENDRES" character varying COLLATE pg_catalog."default" NOT NULL,
    "BAIRRES" character varying COLLATE pg_catalog."default" NOT NULL,
    "CIDRES" character varying COLLATE pg_catalog."default" NOT NULL,
    "UFRES" character varying COLLATE pg_catalog."default" NOT NULL,
    "CEPRES" character varying COLLATE pg_catalog."default" NOT NULL,
    "FONE" character varying COLLATE pg_catalog."default" NOT NULL,
    "EMAIL" character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_1c0dfad95bb49b8323a472df614" PRIMARY KEY ("ID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "ADM"."CLIENTES"
    OWNER to postgres;

-- Table: ADM.MODULOS

-- DROP TABLE IF EXISTS "ADM"."MODULOS";

CREATE TABLE IF NOT EXISTS "ADM"."MODULOS"
(
    "ID" SERIAL NOT NULL,
    "NOME" character varying COLLATE pg_catalog."default" NOT NULL,
    "ENABLED" integer NOT NULL,
    CONSTRAINT "PK_eda5a4cebdcc494581c0762e7b4" PRIMARY KEY ("ID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "ADM"."MODULOS"
    OWNER to postgres;    


-- Table: ADM.USERS

-- DROP TABLE IF EXISTS "ADM"."USERS";

CREATE TABLE IF NOT EXISTS "ADM"."USERS"
(
    "ID" SERIAL NOT NULL,
    "USERNAME" character varying COLLATE pg_catalog."default",
    "PASSWORD" character varying COLLATE pg_catalog."default",
    "CREATED" date NOT NULL,
    "UPDATED" date NOT NULL,
    "ENABLED" integer,
    "TYPE" integer,
    CONSTRAINT "PK_475d4b511309ada89807bc2d40b" PRIMARY KEY ("ID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "ADM"."USERS"
    OWNER to postgres;


-- Table: "ADM"."MODULOS"

-- INCLUIR MÓDULOS PADRÃO;

INSERT INTO "ADM"."MODULOS" ( "NOME", "ENABLED") VALUES ('ADOTAPET', 1), ('CENSOPET', 0);

-- Table: "ADM"."USERS"

-- INCLUIR USUARIO INICIAL;
INSERT INTO "ADM"."USERS" ( "USERNAME", "PASSWORD", "CREATED", "UPDATED", "ENABLED", "TYPE" ) 
VALUES ('ALEXANDRE', '5827826',now(), now(), 1, 1);