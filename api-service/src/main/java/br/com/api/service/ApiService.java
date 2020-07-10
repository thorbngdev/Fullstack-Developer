package br.com.api.service;

import br.com.api.exception.ObterFreteException;
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
            throw new ObterFreteException();
        }
    }
}
