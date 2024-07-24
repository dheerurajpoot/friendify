import http from "http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
	const httpServer = http.createServer(handler);

	const io = new Server(httpServer);

	let activeUsers = [];
	io.on("connection", (socket) => {
		// Handle chat messages
		socket.on("chat message", (message) => {
			io.emit("chat message", message);
		});

		// handle user status
		socket.on("online users", (userId) => {
			if (!activeUsers.includes(userId)) {
				activeUsers.push(userId);
			}
			io.emit("online users", activeUsers);
		});

		socket.on("offline", (userId) => {
			activeUsers = activeUsers.filter((user) => user !== userId);
			io.emit("online users", activeUsers);
		});

		socket.on("disconnect", () => {
			// console.log("disconnected");
		});
	});

	httpServer
		.once("error", (err) => {
			console.error(err);
			process.exit(1);
		})
		.listen(port, () => {
			console.log(`> Ready on http://${hostname}:${port}`);
		});
});
