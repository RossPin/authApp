const jwt = require('jsonwebtoken')
const verifyJwt = require('express-jwt')

const {getUserByName} = require('../db/users')

function issue(req, res){
    getUserByName(req.body.username)
        .then(user => {
            const token = createToken(user, process.env.JWT_SECRET)
            res.json({message: 'Authentication successful', token})
        })
}

function createToken(user, secret){    
    return jwt.sign({
        id: user.id,
        username: user.username
    }, secret, {expiresIn: '1d'})
}

function decode(req, res, next){
    verifyJwt({
        secret: getSecret
    })(req, res, next)
}

function getSecret (req, payload, done) {
    done(null, process.env.JWT_SECRET)
  }

module.exports = {
    issue,
    decode
}