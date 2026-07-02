const { createEvent } = require("../services/eventService");

exports.createEvent = (req, res) => {

    const { event_type, recipient, data } = req.body;

    if (!event_type || !recipient) {
        return res.status(400).json({
            error: "event_type and recipient are required"
        });
    }

    createEvent(event_type, recipient, data, (err, result) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                error: "Internal server error"
            });
        }

        res.status(202).json({
            message: "Event accepted for processing",
            tracking_id: result.tracking_id,
            notification_id: result.notification_id,
            status: result.status
        });

    });

};