const express = require('express');
const router = express.Router();
const db = require('../db')

router.get('/all', async (req, res) => {
    console.log('running got all sightings');

    try {
        let sightings = await db.any(
        `SELECT * FROM sightings 
        JOIN researchers ON researchers.id = sightings.researcher_id 
        JOIN species ON species.id = sightings.species_id 
        JOIN habitats ON habitats.id = sightings.habitat_id
        ORDER BY sightings`)
        console.log('got all sightings!' , sightings)
        res.json({
            payload: sightings,
            message: "Retrieved all the sightings"
        })
    } catch (error) {
        console.log(error)
        res.json({
            messag1e: 'error something went wrong! Could not retrieve all sightings.'
        })
    }
})

router.get('/species/:id', async (req, res) => {
    let species_id = req.params.id

    try {

        let specificSpecieQuery = `SELECT * FROM sightings JOIN species ON species.id = sightings.species_id WHERE species_id = $1`;
        let specieSighting = await db.any(specificSpecieQuery, [species_id]);
        console.log('specific species sighting:', specieSighting);

        res.json({
            payload: specieSighting,
            message: "Retrieving all sighting of a specific species"
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: "error something went wrong. Could not retrieve all specific sighting"
        })
    }
})

router.get('/researchers/:id', async (req, res) => {
    let researcher_id = req.params.id

    try {

        let specificResearcherQuery = `SELECT * FROM sightings JOIN researchers ON researchers.id = sightings.researcher_id WHERE researcher_id = $1`
        let researcherSighting = await db.any(specificResearcherQuery, [researcher_id]);
        console.log('specific researcher sighting:', researcherSighting);
        res.json({
            payload: researcherSighting,
            message: "Retrieving all sighting of a specific researcher"
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: "Error. Could not retrieve all sightings of a specific researchers"
        })
    }
})

router.get('/habitats/:id', async (req, res) => {
    let habitat_id = req.params.id

    try {

        let specificHabitatsQuery = `SELECT * FROM sightings JOIN habitats ON habitats.id = sightings.habitat_id WHERE habitat_id = $1`;
        let habitatSighting = await db.any(specificHabitatsQuery, [habitat_id]);
        console.log('specific Habitat sighting:', habitatSighting);

        res.json({
            payload: habitatSighting,
            message: "Retrieving all sighting of a specific habitat"
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: "ERROR. Could not retrieve all sighting for a specific habitat"
        })
    }
})

router.post('/register', async (req, res) => {
    let researcher_id = req.body.researcher_id
    let species_id = req.body.species_id;
    let habitat_id = req.body.habitat_id;
    let insertSighting =
        `INSERT INTO sightings (researcher_id, species_id, habitat_id)
             VALUES ($1, $2, $3)`;



    try {
        let postQuery = await db.none(insertSighting, [researcher_id, species_id, habitat_id]);
        let registerPost = ([researcher_id, species_id, habitat_id])
        res.json({
            payload: registerPost,
            message: "Success, new sighting added."
        })
    } catch (error) {
        console.log(error)
        res.json({ err: error })
    }

})

router.delete('/:id', async (req, res) => {
    let sightings_id = req.params.id

    try {
        let deleteSighting = `DELETE FROM sightings where id = $1`
        await db.any(deleteSighting, [sightings_id])
        res.json({
            message: "This sighting was deleted."
        })
    } catch (error) {
        res.json({
            message: "There was an error deleting the sighting"
        })
    }
})




module.exports = router; 