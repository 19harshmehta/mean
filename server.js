const express = require("express")
require("./app/src/config/dbConfig").getDbConnection()

const categoryRoutes = require("./app/src/routes/category.routes")
const productRoutes = require("./app/src/routes/product.routes")
const publicRoutes = require("./app/src/routes/public.routes")
const sessionController = require("./app/src/controller/sessionControllerDb")
const cors = require("cors")

const authMiddlerware = require("./app/src/middleware/auth.middleware")
const app = express()

//middlerware 
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())


//private ->authenticated 
app.use("/admin",authMiddlerware,categoryRoutes)
app.use("/admin",authMiddlerware,productRoutes)

//public 
app.use("/public",publicRoutes)
app.post("/signup",sessionController.signup)
app.get("/getallusers",sessionController.getAllUsers)
app.delete("/deleteuser/:userId",sessionController.deleteUserById)
app.get("/getuserbyid/:userId",sessionController.getUserById)
app.put("/updateuser",sessionController.updateUser)



app.listen(9999)
console.log("server started 9999");