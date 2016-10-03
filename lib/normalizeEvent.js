const camelCase = require('lodash/camelCase')

function normalizeEvent (event) {
  const normalizedEvent = Object.keys(event)
    .reduce(function (normalizedEvent, key) {
      normalizedEvent[normalizeFieldName(key)] = event[key]
      return normalizedEvent
    }, {})
  return transformEvent(normalizedEvent)
}

module.exports = normalizeEvent

function normalizeFieldName (fieldName) {
  return camelCase(fieldName.replace(/^(.*)\(.*\)$/, function (fullString, match) {
    return match
  })).trim()
}

function transformEvent (event) {
  const transformedEvent = transformCoordinates(event)

  transformedEvent.id = event.id ? event.id : '' + Math.random() + ''
  transformedEvent.name = event.eventName.trim()
  transformedEvent.startTime = event.startTime.trim()
  transformedEvent.endTime = event.endTime.trim()
  transformedEvent.dateOfEvent = event.dateOfEvent.trim()
  transformedEvent.location = event.location.trim()
  transformedEvent.description = event.eventDescription.trim()
  transformedEvent.shortDescription = transformedEvent.description.substring(0, 70) + '...'
  transformedEvent.intendedAges = event.intendedAges.trim()
  transformedEvent.themeCampName = event.themeCampName.trim()

  return transformedEvent
}

function transformCoordinates (event) {
  const latitude = Number(event.locationLatitude.trim())
  const longitude = Number(event.locationLongitude.trim())

  if (Number.isNaN(latitude) || latitude === 0 || Number.isNaN(longitude) || longitude === 0) {
    return {
      latitude: null,
      longitude: null,
      coordinates: null,
      hasCoordinates: false
    }
  }

  return {
    latitude,
    longitude,
    coordinates: [latitude, longitude],
    hasCoordinates: true
  }
}
