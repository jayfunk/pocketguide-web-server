require('dotenv').config({ silent: true })

const express = require('express')
const events = require('./lib/events')

const app = express()

app.get('/api/events', events)

const port = process.env.PORT
const server = app.listen(port, function () {
  console.log(`pocketguide-web-server listening on :${server.address().port}`)
})
