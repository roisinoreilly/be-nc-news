const express = require("express");
const { getTopics } = require("./controllers/topics.controller");
const { handleCustomErrors } = require("./errors");
const app = express();

app.get("/api/topics", getTopics);

app.all("*", (req, res) => {
    res.status(404).send({ status: 404, msg: "Path not found"});
})
app.use(handleCustomErrors)

module.exports = app;