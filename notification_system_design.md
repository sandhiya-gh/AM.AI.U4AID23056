# Notification System Design

## Affordmed Campus Hiring Evaluation

Author: Sandhiya Kennedy  
Roll Number: AM.AI.U4AID23056

---

# Stage 1 — REST API Design

## Vehicle Scheduling API

### Endpoint

```http
GET /api/schedule
````

### Purpose

This API fetches depot and vehicle information from the evaluation service and generates an optimized vehicle maintenance schedule based on:

* Available mechanic hours
* Vehicle impact score
* Vehicle duration

### Approach Used

A greedy scheduling algorithm was implemented.

Vehicles are sorted based on:

```text
Impact / Duration
```

Vehicles with higher efficiency are selected first while ensuring the total mechanic hours are not exceeded.

### Features

* REST API using Express.js
* Axios API integration
* Logging middleware integration
* JSON response handling
* Error handling

---

# Notification API

### Endpoint

```http
GET /api/notifications
```

### Purpose

Fetches notifications from the evaluation service and prioritizes important notifications for students.

### Priority Order

1. Placement
2. Event
3. Result

### Features

* Notification prioritization
* Timestamp-based sorting
* Top 15 notification filtering
* Logging middleware integration

---

# Logging Middleware

A centralized reusable logging middleware was implemented.

### Purpose

* Track API calls
* Monitor success and errors
* Maintain centralized logs

### Logging API Used

```http
POST /evaluation-service/logs
```

### Logging Details

The middleware sends:

* stack
* level
* package
* message

to the evaluation logging service.

---

# Stage 2 — Database Selection

## Preferred Database

PostgreSQL was selected because:

* Strong relational support
* ACID compliance
* Efficient indexing
* Better query optimization
* Scalability support

### Why Relational Database?

Notifications contain structured data such as:

* Student ID
* Notification Type
* Message
* Timestamp
* Read Status

These are suitable for relational storage.

---

# Stage 3 — Query Optimization

## Existing Query

```sql
SELECT * FROM notifications
WHERE studentID = 1042
AND isRead = false
ORDER BY createdAt DESC;
```

## Problems

As the system scales to:

* 50,000 students
* 5,000,000 notifications

the query becomes slow because:

* Full table scans may occur
* Sorting becomes expensive
* Unnecessary columns are fetched

---

# Optimization Techniques

## 1. Composite Indexing

```sql
CREATE INDEX idx_notifications_student_read_created
ON notifications(studentID, isRead, createdAt DESC);
```

### Benefit

* Faster filtering
* Faster sorting
* Reduced query execution time

---

## 2. Avoid SELECT *

Instead of:

```sql
SELECT *
```

Use:

```sql
SELECT id, type, message, createdAt
```

### Benefit

* Reduced memory usage
* Reduced network transfer
* Faster responses

---

## 3. Pagination

```sql
LIMIT 20 OFFSET 0;
```

### Benefit

* Faster loading
* Better frontend performance
* Reduced server load

---

## 4. Redis Caching

Frequently accessed unread notifications can be stored in Redis.

### Benefit

* Reduced database load
* Faster retrieval
* Better scalability

---

## 5. Notification Archiving

Older notifications can be moved into archive tables.

### Benefit

* Smaller active tables
* Faster indexing
* Better performance

---

# Optimized Query

```sql
SELECT id, type, message, createdAt
FROM notifications
WHERE studentID = 1042
AND isRead = false
ORDER BY createdAt DESC
LIMIT 20;
```

---

# Stage 4 — Notification Overload Solution

## Problem

During placement season, students receive a large number of notifications, causing information overload.

## Proposed Solution

### Priority-Based Notification Ranking

Notifications are prioritized based on type:

| Type      | Priority |
| --------- | -------- |
| Placement | High     |
| Event     | Medium   |
| Result    | Low      |

### Additional Improvements

* Group similar notifications
* Use category filters
* Provide unread-only view
* Show top important notifications first

### Benefit

Students can quickly view the most important notifications without being overwhelmed.

---

# Stage 5 — Notify All Optimization

## Problem

Sending notifications to 50,000 students simultaneously may overload the system.

## Proposed Improvements

### 1. Queue-Based Processing

Use message queues such as:

* RabbitMQ
* Kafka

Notifications are processed asynchronously.

### Benefit

* Prevents server crashes
* Improves scalability
* Handles traffic spikes efficiently

---

## 2. Batch Processing

Instead of sending one-by-one:

* Process notifications in batches
* Example: 1000 notifications per batch

### Benefit

* Lower database load
* Better throughput

---

## 3. Background Workers

Dedicated workers process notification jobs independently.

### Benefit

* Faster API response
* Better separation of responsibilities

---

## 4. Retry Mechanism

Failed notifications can be retried automatically.

### Benefit

* Improved reliability
* Reduced notification loss

---

# Stage 6 — Notification Prioritization

## Objective

Display the most important unread notifications at the top.

## Sorting Logic

Notifications are sorted using:

1. Notification Type Priority
2. Latest Timestamp

### Priority Mapping

```text
Placement > Event > Result
```

### Additional Features

* Top 15 notifications displayed
* Latest notifications shown first
* Priority-based filtering

---

# Technologies Used

## Backend

* Node.js
* Express.js
* Axios
* CORS
* dotenv

## Frontend

* React.js

## Database

* PostgreSQL
* pgAdmin 4

---

# Conclusion

The system was designed to:

* Support scalable notification handling
* Improve notification prioritization
* Optimize database performance
* Improve system reliability
* Handle large-scale concurrent users efficiently

The implemented architecture focuses on scalability, maintainability, and performance optimization.
<img width="940" height="588" alt="image" src="https://github.com/user-attachments/assets/21c34f0d-3277-4918-bfc6-614beee44a61" />
<img width="940" height="128" alt="image" src="https://github.com/user-attachments/assets/01a65000-28f4-4256-b1ef-8c241c6ab53e" />
<img width="940" height="588" alt="image" src="https://github.com/user-attachments/assets/b4511802-d0aa-40b2-97be-5fd24d96d557" />
<img width="940" height="158" alt="image" src="https://github.com/user-attachments/assets/58da247e-bca9-4919-8fd5-bf5fa125c397" />
<img width="940" height="137" alt="image" src="https://github.com/user-attachments/assets/d0a7bd61-af04-4c64-b8f6-05471bcaaea3" />
<img width="940" height="144" alt="image" src="https://github.com/user-attachments/assets/eae1ff86-75ed-4a6e-ab99-e6fae3dabee5" />


```
```
