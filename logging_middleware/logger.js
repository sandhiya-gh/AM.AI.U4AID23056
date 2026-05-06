const axios = require("axios");

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbS5haS51NGFpZDIzMDU2QGFtLnN0dWRlbnRzLmFtcml0YS5lZHUiLCJleHAiOjE3NzgwNjQ5MDUsImlhdCI6MTc3ODA2NDAwNSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjI2NGYwMGFmLTBhMTAtNGFhNC04NmQ3LTFmNzdjNDdiYWJhNSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNhbmRoaXlhIGtlbm5lZHkiLCJzdWIiOiI2YTY5NmE0Ni1mZDRiLTQ3MmMtODVhOC1mYTY5ODMxMTk1ZGYifSwiZW1haWwiOiJhbS5haS51NGFpZDIzMDU2QGFtLnN0dWRlbnRzLmFtcml0YS5lZHUiLCJuYW1lIjoic2FuZGhpeWEga2VubmVkeSIsInJvbGxObyI6ImFtLmFpLnU0YWlkMjMwNTYiLCJhY2Nlc3NDb2RlIjoiUFRCTW1RIiwiY2xpZW50SUQiOiI2YTY5NmE0Ni1mZDRiLTQ3MmMtODVhOC1mYTY5ODMxMTk1ZGYiLCJjbGllbnRTZWNyZXQiOiJ0bm50ZkZxdFpFR1lwbVNLIn0.5Doaw5q79yZ2dG1DW1DAVfPYN1_o7aaATqzcArfCKUQ";

async function Log(message) {
  try {
    await axios.post(
      "http://20.207.122.201/evaluation-service/logs",
      {
        stack: "backend",
        level: "info",
        package: "handler",
        message: message,
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("LOG SUCCESS");
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
}

module.exports = Log;