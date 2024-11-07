// let express = require("express")
// let app = express()

// app.use('/admin/:userId/:password',(req,res,next)=>{
//   console.log("the request is made from ",req.originalUrl);
//   let password = req.params.password;
//   let userId = req.params.userId;
//   if((password === "Abhi@8970") && (userId === "Abhishek"))
//   {
//     next();
//   }
//   else{
//     res.status(401).send("credentials not matched")
//   }
// })


// app.get("/admin/:userId/:password/get",(req,res)=>{
//   res.send(`{
//     'name':'Abhishek Shukla';
//     'DOB' : 06/11/2001
//     'Address' : '57,4th A cross KempeGowda Layout K narayanapura Banagalore'
//     'School' : 'Soniya English High School'

//     }`);
// })

// app.listen(5000,err=>{
//   console.log("Server Started");
// })
const express = require('express');
const app = express();

app.get('/example', (req, res) => {
    try {
        // Some code that could throw an error
        let result = riskyOperation();
        res.send(result);
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send('Something went wrong!');
    }
});

// A simple function to simulate an error
function riskyOperation() {
    throw new Error('Unexpected error!');
}

app.listen(3000, () => console.log('Server running on port 3000'));
