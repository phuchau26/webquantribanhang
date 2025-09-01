require('dotenv').config();

const database = require("./config/database")
const systemConfig = require("./config/system")
const methodOverride = require("method-override")
const bodyParser = require('body-parser')
const flash = require("express-flash")
const cookieParser = require("cookie-parser")
const session = require("express-session")


const express = require("express");
database.connect();

const router = require("./routers/client/index.router")
const routerAdmin = require("./routers/admin/index.router")

const app = express();
const port = process.env.PORT;

app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({extended: false}))

app.set("views", "./views")
app.set("view engine", "pug")

//Flash 
app.use(cookieParser("keyboard cat"))
app.use(session({cookie: {maxAge: 60000}}))
app.use(flash())

//App local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin

app.use(express.static("public"))

router(app)
routerAdmin(app)

app.listen(port, () => {
  console.log(`Da chay tren cong: ${port}`);
});