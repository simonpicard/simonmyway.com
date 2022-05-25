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
                "script-src": ["'self'", "plausible.io"],
                "connect-src": ["'self'", "plausible.io"],
            },
        },
    })
);

app.use(compression());

app.use(express.static(path.join(__dirname, "public")));

app.use(main_routes);

app.listen(process.env.PORT || 3000);
