const express = require('express');
const router = express.Router();
const db = require('../db')

module.exports = router;

router.get('/all', async (req, res) => {
    console.log('running got all animals');

    try {
        let animals = await db.any('SELECT * FROM animals')
        console.log('got all animals!')
        res.json({
            payload: animals,
            message: "Retrieved all the animals"
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: 'error something went wrong! Could not retrieve all the animals.'
        })
    }
})

router.get('/:id', async (req, res) => {
    let animals_id = req.params.id;

    try {
        let animalsQuery = `SELECT * FROM animals WHERE id = $1`;
        let animals = await db.one(animalsQuery, [animals_id]);
        console.log('single researcher:', animals);
        res.json({
            payload: animals,
            message: "SINGLE animal received"
        })
    }
    catch (error) {
        console.log(error)
        res.json({ "err": "This animal does not exist" });
    }
});


router.post('/register', async (req, res) => {

    try {
        let insertNewAnimal =
            `INSERT INTO animals (species_id, nickname)
         VALUES ($1, $2)`

        await db.none(insertNewAnimal, [req.body.species_id, req.body.nickname])
        res.json({
            payload: req.body,
            message: "POST request arrived, New Animal has been registered!"
        })
    } catch (error) {
        res.json({
            message: "there was an error registering New Animal"
        })
    }
})

router.delete('/:id', async (req, res) => {
    let animals_id = req.params.id

    try {
        let deleteAnimal = `DELETE FROM animals where id = $1`
        await db.any(deleteAnimal, [animals_id])
        res.json({
            message: "This Animal was Deleted"
        })
    } catch (error) {
        res.json({
            message: "There was an error deleting Animal"
        })
    }
})

router.patch('/update', async (req, res)=>{
    let id = req.body.id;
    let species_id = req.body.species_id;
    let nickname = req.body.body;
    
    let patchQuery = await db.none(`UPDATE animals SET nickname = $1 WHERE species_id = $2 AND id = $3 `, [nickname, species_id, id]);
    try{
        let editPost = (patchQuery, [nickname, species_id, id])
        res.json({
            payload: editPost, 
            message: "Edits to animals were made!"
        })
    } catch (error){
        res.json({
            error: error
        })
    }
    })