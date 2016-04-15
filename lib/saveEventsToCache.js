const Promise = require('bluebird')
const memjs = require('memjs')

const EVENTS_CACHE_EXPIRATION_IN_SECONDS = process.env.EVENTS_CACHE_EXPIRATION_IN_SECONDS

function saveEventsToCache (events) {
  const client = memjs.Client.create()

  return new Promise((resolve, reject) => {
    client.set('events', JSON.stringify(events), function (error) {
      if (error) return reject(error)
      resolve()
    }, EVENTS_CACHE_EXPIRATION_IN_SECONDS);
  });
}

module.exports = saveEventsToCache
