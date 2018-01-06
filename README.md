[![Build Status](https://travis-ci.org/ptorn/bth-ramverk2-gomoku.svg?branch=master)](https://travis-ci.org/ptorn/bth-ramverk2-gomoku)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/badges/build.png?b=master)](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/build-status/master)
[![Code Coverage](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/ptorn/bth-ramverk2-gomoku/?branch=master)
[![codecov](https://codecov.io/gh/ptorn/bth-ramverk2-gomoku/branch/master/graph/badge.svg)](https://codecov.io/gh/ptorn/bth-ramverk2-gomoku)

BTH-Ramverk2-Gomoku
=====================

## Specifikation
This is my version of the classic game called Gomoku. The goal of the game is to get five tokens in a row. Gomoku is played by two players that has theire own token. Player one has "X" and player two has "0". Player one start and after that the players alternate placing a token on the board. Upon entry of the webpage the user will have to login by choosing a nickname to represent that user. The nickname must be uniqe and can not be blank. Many users can login and enter the room. In the room all the users inside can talk to each other in real time using the chat feature. To be able to play a user must claim a seat at the table to be able to play. If a player leaves the table in the middle of a game then the opponent will winn. After a player winns then the result will be added to the database and presented in the client by showing the last five games played.

### Client
The client is built 
The specifikation for this application is to build a Gomoku game with a live chat that uses websockets for the live features of the game such as the gameplay and the chat.
Using Express.js, React, MongoDB, LESS and websockets as the main base for the application. With the use of MongoDB I will store the last games played to display inside the game. The history of the played games will display who wonn and who lost.

Express.js will be used for backend and serving the application to the internet. WebSockets is used for communicating the live data to all the clients connected to the game. Every client will recieve updates from the Express server after they have logged in with a nickname. 
For the client I chose to use React. React feels like a perfekt match to handle the state changes of the game in a efficent matter without reloading the entire DOM everytime. React keeps track on state changes and upon changes it will re-render the view. This works perfektly for a application like this that uses live features of the game and the chat to keep the views up-to-date with latest data from the server.

For the gameplay two users will claim a seat at the table to be able to play. Other users in the room will be able to send chat messages and watch the game as the two players battle it out on the board.

## Installation

1. First clone the repo.
`git clone https://github.com/ptorn/bth-ramverk2-gomoku.git`

2. After that install the dependencies for server and client.
`cd bth-ramverk2-gomoku`
`npm install`

3. Now its time to start it.
`npm start`

That's it now you are all set.

**Enjoy!**
