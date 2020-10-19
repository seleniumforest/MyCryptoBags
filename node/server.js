const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3001;
const CoinGecko = require('coingecko-api');
const NodeCache = require('node-cache');

const GeckoCache = new NodeCache({ checkperiod: process.env.COINGECKO_CACHE_TIMEOUT || 60 });
const CoinGeckoClient = new CoinGecko();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/coins/all', async (req, res) => {
    let key = '/api/coins/all';
    var cached = GeckoCache.get(key);

    if (cached != null)
        return res.json(cached);

    var coins = await CoinGeckoClient.coins.all();
    GeckoCache.set(key, coins.data);
    return res.json(coins.data);
});

app.listen(PORT, function () {
    console.log("Node Server running on PORT:" + PORT);
});