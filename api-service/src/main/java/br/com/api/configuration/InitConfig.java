package br.com.api.configuration;

import br.com.api.dao.ClienteDao;
import br.com.api.dao.ProdutoDao;
import br.com.api.model.Cliente;
import br.com.api.model.Produto;
import br.com.api.service.ApiService;
import br.com.api.utils.ResourceUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@Configuration
public class InitConfig {

    @Autowired
    private ResourceUtils resourceUtils;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private ApiService apiService;

    @Autowired
    private ClienteDao clienteDao;

    @Autowired
    private ProdutoDao produtoDao;

    private final String NOME_ARQUIVO_CONFIGURACAO_DDL = "ddl.config";

    /**
     * Criando bean do RestTemplate
     * @return
     */
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    /**
     * Executar arquivos ddl para preparar o banco de dados configurado
     * @throws IOException
     */
    @Bean
    public void executarDdls() throws IOException {
        String[] arquivosDDL = resourceUtils.lerArquivoResource(NOME_ARQUIVO_CONFIGURACAO_DDL).split("\\r?\\n");
        for (String arquivo : arquivosDDL) {
            jdbcTemplate.execute(resourceUtils.lerArquivoResource(arquivo));
        }
        configurarClientesExistentes();
        configurarProdutosExistentes();
    }

    private void configurarClientesExistentes() {
        Cliente[] clientes = apiService.obterClientes();
        for(Cliente cliente : clientes) {
            clienteDao.inserirCliente(cliente);
        }
    }

    private void configurarProdutosExistentes() {
        Produto[] produtos = apiService.obterProdutos();
        for(Produto produto : produtos) {
            produtoDao.inserirProduto(produto);
        }
    }
}
