import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:3001/api/notifications")
      .then((res) => {

        setNotifications(res.data.notifications || []);

      })
      .catch((err) => {

        console.log(err);

      });

  }, []);

  return (
    <div style={{ padding: "20px" }}>

      <h1>Priority Notifications</h1>

      {notifications.map((item, index) => (

        <div
          key={index}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >

          <h3>{item.Type}</h3>

          <p>{item.Message}</p>

          <small>{item.Timestamp}</small>

        </div>

      ))}

    </div>
  );
}

export default App;