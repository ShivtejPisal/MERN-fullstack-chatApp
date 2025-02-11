const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const userRouter = require("./routes/userRoutes");
const socketIo = require("./socket");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

//middleware
app.use(cors());
app.use(express.json());
//connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connect to DB"))
  .catch((err) => console.log("Mongodb connection failed", err));

//Initialize
socketIo(io);
//out routes
app.use("/api/users", userRouter);

//start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server is up and running on PORT ${PORT}`)
);
