const { MongoClient } = require("mongodb");

const db = {};
const connectToDb = async () => {
    const client = new MongoClient("mongodb://localhost:27017");
    await client.connect(() => {
        console.log("Mongodb connected");
        const database = client.db("do_choi_viet");
        db.products = database.collection("products");
        db.users = database.collection("users");
    });
};

module.exports = { connectToDb, db };