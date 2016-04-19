const Promise = require('bluebird')
const memjs = require('memjs')

function isLastModifiedOld (lastModifiedEpoch) {
  return new Promise((resolve, reject) => {
    const client = memjs.Client.create()

    client.get('last_saved', function (error, lastSaved) {
      if (error) return reject(error)
      if (!lastSaved) return resolve()

      if (!lastModifiedEpoch || lastModifiedEpoch < lastSaved) {
        return resolve()
      }
      return reject()
    })
  })
}

module.exports = isLastModifiedOld
