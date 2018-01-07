[![Build Status](https://travis-ci.org/ptorn/bth-ramverk2-gomoku.svg?branch=master)](https://travis-ci.org/ptorn/bth-ramverk2-gomoku)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/badges/build.png?b=master)](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/build-status/master)
[![Code Coverage](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/?branch=master)
[![codecov](https://codecov.io/gh/ptorn/bth-ramverk2-gomoku/branch/master/graph/badge.svg)](https://codecov.io/gh/ptorn/bth-ramverk2-gomoku)

BTH-Ramverk2-Gomoku
=====================

This application is my final project for the course Framework2 at [BTH](https://www.bth.se/eng/).

## Specification
This is my version of the game [Gomoku](https://en.wikipedia.org/wiki/Gomoku). The goal of the game is to get five tokens in a row. Gomoku is played by two players. Each player has their own token. Player one has "X" and player two has "0". Player one start by placing the token on the board. After that the players take turns placing theire tokens on the board. Upon entry of the webpage the user will have to login by choosing a nickname to represent that user. The nickname must be uniqe and can not be blank. Many users can login and enter the room at the same time. Once inside all the logged in users can talk to eachother in realtime using the chat client on the page. To be able to play a user must claim a seat at the table. If a player leaves the table in the middle of a game then the opponent will winn that round and the data will be stored in the database. Inside the room you can see the result of the last five rounds where the winner and looser is displayed. The project is built using JavaScript, HTML, LESS. The result of games played are stored in a MongoDB database and the data is picked up from the database and displayed inside the application.

* React
* Express.js
* MongoDB
* WebSockets
* Docker
* Realtime feature
* Mocha - Unit testing

#### React - Client
[React](https://reactjs.org/) is a JavaScript framework that I used for managing the views of my client using JSX. JSX is a syntax extension to JavaScript which we use to write the views. React uses something called components which lets us re-use the code over and over. A component can have its own state or just inherit properties from the parent component that has a state. By using a components state React can keep track on what data is beeing updated and then only rerender that specifik DOM-object instead of reloading the entire page. Components that inherit their properties from the parent component with a state will be re-rendered by update of data. This makes React a great choice for working on a SPA (single-page-application). That is perfekt for this application since this is a game that is using websockets to transfer data realtime and alot of the data on the page remains the same. So when React notice that the data has changed in the state of the component it re-renders the component. A example would be placing a token on the table. Instead of reloading the entire page and make unnessesary calls to the server it just recieves data from the websocket and update the components state. The rest is React magic.

#### Express - Backend
The backend is built on the Express.js framework that holds the game logic and also works as a webserver by serving the client. [Express.js](https://expressjs.com/) is a framework for [Node.js](https://nodejs.org/en/) that is written in JavaScript. That makes it a great choice for this project. Express.js handels all the game logic, serves the client as a webserver and also a WebSocket-server. With Express and Node.js we now use JavaScript both on the client and the server which is very convenient.

#### MongoDB
[MongoDB](https://www.mongodb.com/) is a NoSQL database that is used to store the result of previous played games. The client will display the last five played games once you enter the room. MongoDB is a none relational database and works very well when we are dealing with objects that we want to store as is in a database. The data is stored in JSON alike files and makes it very conventient when programming in JavaScript that we deal with objects.

#### WebSockets
To manage the realtime features and functionality I use WebSockets. WebSockets establishes a link between the server and the clients. Using WebSockets the server/client can send messages to and from each other to update everyone on the latest changes.

#### Docker
[Docker](https://www.docker.com/) is used for containerizing the application. You could very fast setup the application for production or a testing environment with docker to ensure all dependencies are the same regarding of the system beeing used to run the application.

#### Mocha
To make sure that the application is doing what it is supposed to I use [Mocha](https://mochajs.org/) for unittesting. I added [Chai](http://chaijs.com/) as a assertion library and use expect assert my tests.

### Limitations
There are some limitations in the application.

* You enter the room with ur username which is missing password authentication. Anyone could login with any username as long as it's not beeing used. Therefor you cant be sure who infact is the user that uses the specifik username.

* Only one game can be played at a time which limitis the game to two people playing at a time.

### Summary
I think that the technics that I have used for this application works extremly well. React does the job of handeling the views of the client very well and is a joy to work with. Very nice to work with the componets state and realtime features using WebSockets.
Makes the app as SPA(singla-page-application) work very fast and not re-render the whole DOM.
___

# Installation

## Installation method 1

Before starting there are some environment variables that could be used if you dont want to use default values for mongodb whish is 

`DBWEBB_DSN=mongodb://localhost:27017/collection`

or the port express uses to server the application.

`DBWEBB_PORT=3000`

The values used here in the example is the default values.

1. First clone the repo.
`git clone https://github.com/ptorn/bth-ramverk2-gomoku.git`

2. Next install the dependencies for server and client.
This will download all dependencies and build the client.
`cd bth-ramverk2-gomoku`
`npm install`

3. Last step is to start the application.
`npm start`

That's it now you are all set.

## Installation method 2 using Docker

If you dont have a mongodb server already setup then this method using docker-compose will get you up and running in just a few steps.

1. First clone the repo.
`git clone https://github.com/ptorn/bth-ramverk2-gomoku.git`

2. Start the application and it's services
This command will build the containers from scratch and build the application inside the express container. One container for the express-server and one for MongoDB.
`npm run start-docker`

3. To stop the application and containers.
This command will shutdown the containers and the application.
`npm run stop-docker`

## Installation for production

I have setup a chain for building the docker image for the application to save building time and ensure a functioning application for production.

1. First clone the repo.
`git clone https://github.com/ptorn/bth-ramverk2-gomoku.git`

2. Start application
This downloads a already built image of the application to run.
`npm run start-docker-prod`

## Testing

I use [Mocha](https://mochajs.org/) for my unittests and [Chai](http://chaijs.com/) as a assertions library for my tests. There is only tests for the server part of the application and not the client. 

## CI-Chain

## Realtime

## Database

## Npm-module

## Docker
**Enjoy!**
