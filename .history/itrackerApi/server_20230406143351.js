import app from "./app";

import http from "http";
import { Server } from "socket.io";

const port = process.env.PORT || 3001;

const server = http.createServer(app);

const io = new Server(server, {
	pingTimeout: 60000,
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	// ...

	socket.on("setup", (userId) => {
		socket.join(userId);
		socket.emit("connected");
	});

	socket.on("join_chat", (chatId) => {
		socket.join(chatId);
		console.log(`user joined chat with Id: ${chatId}`);
	});

	socket.on("new_message", ({ message, chatId, userId, time }) => {
		// if (!chat.users) return console.log("chat.users not found");

		socket.to(chatId).emit("private_message", { message, from: userId, time });
	});

	socket.on("typing", (room) => socket.in(room).emit("typing"));
	socket.on("stop_typing", (room) => socket.in(room).emit("stop typing"));
	// ...

	socket.off("setup", (userData) => {
		console.log("USER DISCONNECTED");
		socket.leave(userData.id);
	});
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
