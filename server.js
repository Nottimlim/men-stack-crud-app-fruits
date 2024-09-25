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
app.use(express.urlencoded({ extended: false }));
app.listen(3000, () => {console.log("listening at 3000")});

// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
});

// GET /fruits
app.get("/fruits", async (req, res) => {
    const allFruits = await Fruit.find();
    console.log(allFruits); // logs furits
    res.render("fruits/index.ejs", { fruits: allFruits });
    });

// GET /fruits/new
app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs");
});
app.get("/fruits/:fruitId", (req, res) => {
    res.send( `This route renders the show page for fruit id: ${req.params.fruitId}`);
});

// POST /fruits
app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits");
    console.log(req.body);
  });