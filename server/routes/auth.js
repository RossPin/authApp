const express = require('express')
const router = express.Router()

const {issue, decode} = require('../auth/token')
const {getUsers, userExists, createUser, getUserByName} = require('../db/users')
const {generate, verifyUser} = require('../auth/hash')

router.post('/register', register, issue)

router.post('/login', login, issue)

//secure route
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

function login(req, res, next){
    const {username} = req.body    
    getUserByName(username).then(user => {
        if (verifyUser(user.hash, req.body.password)) next()
        else res.status(400).send({
            errorType: 'INVALID_CREDENTIALS'
          })
    })

}

module.exports = router