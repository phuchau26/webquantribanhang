const systemConfig = require("../../config/system")
const dashboardRouter = require("./dashboard.router")
const productRouter = require("./product.router")
const binRouter = require("./bin.router")

module.exports = (app) => {
    app.use(systemConfig.prefixAdmin + "/dashboard", dashboardRouter)
    app.use(systemConfig.prefixAdmin + "/products", productRouter)  
    app.use(systemConfig.prefixAdmin + "/bin", binRouter)   
}