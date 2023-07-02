const express = require("express")
const sessionControllerDb = require("../controller/sessionControllerDb")
// const refreshMiddleware = require("../middleware/refresh.middleware")


const router = express.Router()

router.post("/signupdb",sessionControllerDb.signup)
router.post("/login",sessionControllerDb.login)

module.exports = router 