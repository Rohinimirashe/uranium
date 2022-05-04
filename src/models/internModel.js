const { default: mongoose } = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
//{ name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}

//*--------Intern MODEL----------------
const internSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        collegeId: {
            type: ObjectId,
            ref: "college",
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        isDeleted:{ 
            type:Boolean,
             default: false
            }
    
    

 }, { timestamps: true });

module.exports = mongoose.model('intern', internSchema)




















// { fname: { mandatory}, lname: {mandatory},
//  title: {mandatory, enum[Mr, Mrs, Miss]},
//  email: {mandatory, valid email, unique}, password: {mandatory} }
// validate: [validateEmail, 'Please fill a valid email address'],
// match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']