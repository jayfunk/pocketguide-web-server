const google = require('googleapis')
const Promise = require('bluebird')
const request = require('request-promise')
const parse = Promise.promisify(require('csv').parse)

const drive = google.drive({ version: 'v2' })
const getFile = Promise.promisify(drive.files.get)

function fetchEvents () {
  const jwtClientEmail = process.env.GOOGLE_JWT_CLIENT_EMAIL
  const pemPath = null
  const pemContents = process.env.GOOGLE_JWT_PRIVATE_KEY.split('\\n').join('\n')
  const scopes = [
    'https://www.googleapis.com/auth/drive.metadata.readonly',
    'https://www.googleapis.com/auth/drive.readonly'
  ]
  const jwtClient = new google.auth.JWT(
    jwtClientEmail,
    pemPath,
    pemContents,
    scopes
  )

  function authorize () {
    return new Promise((resolve, reject) => {
      jwtClient.authorize((error) => {
        if (error) return reject(error)
        resolve()
      })
    })
  }

  return authorize()
    .then(() => {
      return getFile({
        auth: jwtClient,
        fileId: process.env.GOOGLE_FILE_ID
      })
    })
    .then((file) => {
      return request({
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + jwtClient.credentials.access_token
        },
        url: file.exportLinks['text/csv']
      })
    })
    .then((body) => {
      return parse(body.toString(), {columns: true, skip_empty_lines: true})
    })
}

module.exports = fetchEvents
