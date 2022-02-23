const express = require("express");
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
const fs = require("fs");
const PORT = process.env.PORT || 3000;

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

app.get("/filter", (req, res) => {
    console.log(req.query);
    const content = fs.readFileSync("./dataset.json", "utf-8");

    let db = JSON.parse(content);

    let checkedTrucks = [];
    for (let i = 0; i < db.stock.length; i++) {
        let truck = db.stock[i];
        let matched = [];
        for (let param in req.query) {
            if (/axle/.test(param)) {
                if (typeof req.query[param] === "string") {
                    if (
                        truck["axle_configuration"].indexOf(req.query[param]) >
                        -1
                    )
                        matched.push(true);
                    else matched.push(false);
                } else {
                    matched.push(false);
                    for (let y = 0; y < req.query[param].length; y++) {
                        if (
                            truck["axle_configuration"].indexOf(
                                req.query[param][y]
                            ) > -1
                        ) {
                            matched.pop();
                            matched.push(true);
                            break;
                        }
                    }
                }
            }

            if (param === "min-price" && req.query[param] != "") {
                if (Number(truck["price"]) >= Number(req.query[param]))
                    matched.push(true);
                else matched.push(false);
            }

            if (param === "max-price" && req.query[param] != "") {
                if (Number(truck["price"]) <= Number(req.query[param]))
                    matched.push(true);
                else matched.push(false);
            }

            if (param === "keyword") {
                if (truck["title"].indexOf(req.query[param]) > -1)
                    matched.push(true);
                else matched.push(false);
            }
        }
        if (matched.every((item) => item)) {
            checkedTrucks.push(truck);
        }
    }

    db.stock = checkedTrucks;

    res.render("home.hbs", db);
});

app.get("/", (req, res) => {
    const content = fs.readFileSync("./dataset.json", "utf-8");
    res.render("home.hbs", JSON.parse(content));
});

app.listen(PORT);
