// import modules and load express
const dotenv = require("dotenv");
dotenv.config();
const express =  require ("express"); 
const mongoose = require("mongoose");
const Fruit = require("./models/fruit.js");
const app = express();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})

app.listen(3000, () => {console.log("listening at 3000")});

// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
});

// GET /fruits/new
app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs");
});