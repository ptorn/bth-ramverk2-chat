[![Build Status](https://travis-ci.org/ptorn/bth-ramverk2-gomoku.svg?branch=master)](https://travis-ci.org/ptorn/bth-ramverk2-gomoku)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/badges/build.png?b=master)](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/build-status/master)
[![Code Coverage](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/?branch=master)
[![codecov](https://codecov.io/gh/ptorn/bth-ramverk2-gomoku/branch/master/graph/badge.svg)](https://codecov.io/gh/ptorn/bth-ramverk2-gomoku)

BTH-Ramverk2-Gomoku
=====================

This application is a final project for the course Framework2 at [BTH](https://www.bth.se/eng/).

## Specification
This is my version of the game [Gomoku](https://en.wikipedia.org/wiki/Gomoku). The goal of the game is to get five tokens in a row. Gomoku is played by two players. Each player has their own token. Player one has "X" and player two has "0". Player one start by placing the token on the board. After that the players take turns placing theire tokens on the board. Upon entry of the webpage the user will have to login by choosing a nickname to represent that user. The nickname must be uniqe and can not be blank. Many users can login and enter the room at the same time. Once inside all the logged in users can talk to eachother in realtime using the chat client on the page. To be able to play a user must claim a seat at the table. If a player leaves the table in the middle of a game then the opponent will winn that round and the data will be stored in the database. Inside the room you can see the result of the last five rounds where the winner and looser is displayed. The project is built using JavaScript, HTML, LESS.

* Express.js
* React
* WebSockets
* Realtime feature
* CI-Chain


#### React - Client
[React](https://reactjs.org/) is a JavaScript framework that I used for managing the views of my client using JSX. JSX is a syntax extension to JavaScript which we use to write the views. React uses something called components which lets us re-use the code over and over. A component can have its own state or just inherit properties from the parent component that has a state. By using a components state React can keep track on what data is beeing updated and then only rerender that specifik DOM-object instead of reloading the entire page. Components that inherit their properties from the parent component with a state will be re-rendered by update of data. This makes React a great choice for working on a SPA (single-page-application). That is perfekt for this application since this is a game that is using websockets to transfer data realtime and alot of the data on the page remains the same. So when React notice that the data has changed in the state of the component it re-renders the component. A example would be placing a token on the table. Instead of reloading the entire page and make unnessesary calls to the server it just recieves data from the websocket and update the components state. The rest is React magic.

#### Express - Backend
The backend is built on the Express.js framework that holds the game logic and also serves the client as a webserver. [Express.js](https://expressjs.com/) is a framework for [Node.js](https://nodejs.org/en/). Express.js handels all the game logic, serves the client as a webserver and also a WebSocket-server. 


### Limitations


### Client
The clients GUI(graphical user interface) is built with [React](https://reactjs.org/) which is a Javascript framework. The client 

Express.js will be used for backend and serving the application to the internet. WebSockets is used for communicating the live data to all the clients connected to the game. Every client will recieve updates from the Express server after they have logged in with a nickname. 
For the client I chose to use React. React feels like a perfekt match to handle the state changes of the game in a efficent matter without reloading the entire DOM everytime. React keeps track on state changes and upon changes it will re-render the view. This works perfektly for a application like this that uses live features of the game and the chat to keep the views up-to-date with latest data from the server.

For the gameplay two users will claim a seat at the table to be able to play. Other users in the room will be able to send chat messages and watch the game as the two players battle it out on the board.
___
## Installation

1. First clone the repo.
`git clone https://github.com/ptorn/bth-ramverk2-gomoku.git`

2. After that install the dependencies for server and client.
`cd bth-ramverk2-gomoku`
`npm install`

3. Now its time to start it.
`npm start`

That's it now you are all set.


## Testing

## CI-Chain

## Realtime

## Database

## Npm-module

## Docker
**Enjoy!**
