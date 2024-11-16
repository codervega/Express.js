const validation = require("validator")

const valdata = (req)=>{
  const { firstName, SecondName, age, gender, emailId } = req;

  if(!firstName || !SecondName)
  {
    throw new Error("plz enter a valid name ")
  }
  else if(!validation.isEmail(emailId))
  {
    throw new Error("plz enter a valid mail id")
  }
}
module.exports = {
  valdata
}