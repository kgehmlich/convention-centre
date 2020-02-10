const express = require('express')
const {
    getConventions,
    getConventionById,
    getConventionRooms,
    getRooms
} = require('./request-handlers')
const seeder = require('./db-seeder')

const port = 3000
const app = express()


seeder.seedDb()


app.get('/', (req, res) => {
    res.statusCode = 200
    res.send('Welcome to the Convention Centre API!')
})

app.get('/conventions', getConventions)

app.get('/conventions/:id', getConventionById)

app.get('/conventions/:id/rooms', getConventionRooms)

app.get('/rooms', getRooms)

app.listen(port, () => console.log(`App is running (port ${port})`))