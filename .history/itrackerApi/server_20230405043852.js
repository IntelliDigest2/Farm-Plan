const app = require("./app");

const http = require("http");
const { Server } = require("socket.io");

const port = process.env.PORT || 3001;

const server = http.createServer(app);
// const server = app.listen(port, () => {
// 	console.log(`app running on ${port}`);
// });

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

// io.use((socket, next) => {
// 	const sessionID = socket.handshake.auth.sessionID;
// 	if (sessionID) {
// 		// find existing session
// 		// const session = sessionStore.findSession(sessionID);
// 		// if (session) {
// 		// 	socket.sessionID = sessionID;
// 		// 	socket.userID = session.userID;
// 		// 	socket.username = session.username;
// 		// 	return next();
// 		// }
// 	}
// 	const username = socket.handshake.auth.username;

// 	// create new session
// 	socket.sessionID = randomId();
// 	socket.userID = randomId();
// 	socket.username = username;
// 	next();
// });

io.on("connection", (socket) => {
	// ...

	socket.join(socket.userID);
	socket.emit("session", {
		sessionID: socket.sessionID,
		userId: socket.userID,
	});

	//the  room is supposed to be the userId and the other userId together so here we use user1_user2
	socket.on("join_room", (roomName) => {
		socket.join(roomName);
		console.log(`user with id : ${socket.id} joined the room : ${roomName}`);
	});

	socket.on("private_message", ({ message, room, to, time }) => {
		console.log(data);
		socket
			.to(data.room)
			.to(socket.userID)
			.emit("private_message", { data, from: socket.userID, to: data.room });
	});
	// ...
});

// io.on();

server.listen(port, () => {
	console.log(`listening at port ${port}`);
});

// io.on("connection", (socket) => {
// 	socket.on("private_message", (anotherSocketId, msg) => {
// 		socket.to(anotherSocketId).emit("private message", socket.id, msg);
// 	});
// });

process.on("unhandledRejection", (err) => {
	console.log("UNHANDLED REJECTION! Shutting down...");
	console.log(err.name, err.message);

	//close the server
	server.close(() => {
		//close the app if the error is detected
		//0 stands for success 1 stands for uncalled exceptions
		process.exit(1);
	});
});
