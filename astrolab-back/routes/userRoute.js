const bcrypt = require('bcryptjs');
//const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = 'w3a-project-pour-la-formation-fullstack-javaScript';
const withAuth = require('../withAuth');
const withAuthAdmin = require('../withAuthAdmin');

module.exports = (app, db) => {
  const userModel = require('../models/UserModel')(db);

  // Route insert user
  app.post('/api/v1/Users/save', async (req, res) => {
    // Verification de l'existance de l'utilisateur
    const check = await userModel.getUserByEmail(req.body.email);
    if (check.code) {
      res.json({ status: 500, msg: "Echec de trouver l'tilisateur" }); //Internal Server Error
    } else {
      if (check.length > 0) {
        // Il y a un email, l'utilisateur exsiste dèja
        if (check[0].email === req.body.email) {
          res.json({ status: 401, msg: "L'Utilisateur existe dèja!" }); // echeque de verification
        }
      } else {
        // L'email n'existe pas, l'utilisateur peut créer un compt
        const user = await userModel.insertOneUser(req);
        if (user.code) {
          res.json({ status: 500, msg: "Erreur d'enregistrement" }); //Internal Server Error
        } else {
          res.json({
            status: 200,
            msg: "L'utilisateur a bien été enregistré!",
          });
        }
      }
    }
  });
  // Route de connexion d'un utilisateur
  app.post('/api/v1/Users/login', async (req, res) => {
    const check = await userModel.getUserByEmail(req.body.email);

    if (check.code) {
      res.json({ status: 500, msg: 'Erreur de vérification!' }); //Internal Server Error
    } else {
      if (check.length === 0) {
        // Check si l'email de l'utilisateur existe
        res.json({ status: 404, msg: 'Utilisateur introuvable!' });
      } else {
        // Si l'utilisateur exsiste, verification du mot de passe
        const verifyPassword = await bcrypt.compare(
          req.body.password,
          check[0].password,
        );
        if (verifyPassword) {
          // identique, creation du payload, le contenu du token
          const payload = { id: check[0].id, role: check[0].role };
          jwt.sign(
            payload,
            secret,
            { expiresIn: '1d' },
            async (error, token) => {
              if (error) {
                throw error;
              }

              const connect = await userModel.updateConnexion(check[0].id); // mettre à jour la date de connexion

              if (connect.code) {
                res.json({ status: 500, msg: 'Erreur de connexion' });
                return;
              } else {
                const user = {
                  id: check[0].id,
                  firstName: check[0].firstName,
                  lastName: check[0].lastName,
                  email: check[0].email,
                  phone: check[0].phone,
                  addressLine1: check[0].addressLine1,
                  addressLine2: check[0].addressLine2,
                  city: check[0].city,
                  country: check[0].country,
                  role: check[0].role,
                };

                res.json({ status: 200, token, user });
                return;
              }
            },
          );
        }
      }
    }
  });
  // Route de modification d'un utilisateur

  app.put('/api/v1/Users/update/:id', withAuth, async (req, res) => {
    const user = await userModel.updateUser(req, req.params.id);
    if (user.code) {
      res.json({ status: 500, msg: 'Erreur de mise à jour' }); //Internal Server Error
    } else {
      // recuperation de l'utilisateur à modifier
      const getUser = await userModel.getUserById(req.params.id);
      if (getUser.code) {
        // Si erreur
        res.json({
          status: 500,
          msg: "Erreur de recupération de l'utilisateur",
        });
      } else {
        // utilisateur modifié
        const updatedUser = {
          id: getUser.id,
          firstName: getUser.firstName,
          lastName: getUser.lastName,
          password: getUser.password,
          phone: getUser.phone,
          addressLine1: getUser.addressLine1,
          addressLine2: getUser.addressLine2,
          city: getUser.city,
          country: getUser.country,
          role: getUser.role,
        };
        res.json({
          status: 200,
          result: user,
          getUser: updatedUser,
          msg: 'Votre Profil a été Modifié!',
        });
      }
    }
  });
  // Route supprimer compt utilisateur:
  app.delete('/api/v1/Users/delete/:id', withAuth, async (req, res) => {
    const deleteUser = await userModel.deleteUser(req.params.id);

    if (deleteUser.code) {
      // Si erreur
      res.json({
        status: 500, //Internal Server Error
        msg: "Erreur de recupération de l'utilisateur",
      });
    } else {
      //   utilisateur suprimé
      res.json({ status: 200, msg: 'Utilisateur supprimé!' });
    }
  });
  // Route pour recuperer un utilisateur par son id/Admin
  app.get('/api/v1/Users/:id', withAuthAdmin, async (req, res) => {
    const user = await userModel.getUserById(req.params.id);
    if (user.code) {
      res.json({
        status: 500, //Internal Server Error
        msg: "Erreur de recupération de l'utilisateur",
      });
    } else {
      res.json({ status: 200, result: user });
    }
  });
  //Route pour récuperer tous les utilisateur

  app.get('/api/v1/Users', withAuthAdmin, async (req, res) => {
    const users = await userModel.getAllUsers(res);
    if (users.code) {
      res.json({
        status: 500, //Internal Server Error
        msg: 'Erreur de recupération des utilisateurs',
      });
    } else {
      res.json({ status: 200, result: users.length, data: users });
    }
  });
  //Route pour modifier le role d'un utilisateur
  app.put('/api/v1/Users/role/:id', withAuthAdmin, async (req, res, next) => {
    const userRole = await userModel.updateUserRole(req, req.params.id);

    if (userRole.code) {
      res.json({ status: 500, msg: "Le role n'a pas pu être modifier" });
    } else {
      res.json({
        status: 200,
        msg: "L'utilisateur a bien été modifié!",
        userRole,
      });
    }
  });
};
