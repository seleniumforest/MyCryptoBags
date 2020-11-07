const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3001;
const coinRouter = require('./controllers/Coins');
const bagsRouter = require('./controllers/Bags');

app.use(bodyParser.json());

app.use("/api/coins", coinRouter);
app.use("/api/bags", bagsRouter);

app.listen(PORT, () => console.log("Node Server running on PORT:" + PORT));
