const express = require("express");
const mongoose = require("mongoose");
const articleRouter = require("./routes/article");
const methodOverride = require("method-override");
const app = express();
const Article = require("./models/article");
const dotenv = require("dotenv");

dotenv.config();
mongoose.connect(process.env.MONGODB_CONNECT_URI);

app.set("view engine", "ejs");

app.use("/node_modules", express.static("node_modules"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter); // It's important to use this below express.urlencoded

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`I am awake! at ${PORT}`);
});
