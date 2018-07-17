
const express = require('express')
const server = express()
const routes = require('./routes/routes.js')
const auth = require('./routes/auth.js')
const path = require('path')

server.use('/', routes)

server.use(express.static(path.join(__dirname, '../public')))

server.use(express.json())
server.use('/api/auth', auth)

module.exports = server