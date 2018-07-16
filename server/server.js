const express = require('express')
const server = express()
const router = require('./routes/routes.js')

server.use('/', router)

module.exports = server