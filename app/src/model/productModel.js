const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  qty: Number,
  categoryId :{
    type:mongoose.Schema.Types.ObjectId ,
    ref:"Category"
  } 
});

//category -> _id  ->  ObjectId 
//categoryId : mongoose.Schema.Types.ObjectId 


module.exports  = mongoose.model('Product', ProductSchema); //products 
 
//name , price , qty -> 
//db.product.insertOne({})

//ProductModel -> class 
// object -> save() 
//db.product.insertOne({})



