const UserModel = require("../model/usersModel")
const jwt = require("jsonwebtoken")
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

    let user = new UserModel(req.body) 

   let data = await user.save() 

   res.json({data:data,msg:"signup done",rcode:200})
}


//login 
module.exports.login = async function(req,res){
    
    let email = req.body.email 
    let password = req.body.password 

    let user = await UserModel.findOne({email:email})
    
    if(user && user.password == password){
            token = jwt.sign({"email":user.email,"userId":user._id,"role":"user"},SEC_KEY,{expiresIn:"60s"})
             console.log("token "+token);
             //update
             console.log("og token",token);
            

             if (token) {
                jwt.verify(token, SEC_KEY, (err, decoded) => {
                  if (err) {
                    // Token verification failed
                    return res.status(401).json({ msg: 'Invalid token' });
                  }
            
                  if (decoded.exp - Date.now() / 1000 < 86400) {
                    console.log("in exp if");
                    // Token is about to expire within 1 day (86400 seconds)
                    const refreshedToken = jwt.sign(
                      { email: decoded.email, userId: decoded.userId, role: decoded.role },
                      SEC_KEY,
                      { expiresIn: '5h' }
                    );
                    // res.setHeader('Authorization', refreshedToken); // Set the refreshed token in the response header
                    console.log("rf token",refreshedToken);
                    // res.json({data:decoded,msg:"Refresh token",rcode:200,rftoken:refreshedToken})
                        
                    res.json({data:user,msg:"Login done",rcode:200,token:token,rftoken:refreshedToken})
                }
                });
              }
    }else{      
            res.json({data:req.body,msg:"Invalid Credentials",rcode:-9})
    } 
}


/*
if (token) {
      jwt.verify(token, SEC_KEY, (err, decoded) => {
        if (err) {
          // Token verification failed
          return res.status(401).json({ msg: 'Invalid token' });
        }
  
        if (decoded.exp - Date.now() / 1000 < 86400) {
          // Token is about to expire within 1 day (86400 seconds)
          const refreshedToken = jwt.sign(
            { email: decoded.email, userId: decoded.userId, role: decoded.role },
            SEC_KEY,
            { expiresIn: '60s' }
          );
          res.setHeader('Authorization', refreshedToken); // Set the refreshed token in the response header
        }
  
        // Token is valid and not about to expire, continue processing the request
        next();
      });
    } else {
      // No token found
      res.status(401).json({ msg: 'Missing token' });
    }
*/