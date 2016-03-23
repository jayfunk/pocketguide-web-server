const express = require('express');

const app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

const port = process.env.PORT;
const server = app.listen(port, function () {
  console.log(`pocketguide-web-server listening on :${server.address().port}`);
});
