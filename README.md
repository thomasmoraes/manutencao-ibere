# Mapa Cultural - Iberê Camargo

O Projeto Mapa Cultural do Iberê Camargo vem com o intuito de fomentar a cultura em Porto Alegre, através de uma aplicação web, ele deve propiciar a mobilidade entre instituições culturais na cidade.

## Configurações

### Backend

#### MySQL no Docker

1. Certifique-se de possuir o docker e o docker-compose instalados no ambiente
2. Certifique-se de que a porta 3307 está liberada
3. Na raiz do projeto, execute os seguintes comandos:
  - `cd back`
  - `npm install` ou `yarn install`
  - `docker-compose up iberedb`

#### Configurando o banco de dados para desenvolvimento

1. Utilize um cliente MySQL para criar uma conexão com a seguinte configuração:
  - **Name:** ibere 
  - **Server Host:** localhost 
  - **Port:** 3307
  - **Username:** root
  - **Password:** senha
2. Na pasta */back*, execute os seguintes comandos:
  - `npx sequelize-cli db:migrate`
  - `npx sequelize-cli db:seed:all`

### Frontend

Para rodar o frontend da aplicação, basta executar os seguintes comandos na raiz do projeto:

1. `cd front`
2. `npm install` ou `yarn install`
3. `npm start` ou `yarn start`

### Servidor

#### GitLab Runner

É um serviço escrito em linguagem GO que serve para rodar os jobs do projeto e enviar o resultado diretamente para o GitLab. É utilizado em conjunto com o GitLab CI, o serviço de integração continua da empresa.

##### Instalação

Seguem links de como instalar o Runner nas principais plataformas:

- [Windows](https://docs.gitlab.com/runner/install/windows.html)
- [Linux](https://docs.gitlab.com/runner/install/linux-repository.html)
- [Docker](https://docs.gitlab.com/runner/install/docker.html)

##### Configuração

Após instalar o Runner é necessário configurar o serviço para integrar com algum repositório do GitLab.

Deve-se acessar a página "CI/CD Pipelines" ("Projeto" > Settings > CI/CD Pipelines).

Deve-se anotar a URL presente na imagem e o token informado para o projeto.

Após obter as informações para a configuração basta seguir o seguinte [tutorial](https://docs.gitlab.com/runner/register/index.html).
