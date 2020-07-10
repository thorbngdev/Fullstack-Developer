package br.com.api.configuration;

import br.com.api.exception.InserirPedidoException;
import br.com.api.exception.ObterFreteException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(InserirPedidoException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public HashMap<String, String> inserirPedidoBadRequest(InserirPedidoException ex) {
        HashMap<String, String> resposta = new HashMap<String, String>();
        resposta.put("mensagem", ex.getMessage());
        return resposta;
    }

    @ExceptionHandler(ObterFreteException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public HashMap<String, String> obterFreteBadRequest(ObterFreteException ex) {
        HashMap<String, String> resposta = new HashMap<String, String>();
        resposta.put("mensagem", ex.getMessage());
        return resposta;
    }

}
