const mongoose = require("mongoose")
require('dotenv').config()
//const MONGO_URI = process.env.MONGO_URI
const {MONGO_URI} = process.env 

module.exports.getDbConnection = function(){ 
    mongoose.connect(MONGO_URI).then(()=>console.log("DbConnected")).catch(()=>console.log("DbConnection Fail"))
}