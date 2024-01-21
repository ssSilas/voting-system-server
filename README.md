# Sistema de Votação com NestJS

Bem-vindo ao Sistema de Votação, uma aplicação de votação em tempo real em fase de desenvolvimento que utilizará tecnologias como: NestJS, Docker, RabbitMQ, Jest, MongoDB e gerenciado com o Jira.

## Visão Geral

Utilizado para permitir que os usuários criem enquetes, adicionem opções e votem em suas escolhas preferidas. Os resultados são atualizados em tempo real para proporcionar uma experiência interativa.

## Tecnologias Utilizadas

- **NestJS:** Optei pelo NestJS como estrutura principal para desenvolver minha API, pois ele facilita a criação de aplicativos escaláveis e eficientes.
- **Docker:** contêineres Docker para criar um ambiente de desenvolvimento isolado e facilitar a implantação.
- **RabbitMQ:** O RabbitMQ será fundamental para lidar com eventos assíncronos, como a contagem de votos e a atualização dos resultados em tempo real.
- **Jest:** escrever testes automatizados que garantem a funcionalidade correta da API.
- **MongoDB:** O MongoDB é responsável por armazenar informações sobre enquetes, opções e votos dos usuários.
- **Jira:** Utilizei o Jira como plataforma de gerenciamento de ideias e tarefas para planejar, rastrear e gerenciar o desenvolvimento deste projeto de forma colaborativa.

## Funcionalidades Principais

- Registo e autenticação de usuários.
- Criação de enquetes com opções personalizadas.
- Votação em enquetes existentes.
- Acompanhamento em tempo real dos resultados das enquetes.
- Comunicação assíncrona para atualização dos resultados.
- Envio de emails aós o término do prazo de votação.

## Como Iniciar

Se você deseja iniciar o projeto em seu ambiente de desenvolvimento, siga estas etapas:

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/sistema-de-votacao.git
   ```

### Iniciar a aplicação

O projeto roda em um container docker para rodar a aplicação e o banco de teste. Para utiliza-los rode o comando:

   ```bash
   docker-compose up app
   ```

### Docs - Swagger

A aplicaçao possui uma documentação em Swagger, para acessá-la rode a aplicação e acesse **<http://127.0.0.1:8090/api#/>**.

### Collection - Postman

A collection está disponivel para uso na raiz do projeto, basta importa-la para o postman ou software semelhante.
