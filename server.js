const express = require("express");
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
const fs = require("fs");

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
app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    const content = fs.readFileSync("./dataset.json", "utf-8");
    res.render("home.hbs", JSON.parse(content));
});

app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});
