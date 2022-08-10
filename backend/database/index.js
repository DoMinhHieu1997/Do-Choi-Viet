const { MongoClient } = require("mongodb");

const db = {};
const connectToDb = async () => {
    const client = new MongoClient("mongodb+srv://admin:admin123@cluster0.j9yngv5.mongodb.net/?retryWrites=true&w=majority");
    await client.connect(() => {
        console.log("Mongodb connected");
        const database = client.db("do_choi_viet");
        db.products = database.collection("products");
        db.users = database.collection("users");
    });
};

module.exports = { connectToDb, db };