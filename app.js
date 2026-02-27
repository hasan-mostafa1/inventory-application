const express = require("express");
const path = require("node:path");
const authorRouter = require("./routes/authorRouter");

const app = express();

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/authors", authorRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app - listening on port ${PORT}`);
});

const viewsPath = path.join(__dirname, "views");
app.set("views", viewsPath);
app.set("view engine", "ejs");

//Error middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});
