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
    console.log(req.body);

    mongoClient.connect(async (err, client) => {
        const db = client.db("crypto");
        const collection = db.collection("bags");

        await collection.updateOne({ address: req.body.address }, { $set: { address: req.body.address, bags: [ ...req.body.bags ] } }, { upsert: true });

        res.sendStatus(200);
    })
});

module.exports = bagsRouter;