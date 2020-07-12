package br.com.api.dao;

import br.com.api.model.Produto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProdutoDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void inserirProduto(Produto produto) {
        String sql = "INSERT INTO PRODUTO(id_prod, cd_prod, nm_prod, pc_prod, img_url) values(?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, produto.getId(), produto.getCodigo(), produto.getNome(), produto.getPrecoUnitario(), produto.getImagemUrl());
    }

    public List<Produto> obterProdutos() {
        String sql = "SELECT * FROM PRODUTO";
        return jdbcTemplate.query(sql, (rs, rowNum) -> new Produto(rs));
    }
}
