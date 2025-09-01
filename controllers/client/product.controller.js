const Product = require("../../models/product.model")

// [GET] /products
module.exports.index = async (req, res) => {

    const products = await Product.find({
        status: "active"
    });

    products.forEach(item => (
        item.oldPrice = (item.price*((100+item.discountPercentage)/100)).toFixed(0)
    ))

    res.render("client/pages/products/index", {
        pageTitle: "Trang danh sách sản phẩm",
        products: products
    })
}