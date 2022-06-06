const express = require('express');
var jwt = require('jsonwebtoken');
var fileupload = require("express-fileupload");


// Setup server port
const port = process.env.PORT || 5002;
// create express app
const app = express()
const cors = require('cors');
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(express.json())
app.use(cors());
app.use(fileupload());


app.get('/', (req, res) => {
    res.status(200).send({ status: "Server for 'invoicePlus' is works!"});
});

app.use('/api/v1/companyref', require('./src/Routes/companyref.routes'));


// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});