package br.com.api.model;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Cliente {

    private String id;
    private String codigo;
    private String nome;

    public Cliente() {

    }

    public Cliente(ResultSet rs) {
        try {
            this.id = rs.getString("id_cli");
            this.codigo = rs.getString("cd_cli");
            this.nome = rs.getString("nm_cli");
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
}
