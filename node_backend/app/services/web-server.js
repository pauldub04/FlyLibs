const http = require('http');
const express = require('express');
const webServerConfig = require('../config/web-server.js');

let httpServer;
 
function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = http.createServer(app);
    
    app.get('/', (req, res) => {
      res.send({ message: 'on /' });
    });

    require("../routes/library.routes.js")(app);
 
    httpServer.listen(webServerConfig.port)
      .on('listening', () => {
        console.log(`Web server listening on localhost:${webServerConfig.port}`);
 
        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}
 
module.exports.initialize = initialize;