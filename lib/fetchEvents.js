const fetchEventsFromCache = require('./fetchEventsFromCache')
const fetchEventsFromGoogle = require('./fetchEventsFromGoogle')
const saveEventsToCache = require('./saveEventsToCache')

function fetchEvents () {
  console.log('Fetching events from cache')

  return fetchEventsFromCache()
    .catch(() => {
      console.log('Cache miss, fetching events from Google')

      return fetchEventsFromGoogle()
        .then((events) => {
          console.log('Saving events to cache')

          saveEventsToCache(events)
            .catch((error) => {
              console.error('Error saving events to cache', error)
            })

          return events
        })
    })
}

module.exports = fetchEvents
