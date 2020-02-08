const express = require('express')
const port = 3000
const app = express()

app.get('/', (req, res) => {
    res.statusCode = 200
    res.send('Welcome to the Convention Centre API!')
})

app.get('/conventions', (req, res) => {
    res.statusCode = 200
    res.send()
})

app.get('/conventions/:id', (req, res) => {
    res.statusCode = 200
    res.send()
})

app.get('conventions/:id/rooms', (req, res) => {
    res.statusCode = 200
    res.send()
})

app.get('/rooms', (req, res) => {
    res.statusCode = 200
    res.send()
})

app.listen(port, () => console.log(`App is running (port ${port})`))
