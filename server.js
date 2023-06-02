const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({path: '.env.dev'});
const app = express();

app.use(express.json());


const port = process.env.PORT || 4000;
const dbUrl = process.env.MONGODB_URL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(port, () => {
        console.log(`Server starting at port ${port}`);
    });
})
.catch((err) => {
    console.log(err);
});