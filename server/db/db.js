const knex = require('knex')
const config = require('../../knexfile').development
const conn = knex(config)

function getUsers(testDb) {
    const db = testDb || conn
    return db('users')
}

module.exports = {
    getUsers
}