package br.com.api.endpoint;

import br.com.api.dao.PedidoDao;
import br.com.api.exception.InserirPedidoException;
import br.com.api.exception.ObterFreteException;
import br.com.api.model.Pedido;
import br.com.api.service.ApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api")
@RestController
public class PedidoApi {

    @Autowired
    private ApiService apiService;

    @Autowired
    private PedidoDao pedidoDao;

    @PostMapping("/pedido")
    public void postPedido(@RequestBody Pedido pedido) throws InserirPedidoException {
        pedidoDao.inserirPedido(pedido);
    }

    @GetMapping("/pedido")
    public List<Pedido> getPedido() {
        return pedidoDao.obterPedidos();
    }

    @GetMapping("/frete")
    public Double getFrete(@RequestParam Integer quantidade) throws ObterFreteException {
        return apiService.obterFrete(quantidade);
    }

}
