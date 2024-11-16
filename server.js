const express = require("express");
const noteRouter = require("./router/noteRouter");
const { connectdb } = require("./config/database");
const app = express();

connectdb();

// Middleware to parse JSON
app.use(express.json());

// Mount the router at /api
app.use('/api', noteRouter);

app.listen(5000, (err) => {
  if (err) throw err;
  console.log("Server started on port 5000");
});
