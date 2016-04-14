require('dotenv').config({ silent: true })

const express = require('express')
const mobile = require('./lib/mobile')

const app = express()

app.get('/api/mobile', mobile)

const port = process.env.PORT
const server = app.listen(port, function () {
  console.log(`pocketguide-web-server listening on :${server.address().port}`)
})
