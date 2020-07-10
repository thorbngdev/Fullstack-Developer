package br.com.frete.api;

import br.com.frete.service.FreteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class FreteAPI {

    @Autowired
    private FreteService freteService;

    @GetMapping("/frete")
    private Double getFrete(@RequestParam Integer quantidade) {
        return freteService.calcularFrete(quantidade);
    }

}
