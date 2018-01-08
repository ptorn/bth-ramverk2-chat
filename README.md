[![Build Status](https://travis-ci.org/ptorn/bth-ramverk2-gomoku.svg?branch=master)](https://travis-ci.org/ptorn/bth-ramverk2-gomoku)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/badges/build.png?b=master)](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/build-status/master)
[![Code Coverage](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/?branch=master)
[![codecov](https://codecov.io/gh/ptorn/bth-ramverk2-gomoku/branch/master/graph/badge.svg)](https://codecov.io/gh/ptorn/bth-ramverk2-gomoku)

BTH-Ramverk2-Gomoku
=====================

This application is my final project for the course Framework2 at [BTH](https://www.bth.se/eng/).

Demo can be viewed [here](http://gomoku.ptorn.se)

## Content

1. [Specification](#specification)
    - [React - Client](#react-client)
    - [Express - Backend](#express-backend)
    - [MongoDB](#mongodb)
    - [WebSockets](#websockets)
    - [Docker - Containers](#docker-containers)
    - [Mocha](#mocha)
    - [Limitations](#limitations)
    - [Summary](#summary)
2. [Installation](#installation)
    - [Installation method 1](#installation-method-1)
    - [Installation method 2 using Docker](#installation-method-2-using-docker)
    - [Installation for production (Docker)](#installation-for-production-docker)
3. [Testing](#testing)
    - [Testing and validation](#testing-and-validation)
    - [Testing using Docker](#testing-using-docker)
    - [Code coverage](#code-coverage)
4. [CI-Chain](#ci-chain)
    - [Code coverage](#code-coverage)
5. [Realtime](#realtime)
6. [Database](#database)
7. [Npm-module](#npm-module)
8. [Docker](#docker)
8. [Article about React](#article-about-react)

# Specification

This is my version of the game [Gomoku](https://en.wikipedia.org/wiki/Gomoku). The goal of the game is to get five tokens in a row. Gomoku is played by two players where each player has their own token. Player one has "X" and player two has "0". Player one starts by placing the token on the board. After that the players take turns placing their tokens on the board. Upon entry of the web page the user will have to login by choosing a nickname to represent themselves. The nickname must be unique and can not be left blank. Many users can login and enter the room at the same time. Once inside all the logged in users can talk to each other in real-time using the chat client on the page. To be able to play, a user must claim a seat at the table. If a player leaves the table in the middle of a game then the opponent will automatically win. Thereafter, the data will be stored in the database. Inside the room you can see the result of the last five rounds where the winner and loser is displayed. The project is built using JavaScript, HTML and LESS. The result of the previous games played are stored in a MongoDB database. The data is retrieved from the database and displayed inside the application.

* React
* Express.js
* MongoDB
* WebSockets
* Docker
* Realtime feature
* Mocha - Unit testing

## React - Client

[React](https://reactjs.org/) is a JavaScript library that I used for managing and rendering the views. React uses JSX for the views that the client renders. JSX is a syntax extension for JavaScript which is used to write the views. React uses something called components, which lets us reuse the code repeatedly. A component can have it's own state or just inherit properties from the parent component that has a state. By using a component's state, React can track the submitted data. When React notices a change in a components state, React calls for a re-render of the specific DOM-element instead of reloading the entire DOM-tree. Components that inherit their properties from the parent component with a state will be re-rendered by update of data. This makes React a great choice for working on a SPA(Single-Page-Application). That is perfect for this application since this is a game that is using web-sockets to transfer data real-time and a lot of the data on the page remains the same. 

An example would be placing a token on the table. Instead of reloading the entire page and making unnecessary calls to the server, it just receives data from the web-socket and update the component's state. The rest is React magic.

## Express - Back-end

The back-end is built on the Express.js framework that holds the game logic and also works as a web server by serving the client. [Express.js](https://expressjs.com/) is a framework for [Node.js](https://nodejs.org/en/) that is written in JavaScript. That makes it a great choice for this project. Express.js handles all the game logic, serves the client as a web-server and also a WebSocket-server. With Express and Node.js we now use JavaScript both on the client and the server which is very convenient.

## MongoDB

[MongoDB](https://www.mongodb.com/) is a NoSQL database that is used to store the results of previous games played. The client will display the last five games played  once the guest enter the room. MongoDB is a none relational database and works very well when we are dealing with objects that we want to store as objects in a database. The data is stored in JSON alike files and makes it very convenient when programming in JavaScript. By working and storing objects in the database, it's easier to build and scale the application.

## WebSockets

To manage the real-time features and functionality I use WebSockets. WebSockets establishes a link between the server and the clients. Using WebSockets the server/client can send messages to and from each other to update everyone on the latest changes.

## Docker - Containers

[Docker](https://www.docker.com/) is used for containerizing the application. You can quickly setup the application for production, development or as a testing environment with Docker to ensure all dependencies are the same regardless of the system being used to run the application.

## Mocha

To make sure that the application is doing what it is supposed to, I use [Mocha](https://mochajs.org/) for unit-testing. I added [Chai](http://chaijs.com/) as a assertion library and use Expect to assert my tests.

## Limitations

There are some limitations in the application.

* You enter the room with your username which is lacking a password authentication feature. Anyone could login with any username as long as it's not being used. Therefore you can't be certain who the user is by their username.

* Only one game can be played at a time which limits the game to two people.

## Summary

I think that the techniques that I have used for this application works very well. React does the job of handling the views of the client and is a joy to work with. It is very nice to work with the components state and the real-time features of WebSockets.
All of these factors make the app as a SPA (Single-Page-Application) work quickly and effeciently without re-render the entire DOM.
___

# Installation

Before starting, there are some environment variables that can be used if you don't want to use the default values.

#### Default values:

```bash
DBWEBB_DSN=mongodb://localhost:27017/collection
```

Or, the port that Express uses to serve the application:

```bash
DBWEBB_PORT=3000
```

Finally, this is the address to the WebSocket server that the client use.

```bash
DBWEBB_WSSERVER=loalhost:3000
```

The values used in these examples are the default values.

## Installation method 1

### First clone the repo

```bash
git clone https://github.com/ptorn/bth-ramverk2-gomoku.git
```

### Install dependencies

This will download all dependencies and build the client.

```bash
cd bth-ramverk2-gomoku
npm install
```

### Start the application

```bash
npm start
```

That's it now you are all set.

## Installation method 2 using Docker

If you don't have a MongoDB server already setup, then this method using docker-compose will get you up and running in just a few steps.

### First clone the repo

```bash
git clone https://github.com/ptorn/bth-ramverk2-gomoku.git
```

### Start and stop using Docker

Start the application and it's services as docker containers. This command will build the containers from scratch and build the application inside the Express container. One container for the Express-server and one for MongoDB.

```bash
npm run start-docker        // Start the services and containers.
npm run stop-docker         // Shutdown the services and containers.
```

## Installation for production (Docker)

I have setup a chain for building the docker image for the application to save building time and to ensure a functioning application for production.

### First clone the repo

```bash
git clone https://github.com/ptorn/bth-ramverk2-gomoku.git
```

### Start application
This downloads an already built image of the application to run.

```bash
npm run start-docker-prod
```

# Testing 
## Testing and validation

I use [Mocha](https://mochajs.org/) for my unit-tests and [Chai](http://chaijs.com/) as my assertions library for my tests using Expect. There are only tests for the server part of the application, however, not the client. I use [Nyc/Istanbul](https://istanbul.js.org/) for code coverage.

JavaScript code is being tested and linted using [ESLint](https://eslint.org/).

The LESS code is tested and validated using Lesshint. CSS is being tested using [Stylelint](https://stylelint.io/). This is being tested when the CI-Chain is executed.

MongoDB is needed to run in order to run the tests on the database.
If you don't have a MongoDB database running then you can just run:

```bash
docker-compose up mongodb
```

That command will spin up a docker container running MongoDB.

```bash
npm test                    // Mocha, Nyc, Eslint, Stylelint, Lesshint
npm run mocha-nyc           // Mocha, Nyc
npm run eslint              // Eslint
npm run stylelint           // Stylelint

# During development
npm run test-watch  // Will re-run tests upon save while programming TDD.
```

## Testing using Docker

By using Docker we can quickly instantiate a container running a different node server to test and validate our code. This works great if you don't have a MongoDB database running since Docker will start one automatically for you.

```bash
npm run test-docker         // Node version Latest
npm run test-docker1        // Node version 9
npm run test-docker2        // Node version 8
```

## Code coverage

### Generate reports

```bash
npm run mocha-nyc
```

Tests will run and generate a report that can be viewed localy here: `/build/coverage/`

# CI-Chain

I decided to go with [Scrutinizer](https://scrutinizer-ci.com) to handle the CI-Chain of running tests and trying to build the application. Scrutinizer also goes through and checks the quality of the code. I prefer Scrutinizer to go through my code and check the code coverage. I also like that Scrutinizer gives me suggestions on how I can make my code better.

[Travis](https://travis-ci.org/) is what I prefer use to keep track on the status my applications succesrate upon build.

Another service that I use is [Codecov](https://codecov.io). Codecov goes through the code and checks how much of the applications code that is covered by tests.

Docker Cloud is also a part of the CI-Chain. By keeping an eye on the GitHub repository, Docker Cloud will build an image once a commit has been validated and approved.

All the services in the CI-Chain is automated and triggers on a git push to GitHub. One command and it triggers this long CI-Chain to ensure a great code at the end. I chose these services because I find they give me full coverage and control over my code. With these services I feel confident that the code I write work, and at the end of the CI-Chain there will be a built Docker-image ready for production. This gives me greater control of my application as a whole.

The reports and the rating given this application by my CI-Chain are good based on my tests.

The badges give a good picture of the current status of a project. These tools are basically my CI-chain of choice which I like to work with.

# Realtime

## WebSockets

I decided to use native WebSockets to handle the real-time features of the application. The reason for this was simply that I wanted to understand the basics of WebSockets before I would add any extra layer over it.

For this application it works really well. Data is very easily transmitted between the server and the clients connected. This makes it ideal for a realtime application such as this game and chat.

## Realtime fetures

This application uses WebSockets for handling the game and the chat feature of the application. For example, when a player places a token on the board, that data is being sent to the server that processes it and then transmits the updated data from the server to all clients connected. When every client receives the new data, the client will update and re-render the new data in real-time.

The chat feature uses WebSockets to give the users the ability to chat with each other in real-time. A user sends a message that the server receives and then transmits it back to every user that is connected so the message is displayed in their chat window.

## Reflection

It's a great way to give an application the extra power of communicating real-time to ensure everyone is working with the latest data. This works especially great in a SPA (Single-Page-Application) like this.

# Database

For this application I use [MongoDB](https://www.mongodb.com/). MongoDB is a NoSQL database which means its not a relational database. It's a document database that stores its data as JSON-like documents. MongoDB is very easy to use and works great with this application. I can store my objects directly in the database as JSON-objects, which makes it very easy to work with as i scale my application. I'm not limited to a database schema so I can just change my objects and store them as i go along with developing my application and adding new data that needs to be stored.

Weather I would use a NoSQL database versus a relational database is dependant on the project. If I deal with data that is tied or linked close together, then a relational database is a great way to link data and also gather data to the application.

# Npm-module

I wrote a module to handle the basic CRUD functions against a MongoDB database. The name of the module is [bth-mongodb-crud](https://www.npmjs.com/package/bth-mongodb-crud). The module simplifies setting up a connection and it returns an object that I can use to handle the basic CRUD functions. In this project I use it for handling the results of the previous games played.

As a package-manager, Npm works great. Npm does not work fast, however, it does the job well. It's a great way to manage your application and its dependencies. Also when you are working with your own module, then it's very easy to keep all the applications updated when an update is released to Npm.

# Docker

As a last step in my CI-Chain, I added Docker Cloud. Once a commit has been validated and passed the building inspection, then Docker starts building the image. By doing this I delegate the building time to a separate service that automatically builds any new release.

I use this image to run my application on my production-server. This happens to be a great way for me to launch my application. I had some problems prior with a service provider that cancelled my Npm install script due to that it took too long to run. By pulling down the latest image from Docker Cloud, I get a fully functional container running the latest version of the application.

The benefit is that I'm confident that once my builds pass and Docker-image is built, the application will run. There are no hands in between the CI-Chain to production. Everything is fully automated.

Another benefit with a Docker-container is that when developing or running the application regardless of the users setup, it will still run in the same environment that it's built for.

Running multiple tests with different containers for different versions of Node, like in this case, ensures that the application works as intended for different versions by simply running one command.

In production, it's very convenient to have the application split up in multiple containers. It's very scalable and much easier to switch out parts for something else like the database. Containers also create a layer of protection on the server since it creates it's own environment that the application lives in and seperates it from the rest of the system.

[bth-ramver2-gomoku](https://store.docker.com/community/images/ptorn/bth-ramverk2-gomoku) on Docker Store.
[Dockerfile](https://github.com/ptorn/bth-ramverk2-gomoku/blob/master/docker/Dockerfile_node_latest) on GitHub.

To download the latest image from docker use this command with docker.

```bash
docker pull ptorn/bth-ramverk2-gomoku
```

# Article about React

I have written a article about React and show some example of how i have used it. The article talks briefly about React and why one would choose to use React.

If you are interested, you can read the whole article [here](React.md)

**Enjoy!**
