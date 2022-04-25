const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

  const createUser = async function (abcd, xyz) {
    //You can name the req, res objects anything.
    //but the first parameter is always the request
    //the second parameter is always the response
    try{
      let data = abcd.body;
    let savedData = await userModel.create(data);
    console.log(abcd.newAtribute);
    xyz.send({ msg: savedData });
    }catch(error){
      return xyz.status(400).send({status: false, msg: "createUser not exit"})
    }
    
  };
  const loginUser = async function (req, res) {
    try{
      let userName = req.body.emailId;
      let password = req.body.password;
    
      let user = await userModel.findOne({ emailId: userName, password: password });
      if (!user)
        return res.send({
          status: false,
          msg: "username or the password is not corerct",
        });
    
      // Once the login is successful, create the jwt token with sign function
      // Sign function has 2 inputs:
      // Input 1 is the payload or the object containing data to be set in token
      // The decision about what data to put in token depends on the business requirement
      // Input 2 is the secret
      // The same secret will be used to decode tokens
      let token = jwt.sign(
        {
          userId: user._id.toString(),
          batch: "Code_club",
          organisation: "CodeClub_Aman",
        },
        "CodeClub_Aman-Code_club"
      );
      res.setHeader("x-auth-token", token);
      res.send({ status: true, data: token });
    }catch(error){
      return res.status(500).send({status: false, msg: "loginUser not exit"})
    }
  };


const getUserData = async function (req, res) {
  try{
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
  
    //If no token is present in the request header return error
    if (!token) return res.send({ status: false, msg: "token must be present" });
  
    console.log(token);
    
    let decodedToken = jwt.verify(token, "CodeClub_Aman-Code_club");
    if (!decodedToken)
      return res.send({ status: false, msg: "token is invalid" });
  
    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    if (!userDetails)
      return res.send({ status: false, msg: "No such user exists" });
  
    res.send({ status: true, data: userDetails });
  }catch(error){
    return res.status(400).send({status: false, msg: "getUserData not exit"})
  }
  
};





const updateUser = async function (req, res) {
  try{
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    //Return an error if no user with the given id exists in the db
    if (!user) {
      return res.send("No such user exists");
    }                                           
  
    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
    res.send({ status: updatedUser, data: updatedUser });
  }catch(error){
    return res.status(400).send({status: false, msg: "updateUser not exit"})
  }
  
};





const isdeleted = async function (req, res) {
    try{
      let userId = req.params.userId;
    let user = await userModel.findById(userId);
    //Return an error if no user with the given id exists in the db
    if (!user) {
      return res.send("No such user exists");
    }                                           
  
    let userData = req.body;
    userData.isdeleted = true;
    let deletedUser = await userModel.updateOne({ _id: userId } ,userData);
    res.send({ status: false, data: deletedUser });
    }catch(error){
      return res.status(400).send({status: false, msg: "isdeleted not exit"})
    }
    
  };






module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.isdeleted = isdeleted;