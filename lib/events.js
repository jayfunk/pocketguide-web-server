const google = require('googleapis')
const request = require('request')
const csv = require('csv')
const camelCase = require('lodash/camelCase')

function events (req, res, next) {
  const jwtClientEmail = process.env.GOOGLE_JWT_CLIENT_EMAIL
  const pemPath = null
  const pemContents = process.env.GOOGLE_JWT_PRIVATE_KEY.split('\\n').join('\n')
  const scopes = [
    'https://www.googleapis.com/auth/drive.metadata.readonly',
    'https://www.googleapis.com/auth/drive.readonly'
  ]
  const jwtUserEmail = null
  const jwtClient = new google.auth.JWT(
    jwtClientEmail,
    pemPath,
    pemContents,
    scopes,
    jwtUserEmail
  )

  jwtClient.authorize(function (error, tokens) {
    if (error) {
      console.error('Error authorizing with Google', error)
      res.status(500)
      res.send({message: error.message})
      return
    }

    const drive = google.drive({ version: 'v2' })
    const params = {
      auth: jwtClient,
      fileId: process.env.GOOGLE_FILE_ID
    }

    drive.files.get(params, function (error, file, response) {
      if (error) {
        console.error('Error retrieving events from Google Drive', error)
        res.status(500)
        res.send({message: error.message})
        return
      }

      var url
      var requestSettings = {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + jwtClient.credentials.access_token
        },
        encoding: null // Does not try to parse file contents as UTF-8
      }

      url = file.exportLinks['text/csv']
      if (!url) {
        res.status(500)
        res.send({message: 'No download url was returned by the Google Drive API'})
        return
      }

      requestSettings.url = url
      request(requestSettings, function (err, response, body) {
        if (err) {
          console.error('Error downloading file from Google Drive', error)
          res.status(500)
          res.send({message: error.message})
          return
        }
        // body is a buffer with the file's contents
        csv.parse(body.toString(), {columns: true, skip_empty_lines: true}, function (error, rows) {
          if (error) {
            console.error('Error downloading file from Google Drive', error)
            res.status(500)
            res.send({message: error.message})
            return
          }

          res.send(rows.map(function (row) {
            return Object.keys(row).reduce(function (normalizedRow, key) {
              normalizedRow[normalizeFieldName(key)] = row[key]
              return normalizedRow
            }, {})
          }))
        })
      })
    })
  })
}

module.exports = events

function normalizeFieldName (fieldName) {
  // TODO: Replace section in trailing parens
  return camelCase(fieldName)
}
