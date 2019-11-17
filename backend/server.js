const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app.use(express.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(express.json());


app.listen(port, ()=>{
    console.log('Server is running on port 3000.')
})