const jwt = require("jsonwebtoken");
// const authorModel = require("../models/authorModel");
// const AuthorModel= require("../models/authorModel");
const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");



//===================POST/CREATE-COLLEGE=======

const createCollege= async function (req, res) {
  try{

//*Empty body validation

    const data = req.body
    if(Object.keys(data).length == 0){
      return res.status(400).send({status: false,msg: "Invalid request, Please provide College details",
      });
    }


  
    
//*Extracts data from body

    const name = req.body.name;
    const fullName = req.body.fullName;
    const logoLink = req.body.logoLink;
    const isDeleted = req.body.isDeleted;
    

//*Body Validation

    if (!name) return res.status(400).send({ status: false, msg: "Firstname is required" })
    if (!fullName) return res.status(400).send({ status: false, msg: "fullNname is required" })
    if (!logoLink) return res.status(400).send({ status: false, msg: "logoLink is required" })
   


    let collegeCreated = await collegeModel.create(data)
    res.status(200).send({status:true,data: collegeCreated})

  } catch (err) {
    res.status(500).send({ msg: "server error", error: err.message });
    }
    }



    //*Get College Details

const GetCollegeDetails = async function (req, res) {
  try {


    let collegeName = req.query.collegeName;

    const college = await collegeModel.findOne({name:collegeName })

    let allData = await internModel
      .find({
        isDeleted: false,collegeId: college._id
      })
      
      college.interests= allData

    //*Validation

    // if (allData.length == 0)
    //   return res.status(404).send({ msg: "Enter valid Details in query" });
    res.status(200).send({ status: true, msg: college });


  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "server Error", err: err.message });
  }
};

// //*Create Author
// const createAuthor= async function (req, res) {
//   try{

// //*Empty body validation

//     const data = req.body
//     if(Object.keys(data).length == 0){
//       return res.status(400).send({status: false,msg: "Invalid request, Please provide Author details",
//       });
//     }

// //*Extracts params from body

//     const fname = req.body.fname;
//     const lname = req.body.lname;
//     const title = req.body.title;
//     const email = req.body.email;
//     const password = req.body.password;

// //*Params Validation

//     if (!fname) return res.status(400).send({ status: false, msg: "Firstname is required" })
//     if (!lname) return res.status(400).send({ status: false, msg: "Lastname is required" })
//     if (!title) return res.status(400).send({ status: false, msg: "Title is required" })
//     if (!email) return res.status(400).send({ status: false, msg: "Email is required" })
//     if (!password) return res.status(400).send({ status: false, msg: "Password is required" })

// //*To check Email Exist or not

//     let emailID= await authorModel.findOne({email})
//     if(emailID) return res.status(400).send({msg:"Account already Present with this EmailID"})


// //*Email format Validation

//     const validate = function(v){ return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(v)}
//     if(!validate(email)) return res.status(400).send({ status: false, msg: "email is not valid" })

// //*Author creation

//     let authorCreated = await AuthorModel.create(data)
//     res.status(200).send({status:true,data: authorCreated})

// } catch (err) {
// res.status(500).send({ msg: "server error", error: err.message });
// }
// }

// //*Author Login
// const loginAuthor = async function (req, res) {
//   try{
    
//     //*Param validation
//     let email = req.body.email;
//     if(!email) return res.status(400).send({ status: false, msg: "Email is required" })
//     let password = req.body.password;
//     if(!password) return res.status(400).send({ status: false, msg: "Password is required" })
  
//     //*Checking correct Input
//     let author = await AuthorModel.findOne({ email: email, password: password });
//     if (!author) return res.status(400).send({status: false,msg: "Email or the Password is not Corerct"});

//     //*Token Generation
//     let token = jwt.sign(
//       {
//         authorId: author._id.toString(),
//         batch: "brillientCoders",
//         organisation: "RSPtechnologies",
//       },
//       "RSPtechnologies-brillientCoders"
//     );
    
//     //*Sending token through Header
//     res.header("x-Api-Key", token);
//     res.status(200).send({ status: true, data: token ,msg: "Login Successfully"});
      
//     }
//     catch (err) {
//       res.status(500).send({ msg: "server error", error: err.message });
//       }
//     }
  

  
module.exports.createCollege= createCollege
module.exports.GetCollegeDetails = GetCollegeDetails
