const UserModel = require("../model/usersModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const usersModel = require("../model/usersModel")
const {SEC_KEY} = process.env
//signup 

module.exports.signup =  async function(req,res){
    //validation
    //email unique 

    // let user = new UserModel({
    //     firstName:req.body.firstName,
    //     email:req.body.email,
    //     password:req.body.password
    // })
    let pass = req.body.password;
    let enpass = bcrypt.hashSync(pass,10);
    console.log("encrypted = ",enpass);
    req.body.password = enpass; 

    let user = new UserModel(req.body) 

   let data = await user.save() 

   res.json({data:data,msg:"signup done",rcode:200})
}


//login 
module.exports.login = async function(req,res){
    
  let email = req.body.email 
  let password = req.body.password 

  let user = await UserModel.findOne({email:email})
  
  if(user && bcrypt.compareSync(password,user.password)){
           token = jwt.sign({ "authId":user._id,"authority":"user"},SEC_KEY,{expiresIn:"7d"})
           console.log("token "+token);
       
           //update
           res.json({data:user,msg:"Login done",rcode:200,token:token})
  }else{      
          res.json({data:req.body,msg:"Invalid Credentials",rcode:-9})
  } 
}

module.exports.getAllUsers = function(req,res){
  usersModel.find().then(data=>{
    res.json({data:data,msg:"user retrived",rcode:200})
  })
}


module.exports.deleteUserById = function deleteUserById(req,res)
{
    let userId = req.params.userId

    console.log("UserID = ",userId)

    UserModel.deleteOne({_id:userId}).then((data)=>{
      res.json({ "msg":"Data Deleted" , "data":data , "rcode":200})
    }).catch((err)=>{
      res.json({ "msg":"No Rec Found" , "data":err , "rcode":-9})
    })
 
    
    
}

module.exports.getUserById = function getUserById(req,res)
{
    let userId = req.params.userId

    UserModel.findById({_id:userId}).then((data)=>{
      res.json({ "msg":"Data retrived" , "data":data , "rcode":200})
    }).catch((err)=>{
      res.json({ "msg":"No Rec Found" , "data":err , "rcode":-9})
    })

}


module.exports.updateUser = async function (req, res) 
{


  let user = await usersModel.findOne({ _id: req.body.userId })

  console.log("user==> " + user);
  if(req.body.firstName)
  {
    user.firstName = req.body.firstName
  }
  if(req.body.email)
  {
    user.email = req.body.email
  }
  console.log("new user==> " + user)
  user = await user.save()
  res.json({ "data": user, status: 200, msg: "user modified" })

}

