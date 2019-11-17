const express = require('express');
const router = express.Router();
//const db = require('../db')


router.get('/all', async (req, res) => {
    console.log('running');

    try {
        let researchers = await db.any('SELECT * FROM researchers')
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






module.exports = router;










