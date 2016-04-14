const fetchEvents = require('./fetchEvents')
const normalizeEvent = require('./normalizeEvent')

function mobile (req, res, next) {
  fetchEvents()
    .then((events) => {
      res.send({
        events: events.map(normalizeEvent)
      })
    })
    .catch((error) => {
      res.status(500)
      res.send({message: error.message})
    })
}

module.exports = mobile
