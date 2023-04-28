const app = require("./app");

const http = require("http");
const { Server } = require("socket.io");

const port = process.env.PORT || 3001;

const server = http.createServer(app);
// const server = app.listen(port, () => {
// 	console.log(`app running on ${port}`);
// });

const io = new Server(server);

// const io = require("socket.io")(server);

io.on("connection", (socket) => {
	// ...
	console.log(socket.id);
});

server.listen(port, () => {
	console.log(`listening at port ${port}`);
});

// io.on("connection", (socket) => {
// 	socket.on("private message", (anotherSocketId, msg) => {
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
