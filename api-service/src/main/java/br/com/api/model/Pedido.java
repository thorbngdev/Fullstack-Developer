package br.com.api.model;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class Pedido {

    private String cdPedido;
    private String cliente;
    private BigDecimal valorTotal;
    private BigDecimal valorFrete;
    private Integer quantidade;
    private String dataPedido;
    private List<PedidoItem> pedidoItens;

    public Pedido() {

    }

    public Pedido(ResultSet rs) {
        try {
            this.cdPedido = rs.getString("cd_pedido");
            this.cliente = rs.getString("cliente");
            this.valorTotal = rs.getBigDecimal("valor_total");
            this.valorFrete = rs.getBigDecimal("valor_frete");
            this.quantidade = rs.getInt("quantidade");
            this.dataPedido = null;
            this.pedidoItens = null;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

    }

    public String getCdPedido() {
        return cdPedido;
    }

    public void setCdPedido(String cdPedido) {
        this.cdPedido = cdPedido;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }

    public BigDecimal getValorFrete() {
        return valorFrete;
    }

    public void setValorFrete(BigDecimal valorFrete) {
        this.valorFrete = valorFrete;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public String getDataPedido() {
        return dataPedido;
    }

    public void setDataPedido(String dataPedido) {
        this.dataPedido = dataPedido;
    }

    public List<PedidoItem> getPedidoItens() {
        return pedidoItens;
    }

    public void setPedidoItens(List<PedidoItem> pedidoItens) {
        this.pedidoItens = pedidoItens;
    }
}
