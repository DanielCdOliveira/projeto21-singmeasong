
<div align="center"><img style = "width:100%;"src="https://i.imgur.com/j0zXkzh.png"></img></div>
<hr>
<h2 align=center>RepoProvas</h2>
<h3 align=center>Web development Project</h3>
<hr>
<h4 align=center>Have you ever asked anyone for music recommendations? It's time to turn this into code. This week, you will build the Sing me a Song network. Or rather, the tests of this network!</h4>
<h4 align=center>Sing me a song is an application for anonymous song recommendation. The more people like a recommendation, the more likely it is to be recommended to others 🙂.</h4>

<hr>

<p align="center">
   <img src="https://img.shields.io/badge/author-Daniel Oliveira-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/DanielCdOliveira/projeto21-singmeasong?color=4dae71&style=flat-square" />
</p>


## :computer: Technologies and Concepts

- REST APIs
- JWTs
- Node.js
- TypeScript
- postgresql
- Prism
- Jest
- Heroku

***

## :rocket: Routes

```yml
POST /recommendations
    - Route to register a new recommendation
    - headers: {}
    - body:{
        "name":"<songname>",
        "youtubeLink":"<youtube_link>"
}
```
```yml
POST /recommendations/:id/upvote
    - Route to add 1 point in the recommendation
    - headers: {}
    - body:{}
```
```yml
POST /recommendations/:id/downvote
    - Route to remove 1 point in recommendation
    - headers: {}
    - body:{}
```
    
```yml
get /recommendations
    - Route to get the last 10 recommendations
    - headers: {}
    - body: {}
```
```yml
get /recommendations/:id
    - Route to get the latest recommendations by id
    - headers: {}
    - body: {}
```
```yml
get /recommendations/random
    - Route to pick up random recommendations
    - headers: {}
    - body: {}
```
```yml
get /recommendations/top/:amount
    - Route to pick up lists the songs with the most points and their score
    - headers: {}
    - body: {}
```

***

## 🏁 Running the application

Make sure you have the latest stable version of [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) running locally.

First, clone this repository on your machine:

```
git clone https://github.com/DanielCdOliveira/projeto21-singmeasong
```

## Backend

Inside the backend folder, run the following command to install the dependencies.

```
npm install
```

Once the process is finished, just start the server:

> To upload the application to the development environment:
```
npm run dev
```

> To upload the integration testing application:
- it is necessary to create a **.env.test** file to run this command
```
npm run test
```
> To upload the unit tests application:
- it is necessary to create a **.env.test** file to run this command
```
npm run test:unit
```
> To upload the application for testing with cypress(front-end):
- it is necessary to create a **.env.test** file to run this command
```
npm run dev:test
```

> To run the project build with typescript:

```
npm run build
```
> To upload the application after the build:
```
npm run start
```
## Front end

Inside the backend folder, run the following command to install the dependencies.

```
npm install
```

Once the process is finished, just start the server:

> To upload the application to the development environment:
```
npm start
```

> To upload the test application with cypress:
- it is necessary to open the backend application with the command **npm run dev:test**
```
npm test
```

## Thunder client

- For manual testing it is possible to import the file **thunder-collection_singMeASong.json**
