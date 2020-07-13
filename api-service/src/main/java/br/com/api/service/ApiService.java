package br.com.api.service;

import br.com.api.exception.ObterFreteException;
import br.com.api.model.Cliente;
import br.com.api.model.Produto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ApiService {

    @Autowired
    private RestTemplate restTemplate;

    /**
     * Chamada de serviço de frete
     * @param quantidade Quantidade de produtos do pedido
     * @return
     */
    public Double obterFrete(Integer quantidade) throws ObterFreteException {
        try {
            String url = "http://localhost:8081/api/frete?quantidade=" + quantidade;
            ResponseEntity<Double> response = restTemplate.getForEntity(url, Double.class);
            return response.getBody();
        } catch(Exception e) {
            e.printStackTrace();
            throw new ObterFreteException();
        }
    }

    public Cliente[] obterClientes() {
        String url = "http://maximatech.free.beeceptor.com/cliente";
        ResponseEntity<Cliente[]> response = restTemplate.getForEntity(url, Cliente[].class);
        return response.getBody();
    }

    public Produto[] obterProdutos() {
        String url = "http://maximatech.free.beeceptor.com/produto";
        ResponseEntity<Produto[]> response = restTemplate.getForEntity(url, Produto[].class);
        return response.getBody();
    }
}
