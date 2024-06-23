const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = (_db) => {
  db = _db;
  return UserModel;
};
class UserModel {
  // insert un utilisateur
  static insertOneUser(req) {
    return bcrypt
      .hash(req.body.password, saltRounds)
      .then((hash) => {
        return db
          .query(
            'INSERT INTO Users (firstName, lastName, email,password, phone, addressLine1, addressLine2, city, country, createTimeStamp, role) VALUES(?, ?, ?, ?, ?, ? ,? , ?, ? , NOW(), "user")',
            [
              req.body.firstName,
              req.body.lastName,
              req.body.email,
              hash,
              req.body.phone,
              req.body.addressLine1,
              req.body.addressLine2,
              req.body.city,
              req.body.country,
            ],
          )
          .then((res) => {
            return res;
          })
          .catch((error) => {
            return error;
          });
      })
      .catch((error) => console.log(error));
  }

  // get user avec son email
  static getUserByEmail(email) {
    return db
      .query('SELECT * FROM Users WHERE email= ?', [email])
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }
  // get user avec son id
  static getUserById(id) {
    return db
      .query('SELECT * FROM Users WHERE id= ? ', [id])
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }
  // Update user

  static updateUser(req, id) {
    return db
      .query(
        'UPDATE Users SET firstName= ?, lastName= ?, phone=?, addressLine1= ?, addressLine2=?, city=?, country=? WHERE id=?',
        [
          req.body.firstName,
          req.body.lastName,
          req.body.phone,
          req.body.addressLine1,
          req.body.addressLine2,
          req.body.city,
          req.body.country,
          id,
        ],
      )
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }
  // get all users
  static getAllUsers(res) {
    return db
      .query('SELECT * FROM Users', [])
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }
  // Update de la derniere connexion de l'utilisateur
  static updateConnexion(id) {
    return db
      .query('UPDATE Users set connexionTimeStamp= NOW() WHERE id= ?', [id])
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }
  // Delete account:
  static deleteUser(id) {
    return db
      .query('DELETE FROM Users WHERE id = ?', [id])
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }
  //Modification du role d'un user
  static updateUserRole(req, id) {
    return db
      .query('UPDATE Users SET role= ? WHERE id= ?', [req.body.role, id])
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }
}
