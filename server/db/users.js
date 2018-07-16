const knex = require('knex')
const config = require('../../knexfile').development
const conn = knex(config)

function getUsers(testDb) {
    const db = testDb || conn
    return db('users')
}

function getUserByName(username, testDb){
    const db = testDb || conn
    return db('users')
        .where('username', username)
        .first()
}

function userExists(username, testDb){
    const db = testDb || conn
    return db('users')
        .where('username', username)
        .then(users => {
            return users.length > 0
        })
}

function createUser(username, hash, testDb){
    const db = testDb || conn
    return db('users')
        .insert({username, hash})
}

module.exports = {
    getUsers,
    getUserByName,
    userExists,
    createUser
}