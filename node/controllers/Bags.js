const express = require("express");
const bagsRouter = express.Router();

const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true });

bagsRouter.get('/:address', (req, res) => {
    mongoClient.connect(function (err, client) {
        const db = client.db("crypto");
        const collection = db.collection("bags");

        collection
            .find({ "address": req.params.address })
            .toArray(function (err, results) {
                res.send(results);
            });
    })
});

bagsRouter.post('', (req, res) => {
    mongoClient.connect(async (err, client) => {
        const db = client.db("crypto");
        const collection = db.collection("bags");

        let result = await collection.insertOne(req.body);
        res.sendStatus(result.result.ok === 1 ? 200 : 500)
    })
});

module.exports = bagsRouter;