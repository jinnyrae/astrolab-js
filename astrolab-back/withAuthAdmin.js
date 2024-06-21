const jwt = require('jsonwebtoken');
const secret = 'w3a-project-pour-la-formation-fullstack-javaScript';

const withAuthAdmin = (req, res, next) => {
  const token = req.headers['x-access-token']; // recuperation du token dans le header de la requête
  if (!token) {
    // Token introuvable
    res.json({
      status: 401,
      msg: 'Token introuvable!',
    });
  } else {
    //Verification jsonwebtoken
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        res.json({
          status: 401, // echeque de verification
          msg: 'Token invalide',
        });
      } else {
        if (decoded.role !== 'admin') {
          res.json({ status: 401, msg: 'Acces interdite!' }); // echeque de verification
        } else {
          // recuperation des information de l'utilisateur par son id
          req.id = decoded.id;
          next(); // la fonction callback de la route protégée
        }
      }
    });
  }
};
module.exports = withAuthAdmin;
