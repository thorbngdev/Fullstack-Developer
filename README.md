## Fullstack - Developer

Projeto referente ao processo seletivo da MaximaTech para Desenvolvedor Fullstack.

## Módulos

1. front-end-maxima
2. api-service
3. frete-service

## Sobre api-service

**Sobre**

Serviço que contém a API

**Configuração**

Configuração de parâmetros de banco em application.properties

Parâmetros:
* URL_DO_BANCO: url do banco de dados
* PORTA: porta do banco de dados
* NOME_DO_BANCO: nome do banco de dados
* USUARIO: usuário de acesso ao banco de dados
* SENHA: senha de acesso ao banco de dados

Exemplo:
```properties
spring.datasource.driver-class-name: org.postgresql.Driver
spring.datasource.url: jdbc:postgresql://URL_DO_BANCO:PORTA/NOME_DO_BANCO
spring.datasource.username: USUARIO
spring.datasource.password: SENHA
```

* As tabelas necessárias serão criadas automaticamente, desde que o serviço tenha a configuração correta.
* Java 8
* PostgreSQL 12
* Porta 8080 liberada
* Swagger Documentation: localhost:8080/swagger-ui.html#/

## Sobre frete-service

**Sobre**

Serviço que contém a funcionalidade de cálculo de frete.

**Configuração**

* Java 8
* Porta 8081 liberada
* Swagger Documentation: http://localhost:8081/swagger-ui.html#/

## Sobre front-end-maxima

**Sobre**

Front-end da aplicação, contém a interface do projeto.

**Configuração**

* Angular 10
* Porta 4200 liberada

## Contato
eduardotorresgalvao@gmail.com
