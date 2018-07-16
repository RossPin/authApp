const express = require('express')
const router = express.Router()

const {issue, decode} = require('../auth/token')
const {getUsers, userExists, createUser} = require('../db/users')
const {generate} = require('../auth/hash')

router.post('/register', register, issue)

router.get('/username', decode, (req, res) => {
    res.json({
        username: req.user.username
    })
} )


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