package br.com.api.exception;

public class ObterFreteException extends Exception{

    private String MENSAGEM_PADRAO = "NÃO FOI POSSÍVEL OBTER O FRETE!";

    @Override
    public String getMessage() {
        return MENSAGEM_PADRAO;
    }

}
