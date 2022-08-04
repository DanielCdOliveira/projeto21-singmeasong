# <p align = "center"> Projeto Sing me a song </p>

<p align="center">
   <img width="30%" src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f399-fe0f.svg"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Daniel Oliveira-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/DanielCdOliveira/projeto20-repoprovas?color=4dae71&style=flat-square" />
</p>


##  :clipboard: Descrição

- Já pediu para alguém alguma recomendação de música? Chegou a hora de transformar isso em código. Nessa semana, você vai construir a rede Sing me a Song. Ou melhor, os testes desta rede!
- Sing me a song é uma aplicação para recomendação anônima de músicas. Quanto mais as pessoas curtirem uma recomendação, maior a chance dela ser recomendada para outras pessoas 🙂.

***

## :computer:	 Tecnologias e Conceitos

- REST APIs
- JWTs 
- Node.js
- TypeScript
- Postgresql
- Prisma
- Jest
- Heroku

***

## :rocket: Rotas

```yml
POST /recommendations
    - Rota para cadastrar uma nova recomendação
    - headers: {}
    - body:{
        "name":"<nome_da_musica>",
        "youtubeLink":"<link_do_youtube>"
}
```
```yml
POST /recommendations/:id/upvote
    - Rota para adicionar 1 ponto na recomendação
    - headers: {}
    - body:{}
```
```yml
POST /recommendations/:id/downvote
    - Rota para remover 1 ponto na recomendação
    - headers: {}
    - body:{}
```
    
```yml 
get /recommendations
    - Rota para pegar as últimas 10 recomendações
    - headers: {}
    - body: {}
```
```yml 
get /recommendations/:id
    - Rota para pegar as últimas recomendações pelo id
    - headers: {}
    - body: {}
```
```yml 
get /recommendations/random
    - Rota para pegar recomendações aleatórias
    - headers: {}
    - body: {}
```
```yml 
get /recommendations/top/:amount
    - Rota para pegar lista as músicas com maior número de pontos e sua pontuação 
    - headers: {}
    - body: {}
```

***

## 🏁 Rodando a aplicação

Certifique-se que voce tem a ultima versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/DanielCdOliveira/projeto21-singmeasong
```

## Back-end

Dentro da pasta back-end, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Finalizado o processo, é só inicializar o servidor:

> Para subir a aplicação em ambiente de desenvolvimento:
```
npm run dev
```

> Para subir a aplicação de testes de integração:
- é necessario criar um arquivo **.env.test** para rodar esse comando
```
npm run test
```
> Para subir a aplicação de testes unitários:
- é necessario criar um arquivo **.env.test** para rodar esse comando
```
npm run test:unit
```
> Para subir a aplicação para testes com cypress(front-end):
- é necessario criar um arquivo **.env.test** para rodar esse comando
```
npm run dev:test
```

> Para rodar a build do projeto com typescript:

```
npm run build
```
> Para subir a aplicação após o build:
```
npm run start
```
## Front-end

Dentro da pasta back-end, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Finalizado o processo, é só inicializar o servidor:

> Para subir a aplicação em ambiente de desenvolvimento:
```
npm start
```

> Para subir a aplicação de testes com cypress:
- é necessario abrir a aplicação do back-end com o comando **npm run dev:test**
```
npm test
```

## Thunder client

- Para testes manuais é possível importar o arquivo **thunder-collection_singMeASong.json**
