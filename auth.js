const jwt = require("jsonwebtoken");
const User = require("./configure/schema");

exports.auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;    // Use req.cookies to get the token
    console.log(token) 
    if (!token) {
      throw new Error("No Token");
    }
    console.log(token)
    // Verify the token
    const decoded = jwt.verify(token, "Abhi@123");
    console.log(decoded)
    
    const { name } = decoded;
    console.log(name)
    // Find the user by ID
    const user = await User.findOne({firstName: name});
    console.log(user)

    if (!user) {
      throw new Error("_id Does Not Exist");
    }

    // Attach the user data to the request object
    req.user = user;

    next();  
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};
