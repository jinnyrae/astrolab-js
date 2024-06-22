const withAuth = require('../withAuth');
//const jwt = require('jsonwebtoken');
//const secret = 'w3a-project-pour-la-formation-fullstack-javaScript';

module.exports = (app, db) => {
  const userModel = require('../models/UserModel')(db);
  app.get('/api/v1/auth/checkToken', withAuth, async (req, res) => {
    const user = await userModel.getUserById(req.id);
    console.log('User response:', user);
    if (user.code) {
      res.json({ status: 500, msg: 'Server Error!' });
    } else {
      const theUser = {
        id: user[0].id,
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        email: user[0].email,
        phone: user[0].phone,
        addressLine1: user[0].addressLine1,
        addressLine2: user[0].addressLine2,
        city: user[0].city,
        country: user[0].country,
        role: user[0].role,
      };
      res.json({ status: 200, user: theUser });
    }
  });
};
