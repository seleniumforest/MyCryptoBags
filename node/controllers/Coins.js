const express = require("express");
const CoinGecko = require('coingecko-api');
const NodeCache = require('node-cache');
const GeckoCache = new NodeCache({ checkperiod: process.env.COINGECKO_CACHE_TIMEOUT || 60 });
const CoinGeckoClient = new CoinGecko();
const coinRouter = express.Router();

coinRouter.get('/all', async (req, res) => {
    let key = "/api/coins/all";
    var cached = GeckoCache.get(key);

    if (cached != null)
        return res.json(cached);

    var coins1 = await CoinGeckoClient.coins.all({ per_page: 100 });

    var formattedData = coins1.data.map((coin) => {
        return {
            id: coin.id,
            label: coin.name,
            price: +parseFloat(coin.market_data.current_price.usd).toFixed(3),
            count: 0
        };
    })

    GeckoCache.set(key, formattedData);
    return res.json(formattedData);
});

module.exports = coinRouter;