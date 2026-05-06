const express = require("express");
const axios = require("axios");

const router = express.Router();

const Log = require("../../../logging_middleware/logger");

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbS5haS51NGFpZDIzMDU2QGFtLnN0dWRlbnRzLmFtcml0YS5lZHUiLCJleHAiOjE3NzgwNjQ5MDUsImlhdCI6MTc3ODA2NDAwNSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjI2NGYwMGFmLTBhMTAtNGFhNC04NmQ3LTFmNzdjNDdiYWJhNSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNhbmRoaXlhIGtlbm5lZHkiLCJzdWIiOiI2YTY5NmE0Ni1mZDRiLTQ3MmMtODVhOC1mYTY5ODMxMTk1ZGYifSwiZW1haWwiOiJhbS5haS51NGFpZDIzMDU2QGFtLnN0dWRlbnRzLmFtcml0YS5lZHUiLCJuYW1lIjoic2FuZGhpeWEga2VubmVkeSIsInJvbGxObyI6ImFtLmFpLnU0YWlkMjMwNTYiLCJhY2Nlc3NDb2RlIjoiUFRCTW1RIiwiY2xpZW50SUQiOiI2YTY5NmE0Ni1mZDRiLTQ3MmMtODVhOC1mYTY5ODMxMTk1ZGYiLCJjbGllbnRTZWNyZXQiOiJ0bm50ZkZxdFpFR1lwbVNLIn0.5Doaw5q79yZ2dG1DW1DAVfPYN1_o7aaATqzcArfCKUQ";
router.get("/schedule", async (req, res) => {
  try {
    await Log("schedule api called");

    const depotResponse = await axios.get(
      "http://20.207.122.201/evaluation-service/depots",
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    const vehicleResponse = await axios.get(
      "http://20.207.122.201/evaluation-service/vehicles",
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    console.log(depotResponse.data);
    console.log(vehicleResponse.data);

    const depots = depotResponse.data.depots;
    const vehicles = vehicleResponse.data.vehicles;

    const totalHours = depots[0].MechanicHours;

    vehicles.sort((a, b) => {
      return (b.Impact / b.Duration) - (a.Impact / a.Duration);
    });

    let selected = [];
    let usedHours = 0;
    let totalImpact = 0;

    for (let vehicle of vehicles) {
      if (usedHours + vehicle.Duration <= totalHours) {
        selected.push(vehicle);

        usedHours += vehicle.Duration;
        totalImpact += vehicle.Impact;
      }
    }

    await Log("schedule generated");

    res.json({
      totalHours,
      usedHours,
      totalImpact,
      scheduledVehicles: selected,
    });

  } catch (err) {
    console.log("Schedule Error:", err.response?.data || err.message);

    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;


