//temporary backend for testing due to cors issues with a local website
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const port = 3000;

server.listen(port, () => {
    console.log(`Running on port ${port}`);
});

app.use(express.static("../converter"));