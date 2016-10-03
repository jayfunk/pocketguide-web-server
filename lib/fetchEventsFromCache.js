const Promise = require('bluebird')
const memjs = require('memjs')

function fetchEventsFromCache () {
  return new Promise((resolve, reject) => {
    const client = memjs.Client.create()

    client.get('events', function (error, events) {
      if (error) return reject(error)
      if (!events) return reject(new Error('No events found in cache'))

      resolve(JSON.parse(events.toString()))
    })
  })
}

module.exports = fetchEventsFromCache
