const db = require("../db/database");

function processNotification(notification, done) {
    const delay = Math.floor(Math.random() * 500) + 500; // 500-1000ms

    setTimeout(() => {
        const failed = Math.random() < 0.1; // 10% failure

        if (failed) {
            db.run(
                `UPDATE notifications
                 SET status=?, retry_count=retry_count+1, updated_at=CURRENT_TIMESTAMP
                 WHERE id=?`,
                ["failed", notification.notification_id],
                (err) => {
                    if (err) console.error(err);
                    console.log(`Notification ${notification.notification_id} failed`);
                    done();
                }
            );
        } else {
            db.run(
                `UPDATE notifications
                 SET status=?, updated_at=CURRENT_TIMESTAMP
                 WHERE id=?`,
                ["completed", notification.notification_id],
                (err) => {
                    if (err) console.error(err);
                    console.log(`Notification ${notification.notification_id} completed`);
                    done();
                }
            );
        }
    }, delay);
}

module.exports = { processNotification };