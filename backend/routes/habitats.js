const express = require('express');
const router = express.Router();
const db = require('../db')

module.exports = router; 


router.get('/all', async (req, res) => {
    console.log('running got all habitats');

    try {
        let habitats = await db.any('SELECT * FROM habitats')
        console.log('Received all habitats!')
        res.json({
            payload: habitats,
            message: "Retrieved all the habitats"
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: 'Error retrieving all habitats.'
        })
    }
})

router.get('/:id', async (req, res) => {
    let habitats_id = req.params.id;

    try {
        let habitatsQuery = `SELECT * FROM habitats WHERE id = $1`;
        let habitats = await db.one(habitatsQuery, [habitats_id]);
        console.log('single habitat', habitats);
        res.json({
            payload: habitats,
            message: "SINGLE Habitat received"
        })
    }
    catch (error) {
        console.log(error)
        res.json({ "err": "This habitat does not exist" });
    }
});


router.post('/register', async  (req, res) => {

    try {
 let insertNewHabitat = 
        `INSERT INTO habitats (category)
         VALUES ($1)`

        await db.none(insertNewHabitat, [req.body.category])
        res.json({
            payload: req.body,
            message: "POST request arrived, New Habitat has been registered!"
        })
    } catch (error) {
        res.json({
            message: "There was an error registering Habitat"
        })
    }
})

module.exports = router; 