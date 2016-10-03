# Pocket Guide Web Server

## Configuring

The app reads configuration from the environment. The following variables need
to be set. Newlines in the private key should be encoded as "\n".

* PORT
* GOOGLE_JWT_CLIENT_EMAIL
* GOOGLE_JWT_PRIVATE_KEY
* GOOGLE_FILE_ID
* EVENTS_CACHE_EXPIRATION_IN_SECONDS
* MEMCACHE_SERVERS
* MEMCACHE_USERNAME
* MEMCACHE_PASSWORD

The last three variables are used by the [memjs](https://github.com/alevy/memjs)
module. See the memjs README for more information.

When developing locally, you can create a `.env` file in the root of the project
with the following contents. These variables will be loaded into the environment
automatically when the server starts.

```
PORT=3000
GOOGLE_JWT_CLIENT_EMAIL=<Your Google Service Account Client Email>
GOOGLE_JWT_PRIVATE_KEY=<Your Google Service Account Private Key>
GOOGLE_FILE_ID=<File ID of spreadsheet>
EVENTS_CACHE_EXPIRATION_IN_SECONDS=30
MEMCACHE_SERVERS=<host and port>
MEMCACHE_USERNAME=<username>
MEMCACHE_PASSWORD=<password>
```

### Note
Ensure the file id is shared with the client email registered for google services.
