const express = require("express");
const axios = require("axios");

const router = express.Router();

const Log = require("../../../logging_middleware/logger");

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbS5haS51NGFpZDIzMDU2QGFtLnN0dWRlbnRzLmFtcml0YS5lZHUiLCJleHAiOjE3NzgwNjQ5MDUsImlhdCI6MTc3ODA2NDAwNSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjI2NGYwMGFmLTBhMTAtNGFhNC04NmQ3LTFmNzdjNDdiYWJhNSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNhbmRoaXlhIGtlbm5lZHkiLCJzdWIiOiI2YTY5NmE0Ni1mZDRiLTQ3MmMtODVhOC1mYTY5ODMxMTk1ZGYifSwiZW1haWwiOiJhbS5haS51NGFpZDIzMDU2QGFtLnN0dWRlbnRzLmFtcml0YS5lZHUiLCJuYW1lIjoic2FuZGhpeWEga2VubmVkeSIsInJvbGxObyI6ImFtLmFpLnU0YWlkMjMwNTYiLCJhY2Nlc3NDb2RlIjoiUFRCTW1RIiwiY2xpZW50SUQiOiI2YTY5NmE0Ni1mZDRiLTQ3MmMtODVhOC1mYTY5ODMxMTk1ZGYiLCJjbGllbnRTZWNyZXQiOiJ0bm50ZkZxdFpFR1lwbVNLIn0.5Doaw5q79yZ2dG1DW1DAVfPYN1_o7aaATqzcArfCKUQ";
router.get("/notifications", async (req, res) => {
  try {

    await Log("notification api called");

    const response = await axios.get(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const notifications = response.data.notifications || [];

    const priorityMap = {
      Placement: 3,
      Event: 2,
      Result: 1,
    };

    notifications.sort((a, b) => {

      const priorityA = priorityMap[a.Type] || 0;
      const priorityB = priorityMap[b.Type] || 0;

      if (priorityB !== priorityA) {
        return priorityB - priorityA;
      }

      return new Date(b.Timestamp) - new Date(a.Timestamp);

    });

    const topNotifications = notifications.slice(0, 15);

    await Log("notifications fetched successfully");

    res.status(200).json({
      totalNotifications: topNotifications.length,
      notifications: topNotifications,
    });

  } catch (err) {

    console.log("NOTIFICATION ERROR:");
    console.log(err.response?.data || err.message);

    await Log(`notification api failed: ${err.message}`)
      .catch(() => {});

    res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
});

module.exports = router;

