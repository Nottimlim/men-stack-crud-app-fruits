// import modules and load express
const dotenv = require("dotenv");
dotenv.config();
const express =  require ("express"); 
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");
const Fruit = require("./models/fruit.js");

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

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

app.get("/fruits/:fruitId", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs", { fruit: foundFruit });
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

  // GET /fruits/:fruitId/
app.delete("/fruits/:fruitId", async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect("/fruits");
  });

  // GET /fruits/:fruitId/edit
app.get("/fruits/:fruitId/edit", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/edit.ejs", { fruit: foundFruit });
  });

// PUT /fruits/:fruitId

app.put("/fruits/:fruitId", async (req, res) => {
    // Handle the 'isReadyToEat' checkbox data
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    // Update the fruit in the database
    await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
    // Redirect to the fruit's show page to see the updates
    res.redirect(`/fruits/${req.params.fruitId}`);
  });
  