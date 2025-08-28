const express = require("express")
const router = express.Router()
const controller = require("../../controllers/admin/bin.controller")

router.get("/", controller.recycleBin)
router.patch("/restore/:id", controller.restoreItem)
router.delete("/delete/:id", controller.deleteItem)
router.patch("/change-multi", controller.changeMulti)

module.exports = router