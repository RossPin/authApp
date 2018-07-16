
const express = require('express')
const server = express()
const routes = require('./routes/routes.js')
const auth = require('./routes/auth.js')

server.use('/', routes)

server.use(express.json())
server.use('/api/auth', auth)

module.exports = server