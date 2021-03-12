const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.NODE_PORT;
const coinRouter = require('./controllers/Coins');

app.use(bodyParser.json());

app.use("/api/coins", coinRouter);

app.listen(port, () => console.log("Node Server running on PORT:" + port));
