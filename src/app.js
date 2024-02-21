const express = require("express");
const app = express();
const router = require("./routes/user");
const path = require("path");
const cors = require("cors");
require("dotenv").config();



app.use(cors({
    origin: 'https://client-production-5def.up.railway.app',
    exposedHeaders: ['Authorization'],  
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/api/v2", router);

module.exports = app