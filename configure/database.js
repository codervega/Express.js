const mongoose = require("mongoose")
let database = async()=>{
  try{
    await mongoose.connect("mongodb+srv://abhishekshukla8970:QGdfNLGZGYHy2aYW@abhi.veq32.mongodb.net/project1")
    console.log("DB connected");
  } catch(error) {
    console.log(error);
    process.exit(1);
  }
}
module.exports = database
