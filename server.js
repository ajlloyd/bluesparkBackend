const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const mongoose = require("mongoose")
//require("dotenv").config({path:"./.env.local"})

// Import routes:
const profileRoutes = require("./routes/profiles")


// Express App----------------------------------------------------------------------
const app = express()

//Mongo Database--------------------------------------------------------------------
main().catch(err => console.log(err));
async function main() {
    await mongoose
    .connect(process.env.ATLAS_DATABASE)
    .then(() => console.log("Database Connected"))
  }


// Apply Middleware ----------------------------------------------------------------
// Imported Middleware:
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cookieParser())

// Cors Middleware - Cross Origin Resource Sharing - when development use cors (as browsers do not allow cross origin resources 3000 and 8000)
if (process.env.NODE_ENV == "development") {
    app.use(cors({ origin: `${process.env.CLIENT_URL}`}))
} else if (process.env.NODE_ENV == "production") {
    console.log("Production cors mode")
    app.use(cors());
    //{methods: 'GET,POST,PATCH,DELETE,OPTIONS',optionsSuccessStatus: 200,origin: 'https://sparkfit.vercel.app/'}
    //app.options('*', cors());
}


/*app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});*/

// Routes Middleware
app.use("/api", profileRoutes)


// Port --------------------------------------------------------------------------
var server_port = process.env.MY_PORT || process.env.PORT || 80;
app.listen(server_port, () => {
    console.log(`Server Running on port ${server_port}`)
})