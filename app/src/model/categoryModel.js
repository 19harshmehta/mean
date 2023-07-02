const mongoose = require("mongoose")

//categoryid , categoryName

const CategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: { value: true, message: "Please Enter CategoryName" },
        lowercase: true       
    }
})

module.exports = mongoose.model("Category", CategorySchema)
