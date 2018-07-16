const express = require('express')
const router = express.Router()
const {getUsers} = require('../db/db')

router.get('/', (req, res) => {
    getUsers().then(users => {
        console.log(users)
        res.send('Hello')
    })   
    
})

module.exports = router