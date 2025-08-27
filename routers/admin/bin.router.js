const express = require("express")
const router = express.Router()
const controller = require("../../controllers/admin/bin.controller")

router.get("/", controller.recycleBin)
router.patch("/restore/:id", controller.restoreItem)
router.delete("/delete/:id", controller.deleteItem)

module.exports = router