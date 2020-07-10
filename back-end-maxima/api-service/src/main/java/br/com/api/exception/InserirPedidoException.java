package br.com.api.exception;

public class InserirPedidoException extends Exception {

    private String MENSAGEM_PADRAO = "NÃO FOI POSSÍVEL INSERIR O PEDIDO!";

    @Override
    public String getMessage() {
        return MENSAGEM_PADRAO;
    }
}
