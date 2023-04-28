const app = require("./app");

const http = require("http");
const { Server } = require("socket.io");

const port = process.env.PORT || 3001;

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	// ...

	socket.on("setup", (userData) => {
		socket.join(socket.userID);
	});

	socket.on("join_room", (roomName) => {
		socket.join(roomName);
		console.log(`user with id : ${socket.id} joined the room : ${roomName}`);
	});

	socket.on("new_message", ({ message, chatId, userId, time }) => {
		// if (!chat.users) return console.log("chat.users not found");

		socket.to(chatId).emit("private_message", { message, from: userId, time });
	});

	socket.on("typing", (room) => socket.in(room).emit("typing"));
	socket.on("stop_typing", (room) => socket.in(room).emit("stop typing"));
	// ...
});

server.listen(port, () => {
	console.log(`listening at port ${port}`);
});

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
