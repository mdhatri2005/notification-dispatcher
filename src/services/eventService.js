const db = require("../db/database");
const { addTask } = require("./queueWorker");
const { processNotification } = require("./notificationService");

function createEvent(event_type, recipient, data, callback) {

    const payload = JSON.stringify(data);

    db.run(
        "INSERT INTO events (event_type, payload) VALUES (?, ?)",
        [event_type, payload],
        function (err) {

            if (err) return callback(err);

            const event_id = this.lastID;

            db.run(
                "INSERT INTO notifications (event_id, recipient, channel, status) VALUES (?, ?, ?, ?)",
                [event_id, recipient, "email", "pending"],
                function (err) {

                    if (err) return callback(err);

                    const notification_id = this.lastID;

                    // Push to queue
                    addTask((done) => {
                        processNotification(
                            { notification_id },
                            done
                        );
                    });

                    callback(null, {
                        tracking_id: event_id,
                        notification_id,
                        status: "pending"
                    });

                }
            );
        }
    );
}

module.exports = { createEvent };