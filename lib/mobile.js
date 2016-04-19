const fetchEvents = require('./fetchEvents')
const normalizeEvent = require('./normalizeEvent')
const isLastModifiedOld = require('./isLastModifiedOld')

function mobile (req, res, next) {
  isLastModifiedOld(req.get('last-modified'))
    .then(() => {
      fetchEvents()
        .then((events) => {
          res.send({
            events: events.map(normalizeEvent)
          })
        })
        .catch(next)
    })
    .catch((error) => {
      if (error) {
        console.error(error)
      } else {
        console.log('Response Code 304: Last modified was not old')
        res.status(304)
      }
    })
}

module.exports = mobile
