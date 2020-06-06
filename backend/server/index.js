import express from 'express';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import apiRoutes from './api/apiRoutes';
import { connect } from '../database/index';
import socketConnection from './api/socketConnection';


// setup
const app = express();
const PORT = process.env.PORT || 5000;
app.disable('x-powered-by');

// middleware
app.use(morgan('dev', {
  skip: req => ['/meta/site.webmanifest', '/meta/favicon-32x32.png', '/bundle.js'].includes(req.url)
}));

app.use(express.json());
/*
app.use((req, res, next) => {
  try {
    if (req.headers?.authorization?.split(' ')[0] === 'Bearer') {
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, secret, (err, decode) => {
        if (err) {
          // req.expiredUser = jwtDecode(token);
          req.user = undefined;
        } else {
          // for loginRequired middleware
          req.user = decode;
        }
        next();
      });

    } else {
      req.user = undefined;
      next();
    }
  } catch (e) {
    res.sendStatus(400);
  }
});
*/
app.use('/api', apiRoutes);
app.use(express.static('client/public'));


// database and server
connect();
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// socket.io/database
socketConnection(server);