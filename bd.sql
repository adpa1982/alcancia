CREATE DATABASE alcancia
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Colombia.1252'
    LC_CTYPE = 'Spanish_Colombia.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-------------------------------------------------------------------------
CREATE TABLE tipomonedas
(
    id serial NOT NULL,
    nombre integer NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    deleted_at timestamp without time zone,
    CONSTRAINT tipomonedas_pkey PRIMARY KEY (id),
    CONSTRAINT tipomonedas_nombre_unique UNIQUE (nombre)
)


INSERT INTO tipomonedas(nombre) VALUES (50);
INSERT INTO tipomonedas(nombre) VALUES (100);
INSERT INTO tipomonedas(nombre) VALUES (200);
INSERT INTO tipomonedas(nombre) VALUES (500);
INSERT INTO tipomonedas(nombre) VALUES (1000);

-------------------------------------------------------------------------

CREATE TABLE alcancias
(
    id serial NOT NULL,
    id_tipomoneda integer NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    deleted_at timestamp without time zone,
    CONSTRAINT alcancias_pkey PRIMARY KEY (id),
    CONSTRAINT alcancias_idtipomoneda_foreign FOREIGN KEY (id_tipomoneda)
        REFERENCES tipomonedas (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
