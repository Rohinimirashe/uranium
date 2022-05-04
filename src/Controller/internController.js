const { response, query } = require("express");
const mongoose = require("mongoose");
const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");
//const isValid = mongoose.Types.ObjectId.isValid;

//*Create intern


const createInten = async function (req, res) {
  try {
    //*Empty Body Validation
    const data = req.body;
    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "Invalid request, Please provide Intern details",
        });
    }

    let collegeId = req.body.collegeId;
    if (!collegeId)
      return res
        .status(400)
        .send({ status: false, msg: "college ID is Required" });
    let validationCollegeId = await collegeModel.findById(collegeId);
    if (!validationCollegeId)
      return response
        .status(400)
        .send({ status: false, msg: "Enter Valid College ID" });

    //*Extracts Param
    // const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;
   

    //*Params Validation
    // if (!name)
    //   return res.status(400).send({ status: false, msg: "name is required" });
    if (!email)
      return res.status(400).send({ status: false, msg: "email is required" });
    if (!mobile)
      return res
        .status(400)
        .send({ status: false, msg: "mobile is required" });

    let internCreated = await internModel.create(data);

 
    // if (body.isDeleted === true) {
    //   let CreateDeleteTime = await blogModel.findOneAndUpdate(
    //     { authorId: data.authorId },
    //     { $set: { deletedAt: new Date() } },
    //     { new: true }
    //   );
    // }
    // let Finaldata = await blogModel.find(data);

    res.status(201).send({ status: true, data: internCreated });
  } catch (err) {
    res.status(500).send({ msg: "server error", error: err.message });
  }
};



// //*Update Blog

// const updateBlog = async function (req, res) {
//   try {
//     const blogId = req.params.blogId;
//     if (!blogId)
//       return res.status(404).send({ status: false, msg: "No Blog Found" });
//     if (!isValid(blogId))
//       return res.status(404).send({ status: false, msg: "BlogID invalid" });

//     const blogFound = await blogModel.findOne({blogId});
//     if (blogFound.isDeleted === true) {
//       return res.status(404).send({ Status: "false", msg: "blog is deleted " });
//     }

//     //*Extracts Param
//     const title = req.body.title;
//     const body = req.body.body;
//     const tag = req.body.tags;
//     const cat = req.body.category;
//     const subcat = req.body.subcategory;

//     if (title || cat || subcat || tag || body) {
//       const updatedBlog = await blogModel.findOneAndUpdate(
//         { _id: blogId },
//         {
//           title: title,
//           body: body,
//           category: cat,
//           $push: { subcategory: subcat, tags: tag },
//           isPublished: true,
//           publishedAt: new Date(),
//         },
//         { new: true }
//       );

//       //*Validation
//       if (!updatedBlog) return res.status(404).send({ msg: "Blog not found" });
//       res
//         .status(200)
//         .send({ status: true, msg: "Updated successfully", data: updatedBlog });
//     } else {
//       res.status(400).send({ msg: "data is required in body " });
//     }
//   } catch (err) {
//     res
//       .status(500)
//       .send({ status: false, msg: "server Error", err: err.message });
//   }
// };

// //*Delete-Blog-By-Id

// const DeleteBlogById = async function (req, res) {
//   try {
//     const blogId = req.params.blogId;
//     if (!blogId)
//       return res
//         .status(404)
//         .send({ status: false, msg: "Blog Id is needed in path params" });
//     if (!isValid(blogId))
//       return res.status(404).send({ status: false, msg: "BlogID invalid" });

//       const blogFound = await blogModel.findOne({blogId});
//       if (blogFound.isDeleted === true) {
//         return res.status(404).send({ Status: "false", msg: "blog is deleted " });
//       }
// else if(blogFound.isDeleted === false)
// {
//     let DeletedBlog = await blogModel.findOneAndUpdate(
//       { _id: blogId },
//       { isDeleted: true, deletedAt: new Date() },
//       { new: true }
//     );
//     if (!DeletedBlog) return res.status(404).send({ msg: "blog not found" });
//     res.status(200).send({ status: true, msg: DeletedBlog });
//     }

  
//     //   return res.status(200).send("deleted");
//     // } else {
//     //   let FinalResult = await BloggerModel.findByIdAndUpdate(
//     //     id,
//     //     { isDeleted: true, deletedAt: new Date() },
//     //     { new: true }
//     //   );
//     //   return res.status(201).send({ msg: " isDeleted: true ", FinalResult });
//     // }

//     //*Validation


//   } catch (err) {
//     res.status(500).send({ status: false, msg: "Error", err: err.message });
//   }
// };

// //*Delete-Blog-By-Queryparams

// const DeleteBlogByQuery = async function (req, res) {
//   try {
//     //*Extracts Query
//     let query= req.query
//     // let authId = req.query.authorId;
//     // let cat = req.query.category;
//     // let subcat = req.query.subcategory;
//     // let tag = req.query.tags;



//     // if (query.isPublished === "true") {
//     //   return res
//     //     .status(404)
//     //     .send("Sorry you are not allowed to delete this blog ");
//     // }

//     const blogFound = await blogModel.findOne({query});

//     if (blogFound.isPublished === true) {
//       return res
//         .status(404)
//         .send({status:"false",msg:"Sorry you are not allowed to delete this blog"} );
//     }
    

//     if (blogFound.isDeleted === true) {
//       return res.status(404).send({ Status: "false", msg: "blog is deleted " });
//     }

   
//     let deletedBlogs = await blogModel.findOneAndUpdate(
//       {
//         // $and: [
//         //   { authorId: authId },
//         //   { category: cat },
//         //   { subcategory: subcat },
//         //   { tags: tag },
//         // ],
//         query
//       },
//       { isDeleted: true, deletedAt: new Date() },
//       { new: true }
//     );
//     //*Validation
//     if (!deletedBlogs)
//       return res
//         .status(404)
//         .send({ msg: "enter valid queries,blog not found" });
//     res.status(200).send({ status: true, msg: deletedBlogs });
//   } catch (err) {
//     res.status(500).send({ status: false, msg: "Error", err: err.message });
//   }
// };

module.exports.createInten = createInten;

