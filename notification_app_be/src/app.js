const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const notificationRoutes = require("./routes/notificationRoutes");

app.use("/api", notificationRoutes);

module.exports = app;