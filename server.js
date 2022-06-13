const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config({path:"./.env.local"})

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
}

// Routes Middleware
app.use("/api", profileRoutes)


// Port --------------------------------------------------------------------------
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server Running on port ${port}`)
})