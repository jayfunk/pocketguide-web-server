const fetchEvents = require('./fetchEvents')
const normalizeEvent = require('./normalizeEvent')
const isLastModifiedOld = require('./isLastModifiedOld')

function mobile (req, res, next) {
  isLastModifiedOld(req.get('Last-Modified'))
    .then((isOld) => {
      if (!isOld) {
        console.log('Response Code 304: Last modified was not old')
        return res.status(304).end()
      }
      return startFetch(res, next)
    })
    .catch((error) => {
      if (error && error.code === 'ECONNREFUSED') {
        console.log('Unable to connect to memcache loading messages from Google ', error)
        return startFetch(res, next)
      }
      console.error(error)
      res.status(500)
    })
}

function startFetch (res, next) {
  return fetchEvents()
    .then((events) => {
      res.send({
        events: events.map(normalizeEvent)
      })
    })
    .catch(next)
}

module.exports = mobile

/*
  res.send({
    events: [{
      id: 1,
      name: 'D20 Adventuring',
      startTime: '5:11:00 PM',
      endTime: '7:11:00 PM',
      dateOfEvent: '4/29/2016',
      location: 'Margaritaville: D20',
      description: 'Come for a silly adventure as our fates are controlled by a giant inflatable D20 as master minded by a Wagon Drunk Christine.',
      shortDescription: 'Come for a silly adventure as our fates are controlled by a giant infl...',
      coordinates: [33.376888, -83.336285],
      latitude: 33.376888,
      longitude: -83.336285,
      hasCoordinates: true,
      intendedAges: 'All Ages',
      themeCampName: 'Margaritaville:D20'
    }]
  })
*/
