const express = require("express");
const app = express();
const router = require("./routes/user");
const path = require("path");


const cors = require("cors");

const corsconfig = {
    exposedHeaders: ["Authorization"],
}

corsconfig['origin'] = process.env.CORS_ORIGIN 

app.use(
    cors(corsconfig)
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/api/v2", router);

module.exports = app