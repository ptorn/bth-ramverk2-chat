[![Build Status](https://travis-ci.org/ptorn/bth-ramverk2-gomoku.svg?branch=master)](https://travis-ci.org/ptorn/bth-ramverk2-gomoku)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/badges/build.png?b=master)](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/build-status/master)
[![Code Coverage](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/?branch=master)
[![codecov](https://codecov.io/gh/ptorn/bth-ramverk2-gomoku/branch/master/graph/badge.svg)](https://codecov.io/gh/ptorn/bth-ramverk2-gomoku)

BTH-Ramverk2-Gomoku
=====================

This application is my final project for the course Framework2 at [BTH](https://www.bth.se/eng/).

1. [Specification](#specification)
2. [Installation](#installation)
3. [Testing](#testing)
4. [CI-Chain](#ci-chain)
5. [Realtime](#realtime)
6. [Database](#database)
7. [Npm-module](#npm-module)
8. [Docker](#docker)

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

Before starting there are some environment variables that could be used if you dont want to use default values for mongodb which is.

```bash
DBWEBB_DSN=mongodb://localhost:27017/collection
```

or the port express uses to server the application.

```bash
DBWEBB_PORT=3000
```

The values used here in the example is the default values.

## Installation method 1

#### First clone the repo

```bash
git clone https://github.com/ptorn/bth-ramverk2-gomoku.git
```

#### Install dependencies

This will download all dependencies and build the client.

```bash
cd bth-ramverk2-gomoku
npm install
```

#### Start the application

```bash
npm start
```

That's it now you are all set.

## Installation method 2 using Docker

If you dont have a mongodb server already setup then this method using docker-compose will get you up and running in just a few steps.

#### First clone the repo

```bash
git clone https://github.com/ptorn/bth-ramverk2-gomoku.git
```

#### Start and stop using Docker

Start the application and it's services as docker containers. This command will build the containers from scratch and build the application inside the express container. One container for the express-server and one for MongoDB.

```bash
npm run start-docker  // Start the services and containers.
npm run stop-docker   // Shutsdown the services and containers.
```

## Installation for production (Docker)

I have setup a chain for building the docker image for the application to save building time and ensure a functioning application for production.

#### First clone the repo

```bash
git clone https://github.com/ptorn/bth-ramverk2-gomoku.git
```

#### Start application
This downloads a already built image of the application to run.

```bash
npm run start-docker-prod
```

# Testing 
## Testing and validation

I use [Mocha](https://mochajs.org/) for my unittests and [Chai](http://chaijs.com/) as a assertions library for my tests with expect. There is only tests for the server part of the application and not the client. And [nyc/istanbul](https://istanbul.js.org/) for codecoverage.

JavaScript code is beeing tested and linted using [ESLint](https://eslint.org/).

The LESS code is tested and validated using lesshint. CSS is beeing tested using [stylelint](https://stylelint.io/). This is beeing tested when the Ci-Chain is executed.

MongoDB is needed to run the tests since the tests also test the database.
If you don't have a MongoDB database running then you can just run:

```bash
docker-compose up mongodb
```

That command will spinn up a docker container running MongoDB.

```bash
npm test            // Mocha, nyc, eslint, stylelint, lesshint
npm run mocha-nyc       // Mocha, nyc
npm run eslint      // Eslint
npm run stylelint   // Stylelint

# During development
npm run test-watch  // Will re-run tests upon save while programming TDD.
```

## Test using Docker

By using Docker we can quickly spin-up a container running on different node servers to test and validate our code. This works great if you don't have a MongoDB database running since Docker will start one automaticly for you.

```bash
npm run test-docker         // Node version Latest
npm run test-docker1        // Node version 9
npm run test-docker2        // Node version 8
```

## Codecoverage

#### Generate reports

```bash
npm run mocha-nyc
```

Tests will run and generate a report that can be views localy here `/build/coverage/`

# CI-Chain

I decided to go with [Scrutinizer](https://scrutinizer-ci.com) to handle the CI-Chain of running tests and trying to build the applicationts. Scrutinizer also goes through and check the quality of the code. I prefer scrutinizer to go through my code and check my code coverage. I also like that scrutinizer gives me suggestions on how I can make my code better.

[Travis](https://travis-ci.org/) is what I prefer use to keep track on if my application succeeds on creating a build without a problem.

Another service that I use is [Codecov](https://codecov.io). Codecov goes through the code and checks how much of the applications code is covered by tests.

Docker cloud is also a part of the chain. By keeping an eye on the GitHub repository docker cloud will build a image once a commit has been validated and approved.

All the services in the CI-Chain is automated and triggerd on a git push to GitHub. One command and it triggers this long CI-Chain to ensure great code at the end. I chose these services because I find they give me full coverage and controll over my code. With these services I feel confident that the code i write work and at the end of the chain there will be a built docker-image ready for production. Gives me greater controll of my application as whole.

The reports and the rating given this application by my CI-Chain are pretty good based on my tests.

The badges gives a good picture of the current status of a project. These tools are basicly my preferd CI-chain which i like to work with.

# Realtime

#### WebSockets

I decided to use naitive WebSockets to handle the realtime features of the application. The reason for this was simply that I wanted to understand the basics of WebSockets before I would add any extra layer over it.

For this application it works really well. Data is verya easily transmitted between the server and the clients connected. This makes it ideal for a realtime application such as this game and chat.

#### Realtime fetures

This application uses WebSockets for handeling the game and the chat part of the application. For example when a player places a token on the board that data is beeing sent to the server that process it and then transmitt the updated data from the server to every client connected to the server. When every client reacieves the new data the client will update and re-render the new data in realtime. 

The chat feature uses it to give the users the abbility to chat with eachother in realtime. A user sends a message that the server recieves and then transmitts it back to every user that is connected so the message is displayed in theire chat window.

#### Reflection

It's a great way to give an application the extra power of communicating realtime to ensure everyone is working with the latest data. This especially works great in a SPA(single-page-application) like this.

# Database

For this application I use [MongoDB](https://www.mongodb.com/). MongoDB is a NoSQL database which means its not a relational database. It's a document database that stores its data as JSON-like documents. MongoDB is very easy to use and works great with this application. I can just store my objects directly in the database as JSON-objects. Which makes it very easy to work with as i scale my application. I'm not limited to a database schema so I can just change my objects and store them as i go along with developing my application and adding new data that needs to be stored.

For future projects it depends on the actuall project. If I deal with data that is tied/linked close together then a relational database is a great way to link data and also gather data to be used.

# Npm-module

I wrote a module to handle the basic CRUD functions against a MongoDB database. The name of the module is [bth-mongodb-crud](https://www.npmjs.com/package/bth-mongodb-crud). The module simplyfies setting up a connection and it returns a object that I can use to handle the basic CRUD functions. In this project I use it for handeling the result of the previous played games.

Npm as a package-manager works great. Not the fastest but it does the job really well. It's a great way to manage your application and its dependencies. Also when you working with your own module then it's very easy to keep all the applications updated when a update is released to npm.

# Docker

As a last step in my CI-Chain I added docker cloud. Once a commit has been validated and passed building then docker starts to build the image. By doing this I delegate the building time to a sepperate service that automaticly builds any new release.

I use this image to run my application on my productionserver. This happend to be a great way for me to launch my application. I had some problems prior with a service provider that cancelled my npm install script due to that it took to long to run. By just pulling down the latest image I get a fully functional container running the latest version of the application.

[bth-ramver2-gomoku](https://www.npmjs.com/package/bth-mongodb-crud) on docker store.
[Dockerfile](https://github.com/ptorn/bth-ramverk2-gomoku/blob/master/docker/Dockerfile_node_latest) on GitHub.


**Enjoy!**
