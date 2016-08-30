const camelCase = require('lodash/camelCase')

function normalizeEvent (event) {
  return Object.keys(event)
    .reduce(function (normalizedEvent, key) {
      normalizedEvent[normalizeFieldName(key)] = event[key]
      return normalizedEvent
    }, {})
    .map(transformEvent)
}

module.exports = normalizeEvent

function normalizeFieldName (fieldName) {
  return camelCase(fieldName.replace(/^(.*)\(.*\)$/, function (fullString, match) {
    return match
  })).trim()
}

function transformEvent (event) {
  const transformedEvent = {}
  // need to ensure this doesnt blow up when transforming a piece that doesnt exist

  transformedEvent.id = event.id ? event.id : '' + Math.random() + ''
  transformedEvent.name = event.eventName.trim()
  transformedEvent.startTime = event.startTime.trim()
  transformedEvent.endTime = event.endTime.trim()
  transformedEvent.dateOfEvent = event.dateOfEvent.trim()
  transformedEvent.location = event.location.trim()
  transformedEvent.description = event.eventDescription.trim()
  transformedEvent.shortDescription = transformedEvent.description.substring(0, 70) + '...'
  transformedEvent.latitude = Number(event.locationLatitude.trim())
  transformedEvent.longitude = Number(event.locationLongitude.trim())
  transformedEvent.coordinates = [transformedEvent.latitude, transformedEvent.longitude]
  transformedEvent.hasCoordinates = (transformedEvent.latitude && transformedEvent.longitude && !Number.isNaN(transformedEvent.latitude) && !Number.isNaN(transformedEvent.longitude))
  transformedEvent.intendedAges = event.intendedAges.trim()
  transformedEvent.themeCampName = event.themeCampName.trim()

  return transformedEvent
}
