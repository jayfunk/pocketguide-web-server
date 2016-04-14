const camelCase = require('lodash/camelCase')

function normalizeEvent (event) {
  return Object.keys(event).reduce(function (normalizedEvent, key) {
    normalizedEvent[normalizeFieldName(key)] = event[key]
    return normalizedEvent
  }, {})
}

module.exports = normalizeEvent

function normalizeFieldName (fieldName) {
  return camelCase(fieldName.replace(/^(.*)\(.*\)$/, function (fullString, match) {
    return match
  })).trim()
}
