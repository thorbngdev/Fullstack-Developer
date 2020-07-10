package br.com.api;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertThat;

@SpringBootTest
class ApiServiceApplicationTests {

	@Autowired
	private RestTemplate restTemplate;

	@Test
	void contextLoads() {
	}

	@Test
	public void obterFreteTest() {
		Integer quantidade = 10;
		String url = "http://localhost:8081/api/frete?quantidade=" + quantidade;
		ResponseEntity<Double> response = restTemplate.getForEntity(url, Double.class);
		assertThat(response.getStatusCode(), equalTo(HttpStatus.OK));
	}

}
