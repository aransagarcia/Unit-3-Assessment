const express = require('express');
const router = express.Router();
const db = require('../db')

module.exports = router; 


router.get('/all', async (req, res) => {
    console.log('running got all species');

    try {
        let species = await db.any('SELECT * FROM species')
        console.log('got all species!')
        res.json({
            payload: species,
            message: "Retrieved all the species"
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: 'error something went wrong! Could not retrieve all species.'
        })
    }
})

router.get('/:id', async (req, res) => {
    let species_id = req.params.id;

    try {
        let speciesQuery = `SELECT * FROM species WHERE id = $1`;
        let species = await db.one(speciesQuery, [species_id]);
        console.log('single researcher:', species);
        res.json({
            payload: species,
            message: "SINGLE specie received"
        })
    }
    catch (error) {
        console.log(error)
        res.json({ "err": "This SPECIE does not exist" });
    }
});


router.post('/register', async  (req, res) => {

    try {
 let insertNewSpecie = 
        `INSERT INTO species (name, is_mammal)
         VALUES ($1, $2)`

        await db.none(insertNewSpecie, [req.body.name, req.body.is_mammal])
        res.json({
            payload: req.body,
            message: "POST request arrived, New SPECIE has been registered!"
        })
    } catch (error) {
        res.json({
            message: "there was an error registering Specie"
        })
    }
})

module.exports = router; 