const mongoose = require("mongoose")

const usermodel = new mongoose.Schema({
  firstName: {
    type : String,
    required : true,
    minLength :5,
    upperCase : true
  },
  SecondName:{
    type : String,
    required: true
  },
  age :{
    type : Number,
    min : 18
  },
  Gender:{
    type : String,
    validate:{
     validator : function(value)
     {
      return ['male','female','other'].includes(value)
     },
     message : "Enter a valid gender"
    }
  },
  _id:{
    type : Number,
    required: true,
    // unique : true
  },
  emailId:{
    type : String,
    required :true,
    unique :true,
    trim : true
  }
},{
  timestamps : true
})
const Schema = mongoose.model('user',usermodel)
module.exports = Schema;