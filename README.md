# pocketguide-web-server

## Configuring

Create a `.env` file in the root of the project with the following contents.
These variables will be loaded into the environment automatically when the
server starts. Newlines in the private key should be encoded as "\n".

```
PORT=3000
GOOGLE_JWT_CLIENT_EMAIL=<Your Google Service Account Client Email>
GOOGLE_JWT_PRIVATE_KEY=<Your Google Service Account Private Key>
```