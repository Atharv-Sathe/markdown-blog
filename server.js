const express = require("express");
const articleRouter = require("./routes/article");
const app = express();

app.set("view engine", "ejs");

app.use("/node_modules", express.static("node_modules"));
app.use("/articles", articleRouter);

app.get("/", (req, res) => {
  const articles = [
    {
      title: "Test Article 1",
      createdAt: new Date(),
      description: "Test description 1"
    },
    {
      title: "Test Article 2",
      createdAt: new Date(),
      description: "Test description 2"
    },
  ];
  res.render("articles/index", { articles: articles });
});

app.listen(5000, () => {
  console.log("I am awake!");
});
