const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "notification_system",
  password: "300805",
  port: 5432,
});

module.exports = pool;