const productsRouter = require("./product.router")
const homeRouter = require("./home.router")

module.exports = (app) => {
    // app.get("/", (req, res) => {
    // res.render("client/pages/home/index")
    // });
    app.use("/", homeRouter)
    app.use("/products", productsRouter)
}