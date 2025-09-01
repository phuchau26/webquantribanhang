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

// [GET] /products/:slug
module.exports.detail = async (req, res) => {

    try{

        //Do có một số sản phẩm đầu chưa có slug nên sẽ lỗi. 
        //Vì vậy sẽ có lỗi nếu sp không có slug
        console.log(req.params.slug)
        var find = {
            deleted: false,
            slug: req.params.slug,
            status: "active"
        }
    
        const product = await Product.findOne(find)

        res.render("client/pages/products/detail", {
                pageTitle: "Chi tiết sản phẩm",
                product: product
            })
        }catch(error){
            res.redirect("/products")
        }
}
    