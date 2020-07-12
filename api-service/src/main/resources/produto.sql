CREATE TABLE IF NOT EXISTS PRODUTO
(
    id serial NOT NULL,
	id_prod character varying(255) COLLATE pg_catalog."default",
    cd_prod character varying(255) COLLATE pg_catalog."default",
    nm_prod character varying(1000) COLLATE pg_catalog."default",
    pc_prod decimal(12,2),
	img_url character varying(1000) COLLATE pg_catalog."default",
    PRIMARY KEY (id)
);