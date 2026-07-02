# Event-Driven Notification Dispatcher

## Project Overview

This project is a lightweight asynchronous notification system built using **Node.js**, **Express.js**, and **SQLite**. It accepts business events through a REST API, stores them in a SQLite database, creates notification tasks, pushes them into an in-memory queue, and processes them asynchronously in the background.

---

## Tech Stack

- Node.js
- Express.js
- SQLite
- Native JavaScript In-Memory Queue

---

## Project Structure

```
notification-dispatcher/
│
├── src/
│   ├── app.js
│   ├── server.js
│   ├── controllers/
│   ├── services/
│   ├── db/
│   └── routes/
│
├── architecture-diagram.png
├── package.json
├── README.md
└── .env.example
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd notification-dispatcher
```

Install dependencies:

```bash
npm install
```

---

## Environment Setup

Create a `.env` file using `.env.example`

```
PORT=3000
```

---

## Running the Application

Start the server:

```bash
npm run dev
```

The server will run at:

```
http://localhost:3000
```

---

## Database

SQLite automatically creates the following tables:

- events
- notifications

Database file:

```
notification.db
```

---

## API Endpoint

### POST /api/v1/events

### Sample Request

```json
{
  "event_type": "order_placed",
  "recipient": "user@example.com",
  "data": {
    "order_id": 101
  }
}
```

### Sample Response

```json
{
  "message": "Event accepted for processing",
  "tracking_id": 1,
  "notification_id": 1,
  "status": "pending"
}
```

HTTP Status:

```
202 Accepted
```

---

## Queue Workflow

1. Client sends an event request.
2. Event is stored in the **events** table.
3. Notification is created with **pending** status.
4. Notification task is pushed into the in-memory queue.
5. API immediately returns **202 Accepted**.
6. Background worker processes the queue.
7. Notification sending is simulated using a delay of **500–1000 ms**.
8. Notification status is updated to **completed** or **failed**.

---

## Error Handling

The application handles:

- Missing event_type
- Missing recipient
- Invalid JSON payload
- Database insert failures
- Queue processing failures
- Notification update failures

---

## Assumptions and Limitations

- Uses an in-memory queue (tasks are lost if the server restarts).
- Default notification channel is **email**.
- Notification delay is simulated between **500 ms and 1000 ms**.
- Failure rate is simulated at **10%**.
- SQLite is used as the database.

---

## Architecture

Refer to:

```
architecture-diagram.png
```