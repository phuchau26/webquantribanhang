const express = require("express")
const multer = require("multer")
const cloudinary =require("cloudinary").v2
const streamifier = require("streamifier")
const router = express.Router()


//cloudinary
 cloudinary.config({ 
    cloud_name: 'dgjn4bejp', 
    api_key: '973165384255778', 
    api_secret: 'iizD-RLeqAt2UDzUm_xQV6kbQm4' // Click 'View API Keys' above to copy your API secret
});
//end cloudinary


const upload = multer()
const controller = require("../../controllers/admin/product.controller")

router.get("/", controller.index)

router.patch("/change-status/:status/:id", controller.changeStatus)
router.patch("/change-multi", controller.changeMulti)
router.delete("/delete/:id", controller.deleteItem)
router.get("/create", controller.create)
router.post(
    "/create", 
    upload.single("thumbnail"),
    function (req, res, next) {
        if (req.file){
            let streamUpload = (req) => {
                return new Promise((resolve, reject) => {
                    let stream = cloudinary.uploader.upload_stream(
                        (error, result) => {
                            if (result) {
                                resolve(result);
                            } else {
                                reject(error);
                            }
                        }
                    );

                    streamifier.createReadStream(req.file.buffer).pipe(stream);
                });
            };

            async function upload(req) {
                let result = await streamUpload(req);
                console.log(result.secure_url)
                req.body[req.file.fieldname] = result.secure_url
                next()
            }

            upload(req);    
        }else{
            next()
        }
    },
    controller.createPost)

router.get("/edit/:id", controller.edit)
router.patch(
    "/edit/:id",
    upload.single("thumbnail"),   // phải có để parse form-data
    controller.editPatch
)

router.get("/detail/:id", controller.detail)

module.exports = router