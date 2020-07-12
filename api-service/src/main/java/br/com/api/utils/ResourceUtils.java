package br.com.api.utils;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;

@Component
public class ResourceUtils {
    /**
     *
     * Lê o arquivo dos resources com o nome passado como parâmetro e retorna o
     * conteúdo em forma de string
     *
     * @param nomeArquivo nome do arquivo que será lido
     * @return retorna o conteúdo do arquivo em string
     * @throws IOException caso haja erro durante a leitura do arquivo
     */
    public String lerArquivoResource(String nomeArquivo) throws IOException {
        InputStream in = getClass().getResourceAsStream("/" + nomeArquivo);
        StringWriter sw = new StringWriter();
        IOUtils.copy(in, sw, "utf-8");
        return sw.toString();
    }

}