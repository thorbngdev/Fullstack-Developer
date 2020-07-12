CREATE TABLE IF NOT EXISTS CLIENTE
(
    id serial NOT NULL,
	id_cli character varying(255) COLLATE pg_catalog."default",
    cd_cli character varying(255) COLLATE pg_catalog."default",
    nm_cli character varying(1000) COLLATE pg_catalog."default",
    PRIMARY KEY (id)
);