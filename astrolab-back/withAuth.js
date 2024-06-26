const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;

const withAuth = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    // Token introuvable
    res.json({ status: 401, msg: 'Token introuvable!' });
  } else {
    // Verification jsonwebtoken
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        res.json({ status: 401, msg: 'Token invalide!' }); // echeque de verification
      } else {
        req.id = decoded.id; //recuperation de l'informations de l'utilisateur par son id
        next(); // la fonction callback de la route protégée
      }
    });
  }
};
module.exports = withAuth;
