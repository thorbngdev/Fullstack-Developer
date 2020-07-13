package br.com.api.endpoint;

import br.com.api.dao.ProdutoDao;
import br.com.api.model.Produto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProdutoApi {

    @Autowired
    private ProdutoDao produtosDao;

    @GetMapping("/produtos")
    public List<Produto> getProdutos() {
        return produtosDao.obterProdutos();
    }

    @PostMapping("/produtos")
    public void postProdutos(@RequestBody Produto produto) {
        produtosDao.inserirProduto(produto);
    }
}
