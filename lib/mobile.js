const fetchEvents = require('./fetchEvents')
const normalizeEvent = require('./normalizeEvent')

function mobile (req, res, next) {
  fetchEvents()
    .then((events) => {
      res.send({
        events: events.map(normalizeEvent)
      })
    })
    .catch(next)
}

module.exports = mobile
