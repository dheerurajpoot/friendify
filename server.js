import http from "http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
	const httpServer = http.createServer(handler);

	const io = new Server(httpServer);

	io.on("connection", (socket) => {
		console.log("A user connected");

		// Handle chat messages
		socket.on("chat message", (message) => {
			console.log("server msg:", message);
			io.emit("chat message", message); // Broadcast the message to all connected clients
		});

		socket.on("disconnect", () => {
			console.log("A user disconnected");
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
