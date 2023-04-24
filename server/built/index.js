"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const PORT = 4000;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
}));
io.on("connection", (socket) => {
    console.log(`${socket.id} user connected`);
    socket.on("message", (data) => {
        io.emit("response", data);
    });
    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnect`);
    });
});
server.listen(PORT, () => {
    console.log(`server working on port ${PORT}`);
});
