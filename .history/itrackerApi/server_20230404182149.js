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

// userid message and chatId

// io.use((socket, next) => {
// 	const sessionID = socket.handshake.auth.sessionID;
// 	socket.join(socket.userID);
// 	if (sessionID) {
// 		// find existing session
// 		const session = sessionStore.findSession(sessionID);
// 		if (session) {
// 			socket.sessionID = sessionID;
// 			socket.userID = session.userID;
// 			socket.username = session.username;
// 			return next();
// 		}
// 	}
// 	const username = socket.handshake.auth.username;
// 	if (!username) {
// 		return next(new Error("invalid username"));
// 	}
// 	// create new session
// 	socket.sessionID = "45678";
// 	socket.userID = "1234";
// 	socket.username = username;

// 	socket.emit("session", {
// 		sessionID: socket.sessionID,
// 		userID: socket.userID,
// 	});

// 	socket.on("private message", ({ content, to }) => {
// 		socket.to(to).to(socket.userID).emit("private message", {
// 			content,
// 			from: socket.userID,
// 			to,
// 		});
// 	});

// 	socket.on("disconnect", async () => {
// 		// const matchingSockets = await io.in(socket.userID).allSockets();
// 		// const isDisconnected = matchingSockets.size === 0;
// 		// if (isDisconnected) {
// 		// 	// notify other users
// 		// 	socket.broadcast.emit("user disconnected", socket.userID);
// 		// 	// update the connection status of the session
// 		// 	sessionStore.saveSession(socket.sessionID, {
// 		// 		userID: socket.userID,
// 		// 		username: socket.username,
// 		// 		connected: false,
// 		// 	});
// 		// }
// 	});

// 	//persist message with db
// 	//   socket.on("private message", ({ content, to }) => {
// 	//     const message = {
// 	//       content,
// 	//       from: socket.userID,
// 	//       to,
// 	//     };
// 	//     socket.to(to).to(socket.userID).emit("private message", message);
// 	//     messageStore.saveMessage(message);
// 	//   });

// 	//retrieve previous messages
// 	//       const users = [];
// 	//   const messagesPerUser = new Map();
// 	//   messageStore.findMessagesForUser(socket.userID).forEach((message) => {
// 	//     const { from, to } = message;
// 	//     const otherUser = socket.userID === from ? to : from;
// 	//     if (messagesPerUser.has(otherUser)) {
// 	//       messagesPerUser.get(otherUser).push(message);
// 	//     } else {
// 	//       messagesPerUser.set(otherUser, [message]);
// 	//     }
// 	//   });

// 	//   sessionStore.findAllSessions().forEach((session) => {
// 	//     users.push({
// 	//       userID: session.userID,
// 	//       username: session.username,
// 	//       connected: session.connected,
// 	//       messages: messagesPerUser.get(session.userID) || [],
// 	//     });
// 	//   });
// 	//   socket.emit("users", users);
// 	next();
// });

io.on("connection", (socket) => {
	// ...

	socket.on("join_room", (data) => {
		socket.join(data);
		console.log(`user with id : ${socket.id} joined the room : ${data}`);
	});

	socket.on("private_message", (data) => {
		console.log(data);
	});
	// ...

	socket.on("send_message", (data) => {
		socket.to(data.room).emit("receive_message", data);
	});
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
