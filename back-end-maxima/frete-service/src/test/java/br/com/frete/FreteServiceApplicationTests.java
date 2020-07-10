package br.com.frete;

import br.com.frete.service.FreteService;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.Assert.assertNotNull;

@SpringBootTest
class FreteServiceApplicationTests {

	@Autowired
	private FreteService freteService;

	private Logger logger = LoggerFactory.getLogger(FreteServiceApplicationTests.class);

	@Test
	public void calcularFreteTest() {
		Double doubleTest = freteService.calcularFrete(1);
		assertNotNull(doubleTest);
	}

}
