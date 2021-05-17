const http = require('http');
const express = require('express');
const webServerConfig = require('../config/web-server.js');

const auth = require('./authentification');
const dotenv = require('dotenv');

let httpServer;
 
function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    app.use(
      express.urlencoded({
        extended: true
      })
    )
    app.use(express.json());
    httpServer = http.createServer(app);
    
    dotenv.config();
    //require('crypto').randomBytes(64).toString('hex')
    //process.env.TOKEN_SECRET

    app.get('/', (req, res) => {
      res.send({ message: 'on /' });
    });

    app.get('/books', auth.authenticateJWT, (req, res) => {
      const { role } = req.user;
  
      if (role !== 'admin') {
          return res.sendStatus(403);
      }
  
      res.send(role);
  });
  
    auth(app);

    require("../routes/library.routes.js")(app);
    require("../routes/books.routes.js")(app);
 
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