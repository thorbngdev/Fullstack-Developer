CREATE TABLE IF NOT EXISTS PEDIDO
(
    id_pedido serial NOT NULL,
    cd_pedido character varying(255) COLLATE pg_catalog."default",
    cliente character varying(255) COLLATE pg_catalog."default",
    valor_total decimal(12,2),
    valor_frete decimal(12,2),
    quantidade integer,
    data_pedido timestamp,
    PRIMARY KEY (id_pedido)
);

CREATE TABLE IF NOT EXISTS PEDIDO_ITEM
(
    id_pedido integer NOT NULL,
    id_item character varying(255) COLLATE pg_catalog."default",
	nome_item character varying(1000) COLLATE pg_catalog."default",
	codigo_item character varying(255) COLLATE pg_catalog."default",
	quantidade integer,
    valor_unitario decimal(12,2),
	FOREIGN KEY (id_pedido) REFERENCES PEDIDO (id_pedido)
)