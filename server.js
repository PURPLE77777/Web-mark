const express = require("express");
const expressHbs = require("express-handlebars");
const hbs = require("hbs");

const app = express();

app.engine(
    "hbs",
    expressHbs.engine({
        layoutsDir: "views/layouts",
        defaultLayout: "layout",
        extname: "hbs",
    })
);
app.set("view engine", "hbs");
app.set("views", "views");
hbs.registerPartials(__dirname + "/views/partials");

app.get("/page1", (req, res) => {
    res.render("page1");
});

app.get("/page2", (req, res) => {
    res.render("page2");
});

app.use("/", (req, res) => {
    res.render("home.hbs");
});

app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});
