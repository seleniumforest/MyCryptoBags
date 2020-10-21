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

const coinAllUrl = '/api/coins/all';
app.get(coinAllUrl, async (req, res) => {
    let key = coinAllUrl;
    var cached = GeckoCache.get(key);

    if (cached != null)
        return res.json(cached);

    var coins1 = await CoinGeckoClient.coins.all({ per_page: 250, page: 1 });
    var coins2 = await CoinGeckoClient.coins.all({ per_page: 250, page: 2 });
    var coins3 = await CoinGeckoClient.coins.all({ per_page: 250, page: 3 });

    var formattedData = [...coins1.data, ...coins2.data, ...coins3.data ].map((coin) => {
        return {
            value: coin.id,
            label: coin.name,
            price: parseFloat(coin.market_data.current_price.usd).toFixed(3)
        };
    })

    GeckoCache.set(key, formattedData);
    return res.json(formattedData);
});

app.get('/api/ping', async (req, res) => {
    return res.json({ gecko_says: 123 });
});


app.listen(PORT, function () {
    console.log("Node Server running on PORT:" + PORT);
});