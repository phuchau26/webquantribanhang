const Product = require("../../models/product.model")
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")
const dateFormat = require("../../helpers/dateFormat")
// [GET] /admin/products

module.exports.index= async (req, res) => {
    
    const filterStatus = filterStatusHelper(req.query)

    const find = {
        deleted: false
    }

    if (req.query.status) {
        find.status = req.query.status;
    }

    objectSearch = searchHelper(req.query)
    if (objectSearch.regex){
        find.title = objectSearch.regex
    }
    
    const countProducts = await Product.countDocuments(find)
    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItem: 4
        },
        req.query,
        countProducts
    )

    const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip)
    
    res.render("admin/pages/product/index", {
        pageTitle: "Trang sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}

// [PATCH] /admin/products/change-status/status/id

module.exports.changeStatus = async (req, res) => {
    const status = req.params.status
    const id = req.params.id

    await Product.updateOne({_id: id}, {status: status})
    
    const backURL = req.get('Referer') || '/admin/products'; 
    res.redirect(backURL);
}

//[PATCH] /admin/products/change-multi

module.exports.changeMulti = async (req, res) => {
    const type = req.body.type
    const ids = req.body.ids.split(",")

    switch (type){
        case "active":
            await Product.updateMany({_id: { $in: ids}}, {status: "active"})
            break;
        case "inactive":
            await Product.updateMany({_id: { $in: ids}}, {status: "inactive"})
            break;
        case "delete-all":
            await Product.updateMany({_id: { $in: ids}}, {
                deleted: true,
                deleteDate: dateFormat.formatted
            })
            break;
        default:
            break;
    }

    const backURL = req.get('Referer') || '/admin/products'; 
    res.redirect(backURL);
}

// [DELETE] /admin/products/delete/id

module.exports.deleteItem = async (req, res) => {
    const id = req.params.id

    

    await Product.updateOne({_id: id}, {
        deleted: true,
        deleteDate: dateFormat.formatted
    })
    
    const backURL = req.get('Referer') || '/admin/products'; 
    res.redirect(backURL);
}
