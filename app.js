const path = require("path");

const express = require("express");
const helmet = require("helmet");
const compression = require("compression");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const main_routes = require("./routes/main");

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                "img-src": ["'self'", "data:", "https:"],
            },
        },
    })
);

const sixMonthsInSeconds = 15768000;

if (process.env.NODE_ENV != "development") {
    console.log("Enabling SSL");

    app.use(helmet.hsts({ maxAge: sixMonthsInSeconds }));
}
app.use(compression());

app.use(express.static(path.join(__dirname, "public")));

app.use(main_routes);

app.listen(process.env.PORT || 3000);
