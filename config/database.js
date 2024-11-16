let mongoose = require("mongoose")
const url = 'mongodb://127.0.0.1:27017/noteApp'

exports.connectdb = async()=>{
  await mongoose.connect(url)
  console.log("data base is Connected");
}
