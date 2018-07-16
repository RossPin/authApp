const express = require('express')
const router = express.Router()

const {issue} = require('../auth/token')
const {getUsers, userExists, createUser} = require('../db/users')
const {generate} = require('../auth/hash')

router.post('/register', register, issue)


function register(req, res, next){
    const {username} = req.body
    const hash = generate(req.body.password)
    userExists(username).then(exists => {
        if (exists) res.status(400).send({message: 'User exists'})
        else createUser(username, hash).then(id => {
            next()
        })
        .catch(err => {
            res.status(500).send({message: err.message})
        })
    })
}

module.exports = router