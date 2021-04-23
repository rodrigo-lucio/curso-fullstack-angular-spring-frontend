<h1 align="center">
    <img src=".github/dashboard.png" />
</h1>

## 💻 Projeto

Front-end do projeto desenvolvido durante o curso Fullstack Angular e Spring da [AlgaWorks](https://github.com/algaworks).

Utilizado [Angular CLI ](https://github.com/angular/angular-cli) versão 10.0.1.

O repositório do back-end você encontra [aqui](https://github.com/rodrigo-lucio/curso-fullstack-angular-spring-backend).

## 📱 Demonstração

- [Clique aqui para uma demonstração](http://18.234.65.57:4200/login) 
- Usuário: demo@demo.com.br 
- Senha: demo
- Sinta-se à vontade 😃

## :rocket: Tecnologias

Neste projeto foram utilizadas as seguintes tecnologias:

- [Angular](https://angular.io/)
- [Biblioteca PrimeNG](https://www.primefaces.org/primeng-5.2.7/)
- [Deploy na AWS com EC2](https://aws.amazon.com/pt/ec2/) 
- [Docker](https://www.docker.com/)
	- 03 containers: OpenJDK, PostgreSQL e Nginx, conforme o arquivo [docker-compose.yml](https://github.com/rodrigo-lucio/curso-fullstack-angular-spring-frontend/blob/master/docker-compose.yml)

## ▶️ Utilização

Dentro da pasta do projeto, execute o comando `npm install` para instalar as todas as dependências necessárias.

Após isso, execute o comando `ng serve` para iniciar a aplicação.

A projeto estará rodando em `http://localhost:4200`.

Com a API do Back-end iniciada, você poderá utilizar as seguintes credencias para acessar:

Login: admin@algamoney.com e senha: admin

Obs: Este projeto fará automaticamente o controle de busca e renovação do token [JWT](https://jwt.io/).

## :whale: Utilização com Docker

As imagens estão publicadas em meu [Docker Hub](https://hub.docker.com/u/rodrigolucio), mas caso preferir, os arquivos de imagens também encontram-se nas raízes dos repositórios.

Com o Docker instalado, navegue até o diretório raiz deste repositório e execute o comando:
```
$ docker-compose up
```
O projeto estará acessível em `http://localhost` e o back-end em `http://localhost:8080`, com as mesmas credencias citadas anteriormente. 










