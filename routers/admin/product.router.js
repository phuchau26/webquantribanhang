const express = require("express")
const multer = require("multer")
const router = express.Router()


const upload = multer()
const controller = require("../../controllers/admin/product.controller")

router.get("/", controller.index)

const uploadCloud = require("../../middleware/admin/uploadCloud.middleware")

router.patch("/change-status/:status/:id", controller.changeStatus)
router.patch("/change-multi", controller.changeMulti)
router.delete("/delete/:id", controller.deleteItem)
router.get("/create", controller.create)
router.post(
    "/create", 
    upload.single("thumbnail"),
    uploadCloud.upload,
    controller.createPost)

router.get("/edit/:id", controller.edit)
router.patch(
    "/edit/:id",
    upload.single("thumbnail"),   // phải có để parse form-data
    uploadCloud.upload,
    controller.editPatch
)

router.get("/detail/:id", controller.detail)

module.exports = router