import mongoose from "mongoose";

import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3001;

const server = http.createServer(app);

console.log(process.env.DATABASE_CLOUD);

mongoose
	.connect(process.env.DATABASE_CLOUD, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("---------------------------------");
		console.log("                                  ");
		console.log(" database connected");
	})
	.catch((err) => {
		console.log(err);
	});

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

		console.log("the id of the user that join is " + userId);
	});

	socket.on("join_chat", (chatId) => {
		socket.join(chatId);
		console.log(`user joined chat with Id: ${chatId}`);
	});

	socket.on("new_message", (newMessageReceived) => {
		let usersInfo = newMessageReceived.usersInfo;

		if (!newMessageReceived.usersInfo) return console.log("users not found");

		usersInfo.users.forEach((user) => {
			if (user === newMessageReceived.senderId) return;

			socket
				.to(newMessageReceived.senderId)
				.emit("private_message", { newMessage, from: user });
		});
	});

	socket.on("typing", (room) => socket.to(room).emit("typing"));

	socket.on("stop_typing", (room) => socket.to(room).emit("stop typing"));
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
