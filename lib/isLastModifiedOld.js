const Promise = require('bluebird')
const memjs = require('memjs')

function isLastModifiedOld (lastModifiedEpoch) {
  return new Promise((resolve, reject) => {
    console.log('lastModifiedEpoch', lastModifiedEpoch)
    if (!lastModifiedEpoch) return resolve(true)

    const client = memjs.Client.create()

    client.get('last_saved', function (error, lastSaved) {
      if (error) {
        reject(error)
      } else {
        resolve(!lastSaved || lastModifiedEpoch < lastSaved)
      }
    })
  })
}

module.exports = isLastModifiedOld
