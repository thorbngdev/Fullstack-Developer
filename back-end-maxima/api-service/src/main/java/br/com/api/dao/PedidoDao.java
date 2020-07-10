package br.com.api.dao;

import br.com.api.exception.InserirPedidoException;
import br.com.api.model.Pedido;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class PedidoDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void inserirPedido(Pedido pedido) throws InserirPedidoException {
        try {
            /**
             * TODO inserir pedido
             */
        } catch (Exception e) {
            throw new InserirPedidoException();
        }
    }

}
