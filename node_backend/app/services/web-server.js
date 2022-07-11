const http = require('http');
const express = require('express');
const path = require('path');
const webServerConfig = require('../config/web-server.js');

const auth = require('../routes/auth.routes');
const dotenv = require('dotenv');

let httpServer;
 
function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    app.use(express.json());
    httpServer = http.createServer(app);
    
    dotenv.config();
    //require('crypto').randomBytes(64).toString('hex')

    app.get('/', (req, res) => {
      res.send({ message: 'on /' });
    });

    app.use('/uploads', express.static('uploads'));
  
    auth(app);
    require("../routes/library.routes.js")(app);
    require("../routes/books.routes.js")(app);
    require("../routes/user.routes.js")(app);
 
    httpServer.listen(webServerConfig.port)
      .on('listening', () => {
        console.lozg(`Web server listening on localhost:${webServerConfig.port}`);
 
        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}
 
module.exports.initialize = initialize;
