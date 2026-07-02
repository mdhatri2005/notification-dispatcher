# Event-Driven Notification Dispatcher

## Project Overview

A lightweight asynchronous notification system built using Node.js, Express.js, and SQLite.

## Tech Stack

- Node.js
- Express.js
- SQLite
- Native In-Memory Queue

## Installation

npm install

## Run

npm run dev

## API

POST /api/v1/events

Sample Request

{
  "event_type": "order_placed",
  "recipient": "user@example.com",
  "data": {
    "order_id":101
  }
}

Sample Response

{
  "message":"Event accepted for processing",
  "tracking_id":1,
  "notification_id":1,
  "status":"pending"
}

## Queue

The notification is pushed into an in-memory queue.
The API immediately returns HTTP 202.
The background worker processes notifications asynchronously.

## Assumptions

- Queue is in-memory.
- Default notification channel is email.
- Notification delay is 500–1000 ms.
- Failure rate is simulated at 10%.