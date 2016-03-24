# Pocket Guide Web Server

## Configuring

The app reads configuration from the environment. The following variables need
to be set. Newlines in the private key should be encoded as "\n".

* PORT
* GOOGLE_JWT_CLIENT_EMAIL
* GOOGLE_JWT_PRIVATE_KEY
* GOOGLE_FILE_ID

When developing locally, you can create a `.env` file in the root of the project
with the following contents. These variables will be loaded into the environment
automatically when the server starts.

```
PORT=3000
GOOGLE_JWT_CLIENT_EMAIL=<Your Google Service Account Client Email>
GOOGLE_JWT_PRIVATE_KEY=<Your Google Service Account Private Key>
GOOGLE_FILE_ID=<File ID of spreadsheet>
```
