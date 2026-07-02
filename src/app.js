const express = require("express");

const app = express();

app.use(express.json());

// Handle invalid JSON
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({
            error: "Invalid JSON payload"
        });
    }
    next();
});

const eventRoutes = require("./routes/eventRoutes");

app.use("/api/v1", eventRoutes);

module.exports = app;