let axios = require("axios");
//const { get } = require("../routes/route");


let getStates = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getOtp = async function (req, res) {
    try {
        let blahhh = req.body

        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

//================Assignment/1===================       

let districtsId = async function (req, res) {
    try {
        let id = req.query.district_id;
        let date = req.query.date;
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict/?district_id=${id}&date=${date}`,
        }
        let result = await axios(options)
        res.send({ status: true, data: result.data })
    }
    catch (error) {

        console.log(error)
        res.send({ status: false, msg: error.message })
    }
}


module.exports.getStates = getStates
module.exports.getDistricts = getDistricts
module.exports.getByPin = getByPin
module.exports.getOtp = getOtp
module.exports.districtsId = districtsId


//---> Assignment 2

const getCityTemprature = async function (req, res) {
    try{
        let arr = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
    let new_arr = [], j = 0
    for (i = 0; i < arr.length; i++) {
        let obj = { city: arr[i] }
        var options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${arr[i]}&appid=b5343e83a01bae805bfd29a3b9da3e2f`
        }
        let result = await axios(options)
        obj.temp = result.data.main.temp
        new_arr.push(obj)

    }
    let sorted = new_arr.sort(function (a, b) { return a.temp - b.temp })
    res.status(200).send({ status: true, msg: sorted })
    }catch(error){
        console.log(error);
        req.status(500).send({ status: false, msg: error.message })
    }
    
}
module.exports.getCityTemprature = getCityTemprature

// ==============>  Assignment 3 <================

const editMemes = async function (req, res) {
    try{
        let template_id = req.query.template_id
    let text0 = req.query.text0
    let text1 = req.query.text1
    let username = req.query.username
    let password = req.query.password
    
    let options={
        method:"post",
        url:`https://api.imgflip.com/caption_image?template_id=${template_id}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`,
    }
    let result=await axios(options)
    res.send(result.data)
    }catch(error){
        console.log(error);
        req.status(500).send({status: false, msg: error.message})
    }
    
}

module.exports.editMemes=editMemes