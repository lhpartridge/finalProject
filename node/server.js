const express = require('express')
const server = express()

const helmet = require('helmet')
const cors = require('cors')
const router = require('./app/routes/router')
const PORT = process.env.PORT || 3005

//security
server.use(helmet())
server.use(cors())

server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use('/api', router)

server.listen(PORT, ()=> {
    console.log(`Port: ${PORT}`)
})