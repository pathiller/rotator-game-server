# Rotator Game Server
Server proof of concept for AR campaign, where users are given a 3D object and a visual reference to 'the answer', which is the same object in a different rotation/orientation. Users try to match their object's orientation via controls on the client first before any other players. Once the timer runs out an intermission period begins before the next game starts.

This is one of two parts including the [client](https://github.com/pathiller/rotator-game-app), however it's still 'in progress'.  To simulate the client I've used [this extension](https://chrome.google.com/webstore/detail/websocket-test-client/fgponpodhbmadfljofbimhhlengambbn?hl=en), the server host just taking a username from the query string.
ws://localhost:8080/?username=your_name

You can also run the client as is and open the console to see the messaging and event formats.


#### run server
```sh
$ npm install
```
```sh
$ npm run start
```

# notes
- countdown time is given to the client as time left in milliseconds when the player enters the game



