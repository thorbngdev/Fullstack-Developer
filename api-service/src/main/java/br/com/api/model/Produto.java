package br.com.api.model;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Produto {

    private String id;
    private String codigo;
    private String nome;
    private BigDecimal precoUnitario;
    private String imagemUrl;

    public Produto() {
    }

    public Produto(ResultSet rs) {
        try {
            this.id = rs.getString("id_prod");
            this.codigo = rs.getString("cd_prod");
            this.nome = rs.getString("nm_prod");
            this.precoUnitario = rs.getBigDecimal("pc_prod");
            this.imagemUrl = rs.getString("img_url");
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public BigDecimal getPrecoUnitario() {
        return precoUnitario;
    }

    public void setPrecoUnitario(BigDecimal precoUnitario) {
        this.precoUnitario = precoUnitario;
    }

    public String getImagemUrl() {
        return imagemUrl;
    }

    public void setImagemUrl(String imagemUrl) {
        this.imagemUrl = imagemUrl;
    }
}
