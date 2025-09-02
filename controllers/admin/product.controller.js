const Product = require("../../models/product.model")
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")
const dateHelper = require("../../helpers/dateFormat")
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

    let sort = {}

    if (req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue
    }else{
        sort.position = "desc"
    }


    const products = await Product.find(find)
        .sort(sort)
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip)
    
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

    req.flash("success", "Cập nhật trạng thái thành công!")
    
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
                req.flash("success", `Cập nhật trạng thái thành công của ${ids.length} sản phẩm!`)
            break;
        case "inactive":
            await Product.updateMany({_id: { $in: ids}}, {status: "inactive"})
            req.flash("success", `Cập nhật trạng thái thành công của ${ids.length} sản phẩm!`)
            break;
        case "delete-all":
            await Product.updateMany({_id: { $in: ids}}, {
                deleted: true,
                deleteDate: dateHelper()
            })

            req.flash("success", `Xóa thành công ${ids.length} sản phẩm!`)

            break;
        case "change-position":
            for (const item of ids){
                let [id, position] = item.split('-')
                position = parseInt(position)
                
                await Product.updateOne({_id: id}, {position: position})
            }

            req.flash("success", `Thay đổi vị trí thành công của ${ids.length} sản phẩm!`)
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
        deleteDate: dateHelper()
    })

    req.flash("success", `Xóa thành công sản phẩm!`)
    
    const backURL = req.get('Referer') || '/admin/products'; 
    res.redirect(backURL);
}


// [GET] /admin/products/create
module.exports.create= async (req, res) => {
   res.render("admin/pages/product/create", {
        pageTitle: "Thêm mới sản phẩm"
   })
}

// [POST] /admin/products/create
module.exports.createPost= async (req, res) => {

    if (!req.body.title){
        req.flash("error", "Vui lòng nhập tiêu đề!")
        res.redirect('/admin/products/create')
        return;
    }

   req.body.price = parseInt(req.body.price)
   req.body.discountPercentage = parseFloat(req.body.discountPercentage)
   req.body.stock = parseInt(req.body.stock)

   if(req.body.position == ""){
    const countProducts = await Product.countDocuments()

    req.body.position = countProducts + 1
   }else{
        req.body.position = parseInt(req.body.position)
   }

    const product = new Product(req.body)
    await product.save()

    const backURL = req.get('Referer') || '/admin/products/create'; 
    res.redirect(backURL);
}

// [GET] /admin/products/edit/:id
module.exports.edit= async (req, res) => {
    try{
        const find = {
            deleted: false,
            _id: req.params.id
        }

        const product = await Product.findOne(find)

        res.render("admin/pages/product/edit", {
                pageTitle: "Chỉnh sửa sản phẩm",
                product: product
        })
    } catch(error){
        const backURL = req.get('Referer') || '/admin/products'; 
        res.redirect(backURL);
    }
    
}



// [PATCH] /admin/products/edit/:id
module.exports.editPatch= async (req, res) => {
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseFloat(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    req.body.position = parseInt(req.body.position)

    try{
        await Product.updateOne(
            {
                _id: req.params.id
            }, req.body
        )

        req.flash("success", "Đã cập nhật sản phẩm thành công!")
    }catch (error){
        req.flash("error", "Cập nhật sản phẩm thất bại!")
    }

    const backURL = '/admin/products'; 
    res.redirect(backURL);


}



// [GET] /admin/products/detail/:id
module.exports.detail= async (req, res) => {
    try{
        const find = {
            deleted: false,
            _id: req.params.id
        }

        const product = await Product.findOne(find)

        res.render("admin/pages/product/detail", {
                pageTitle: product.title,
                product: product
        })
    } catch(error){
        const backURL = req.get('Referer') || '/admin/products'; 
        res.redirect(backURL);
    }
    
}
