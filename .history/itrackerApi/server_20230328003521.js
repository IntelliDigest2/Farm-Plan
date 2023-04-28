const app = require("./app");

const port = process.env.PORT;

const server = app.listen(port || 8080, () => {
	console.log(`app running on ${port}`);
});

const io = require("socket.io")(server);
io.on("connection", (socket) => {
	// ...
});

io.on("connection", (socket) => {
	socket.on("private message", (anotherSocketId, msg) => {
		socket.to(anotherSocketId).emit("private message", socket.id, msg);
	});
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
