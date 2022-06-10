const express = require('express');

var fileupload = require("express-fileupload");


// Setup server port
const port = process.env.PORT || 5003;
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

app.use('/api/v1/invoice', require('./src/routes/invoice.routes'));


// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});