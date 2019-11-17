const express = require('express');
const router = express.Router();
const db = require('../db')


router.get('/all', async (req, res) => {
    console.log('running');

    try {
        let researchers = await db.any('SELECT * FROM researchers')
        console.log('got all researchers!')
        res.json({
            payload: researchers,
            message: "Retrieved all the researchers"
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: 'error something went wrong! Could not retrieve all researchers.'
        })
    }
})

router.get('/:id', async (req, res) => {
    let researcher_id = req.params.id;

    try {
        let researcherQuery = `SELECT * FROM researchers WHERE id = $1`;
        let researcher = await db.one(researcherQuery, [researcher_id]);
        console.log('single researcher:', researcher);
        res.json({
            payload: researcher,
            message: "SINGLE RESEARCHER received"
        })
    }
    catch (error) {
        console.log(error)
        res.json({ "err": "This RESEARCHER does not exist" });
    }
});


router.post('/register', async  (req, res) => {

    try {
 let insertNewResearcher = 
        `INSERT INTO researchers (name, job_title)
         VALUES ($1, $2)`

        await db.none(insertNewResearcher, [req.body.name, req.body.job_title])
        res.json({
            payload: req.body,
            message: "POST request arrived, New Researcher has been registered!"
        })
    } catch (error) {
        res.json({
            message: "there was an error registering researcher"
        })
    }
})


 router.delete('/:id', async (req, res)=>{
let researcher_id = req.params.id

try{
    let deleteResearcher = `DELETE FROM researchers where id = $1`
    await db.any(deleteResearcher, [researcher_id])
    res.json({
        message: "This Researcher was Deleted"
    })
} catch (error) {
    res.json({
        message: "There was an error deleting researcher"
    })
}
})












module.exports = router;










