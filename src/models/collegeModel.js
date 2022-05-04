const { default: mongoose } = require("mongoose")


//*----------College MODEL--------------



// type:ObjectId,
// ref:"author",
// required: true,


// userSchema.path('downloadURL').validate((val) => {
//     urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
//     return urlRegex.test(val);
// }, 'Invalid URL.');


// { name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, logoLink: {mandatory}, isDeleted: {boolean, default: false} }

const collegeSchema = new mongoose.Schema(
{
        name: {
            type: String,
            required: true,
            unique:true
        }, 
        fullName: {
            type: String,
            required: true,
        }, 
        logoLink: {
            type: String,
            required: true
          
            }, 
        isDeleted: {
            default:false,
            type:Boolean,
        },
interests :[]

} ,{timestamps:true})

module.exports = mongoose.model("college", collegeSchema)


