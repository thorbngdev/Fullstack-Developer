package br.com.api.endpoint;

import br.com.api.dao.ClienteDao;
import br.com.api.model.Cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ClienteApi {

    @Autowired
    private ClienteDao clienteDao;

    @GetMapping("/clientes")
    public List<Cliente> getClientes() {
        return clienteDao.obterClientes();
    }

    @PostMapping("/clientes")
    public void postClientes(@RequestBody Cliente cliente) {
        clienteDao.inserirCliente(cliente);
    }
}
