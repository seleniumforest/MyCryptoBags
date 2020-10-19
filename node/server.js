const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3001;
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var cache = null;

app.get('/api/ping', async (req, res) => {
    if (cache != null)
        return res.json(cache);

    var data = await CoinGeckoClient.ping();
    cache = data;
    return res.json(cache);
});

app.listen(PORT, function() {
    console.log("Node Server running on PORT:" + PORT);
});