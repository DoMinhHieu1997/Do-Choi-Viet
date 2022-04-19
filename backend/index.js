const express = require("express");
const { connectToDb } = require("./database");
const router = require("./routers");
const cors = require('cors')

const app = express();
app.use(
    cors({
        origin: "*"
    })
);
app.use(express.json());

app.use(router);

connectToDb();

app.listen(5001, () => {
    console.log('App is running at 5001');
});