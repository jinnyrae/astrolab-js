const express = require('express');
const app = express();
const mysql = require('promise-mysql');
const cors = require('cors');
app.use(cors());
const fileUpload = require('express-fileupload');
app.use(fileUpload({ createParentPath: true }));

//Parse les url
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

let config;
if (!process.env.HOST) {
  config = require('./config-offline');
} else {
  config = require('./config-online');
}

// Connexion à la DB
const host = process.env.HOST_DB || config.db.host;
const database = process.env.DATABASE_DB || config.db.database;
const user = process.env.USER_DB || config.db.user;
const password = process.env.PASSWORD_DB || config.db.password;
const port = process.env.PORT_DB || config.db.port;

// Importer les routes
const authRoute = require('./routes/authRoute');
const orderRoute = require('./routes/orderRoute');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const searchRoute = require('./routes/searchRoute');

mysql
  .createConnection({
    host: host,
    database: database,
    user: user,
    password: password,
    port: port,
  })
  .then((db) => {
    console.log('Connected to database! ');

    app.get('/', async (req, res, next) => {
      res.json({ status: 200, msg: 'Database Astrolab 11' });
    });

    userRoute(app, db);
    productRoute(app, db);
    orderRoute(app, db);
    authRoute(app, db);
    searchRoute(app, db);
  })
  .catch((error) => console.log(error));

const PORT = 9500;
app.listen(PORT, () => {
  console.log(`Serveur à l'ecoute sur le port ${PORT}`);
});
