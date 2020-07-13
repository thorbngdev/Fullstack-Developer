package br.com.api.dao;

import br.com.api.exception.InserirPedidoException;
import br.com.api.model.Pedido;
import br.com.api.model.PedidoItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.util.List;

@Repository
public class PedidoDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void inserirPedido(Pedido pedido) throws InserirPedidoException {
        try {
            String sql = "INSERT INTO PEDIDO(cd_pedido, cliente, valor_total, valor_frete, quantidade, data_pedido) values(?, ?, ?, ?, ?, now())";
            KeyHolder keyHolder = new GeneratedKeyHolder();
            int insertRows = jdbcTemplate.update(connection -> {
                PreparedStatement pstmt = connection.prepareStatement(sql, new String[]{"id_pedido"});
                int index = 1;
                pstmt.setString(index++, pedido.getCdPedido());
                pstmt.setString(index++, pedido.getCliente());
                pstmt.setBigDecimal(index++, pedido.getValorTotal());
                pstmt.setBigDecimal(index++, pedido.getValorFrete());
                pstmt.setInt(index++, pedido.getQuantidade());
                return pstmt;
            }, keyHolder);

            /**
             * Obtém a chave do pedido caso tenha ocorrido um insert
             */
            Integer idPedido;
            if (insertRows > 0) {
                idPedido = keyHolder.getKey().intValue();
            } else {
                throw new Exception("Pedido não incluído!");
            }

            /**
             * Insere os itens do pedido
             */
            for (PedidoItem item : pedido.getPedidoItens()) {
                String sqlItem = "INSERT INTO PEDIDO_ITEM(id_pedido, id_item, nome_item, codigo_item, quantidade, valor_unitario) values(?, ?, ?, ?, ?, ?)";
                jdbcTemplate.update(sqlItem, idPedido, item.getIdItem(), item.getNomeItem(), item.getCodigoItem(), item.getQuantidade(), item.getValorUnitario());
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new InserirPedidoException();
        }
    }
    /**
     * TODO
     * @return
     */
    public List<Pedido> obterPedidos() {
        String sql = "SELECT * FROM PEDIDO ORDER BY DATA_PEDIDO DESC";
        return jdbcTemplate.query(sql, (rs, rowNum) -> new Pedido(rs));
    }

}
