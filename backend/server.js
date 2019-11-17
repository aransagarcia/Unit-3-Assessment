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



const researcherRouter = require('./routes/researchers');
const speciesRouter = require('./routes/species');
const animalsRouter = require('./routes/animals');
const habitatsRouter = require('./routes/habitats')
// const sightingsRouter = require('./routes/sightings');
 


app.use('/researchers', researcherRouter);
app.use('/species', speciesRouter);
app.use('/animals', animalsRouter);
app.use('/habitats', habitatsRouter);










app.listen(port, ()=>{
    console.log('Server is running on port 3000.')
})