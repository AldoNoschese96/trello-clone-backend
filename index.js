//Env
require("dotenv").config();
const cors = require("cors");

//Init
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
//DB
const mongoose = require("mongoose");
const mongooseConnector = require("./database/database");

//Middlware
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//Models
const User = require("./database/models/User");
const List = require("./database/models/List");
const Board = require("./database/models/Board");

// Routes
const users = require("./routes/users.route");
const lists = require("./routes/lists.route");
const boards = require("./routes/boards.route");
const cards = require("./routes/cards.route");

app.use("/api/users", users);
app.use("/api/boards", boards);
app.use("/api/lists", lists);
app.use("/api/cards", cards);

// ----------- Test Route ------------
app.get("/test", (req, res) => {
  res.send("Is Working");
});

app.listen(PORT, () => {
  console.log(`Server Listening`);
});
