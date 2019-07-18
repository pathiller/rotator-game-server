const WebSocket = require('ws');
const uuidv4 = require('uuid/v4')
const url = require('url');
const { Users } = require('../lib/users');
const users = new Users();
const { Game } = require('../lib/game');
const game = new Game(users);

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws, req) => {
	const queryData = url.parse(req.url, true).query;
	ws.id = uuidv4();
	ws.username = queryData.username;
	game.registerUser(ws);
	ws.on('message', data => {
		if (JSON.parse(data).clientMessage == "solved") {
			game.puzzleSolved(ws);
		}
	})
	ws.on('close', () => {
		game.unregisterUser(ws.id);
	})
})

setInterval(()=>{
	game.users.all().forEach(user => {
		user.send(JSON.stringify({messageType: "info", connectedUsers: game.users.all().length}))
	})
},3000);

