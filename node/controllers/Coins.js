const express = require("express");
const CoinGecko = require('coingecko-api');
const NodeCache = require('node-cache');
const GeckoCache = new NodeCache({ checkperiod: process.env.COINGECKO_CACHE_TIMEOUT || 60 });
const CoinGeckoClient = new CoinGecko();
const coinRouter = express.Router();
const totalpages = 4;
const perpage = 500;

coinRouter.get('/all', async (req, res) => {
    let key = "/api/coins/all";
    var cached = GeckoCache.get(key);

    if (cached != null)
        return res.json(cached);

    let formattedData = [];

    for (let page = 1; page <= totalpages; page++) {
        let pageformatteddata = (await CoinGeckoClient
            .coins
            .all({ per_page: perpage, page: page }))
            .data
            .map((coin) => {
                return {
                    id: coin.id,
                    label: coin.name,
                    price: +parseFloat(coin.market_data.current_price.usd).toFixed(3),
                    count: 0
                };
            });

        formattedData.push.apply(formattedData, pageformatteddata);
    }

    GeckoCache.set(key, formattedData);
    return res.json(formattedData);
});

module.exports = coinRouter;