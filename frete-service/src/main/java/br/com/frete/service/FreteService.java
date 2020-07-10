package br.com.frete.service;

import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class FreteService {

    private static final int MIN = 5;
    private static final int MAX = 10;

    /**
     * CALCULA FRETE BASEADO NA QUANTIDADE RECEBIDA
     * FÓRMULA:     FRETE = RANDOM(5,10) * QUANTIDADE
     * @param quantidade
     * @return
     */
    public Double calcularFrete(Integer quantidade) {
        Random random = new Random();
        Integer valorGerado = random.nextInt((MAX - MIN) + 1) + MIN;
        Double frete = valorGerado.doubleValue() * quantidade;
        return frete;
    }
}
