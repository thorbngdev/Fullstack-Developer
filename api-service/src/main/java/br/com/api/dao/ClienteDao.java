package br.com.api.dao;

import br.com.api.model.Cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ClienteDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void inserirCliente(Cliente cliente) {
        String sql = "INSERT INTO CLIENTE(id_cli, cd_cli, nm_cli) values(?, ?, ?)";
        jdbcTemplate.update(sql, cliente.getId(), cliente.getCodigo(), cliente.getNome());
    }

    public List<Cliente> obterClientes() {
        String sql = "SELECT * FROM CLIENTE";
        return jdbcTemplate.query(sql, (rs, rowNum) -> new Cliente(rs));
    }
}
