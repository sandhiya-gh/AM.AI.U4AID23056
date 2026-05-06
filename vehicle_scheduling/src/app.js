const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const vehicleRoutes = require("./routes/vehicleRoutes");

app.use("/api", vehicleRoutes);

module.exports = app;