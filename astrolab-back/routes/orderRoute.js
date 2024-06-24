require('dotenv').config();

const withAuthAdmin = require('../withAuthAdmin');
const withAuth = require('../withAuth');
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = (app, db) => {
  const orderModel = require('../models/OrderModel')(db);
  const userModel = require('../models/UserModel')(db);
  const productModel = require('../models/ProductModel')(db);

  // Route pour ajouter une commande
  app.post('/api/V1/Orders/add', withAuth, async (req, res) => {
    let totalSum = 0;
    const newOrder = await orderModel.addOrder(req.body.userId, totalSum);

    if (newOrder.code) {
      res.json({ status: 500, msg: "échec d'enregistrer la commande!" });
    } else {
      const insertOrderId = newOrder.insertId; // le id ajouter dand la BD

      req.body.basket.forEach(async (product) => {
        const addedProducts = await productModel.getOneProduct(product.id); // les produits ajoutés au panier

        if (addedProducts.code) {
          res.json({
            status: 500,
            msg: " Echec d'enregistrer de l'id!",
          });
        } else {
          const safePrice = parseFloat(addedProducts.price); // safePrice du produit dans le panier = le prix dans la DB
          const orderDetails = await orderModel.addOrderDetails(
            insertOrderId,
            product,
          );

          if (orderDetails.code) {
            res.json({
              status: 500,
              msg: "Echec d'enregistrer les details !",
            });
          } else {
            totalSum += parseInt(product.cartQuantity) * safePrice; // total de produits aux panier * prix
            await orderModel.updateTotalSum(
              // mise à jour du prix du panier
              newOrder.insertId,
              totalSum,
            );
          }
        }
      });

      res.json({
        status: 200,
        insertOrderId,
      }); // id de la commande ajoutée
    }
  });
  // Rout de gestion de paiement

  app.post('/api/v1/Orders/payment', withAuth, async (req, res) => {
    const order = await orderModel.getOneOrder(req.body.orderId);

    if (order.code) {
      res.json({ status: 400, msg: 'Echec de verification !' });
    } else {
      // L'objet payment
      const paymentIntent = await Stripe.paymentIntents.create({
        amount: order[0].totalSum * 100, // en cents donc il fault multiplier par 100
        currency: 'eur',
        metadata: { integration_check: 'accept_a_payment' }, // pour savoir si le payment est validé
        receipt_email: req.body.email, // confirmation envoyé par mail
        payment_method_types: ['card'],
      });

      res.json({
        stauts: 200,
        msg: 'Paiement effectué',
        client_secret: paymentIntent.client_secret,
      });
    }
  });

  // Route pour modifier le status de paiement> Stripe
  app.put('/api/v1/Orders/status', withAuth, async (req, res) => {
    const orderStatus = await orderModel.updateOrderStatus(
      req.body.id,
      req.body.status,
    );

    if (orderStatus.code) {
      res.json({ status: 500, msg: 'Erreur de modification du status!' });
    } else {
      res.json({ status: 200, msg: 'Status mis à jour!', orderStatus });
    }
  });
  // Route pour modifier le status de paiement> Stripe
  app.put('/api/v1/Orders/status/admin', withAuthAdmin, async (req, res) => {
    const orderStatus = await orderModel.updateOrderStatus(
      req.body.id,
      req.body.status,
    );

    if (orderStatus.code) {
      res.json({ status: 500, msg: 'Erreur de modification du status!' });
    } else {
      res.json({ status: 200, msg: 'Status mis à jour!', orderStatus });
    }
  });

  // Route: tous les commandes
  app.get('/api/v1/Orders/all', withAuthAdmin, async (req, res) => {
    const orders = await orderModel.getAllOrders();

    if (orders.code) {
      res.json({ status: 500, msg: 'Erreur de récuperation des commandes!' });
    } else {
      res.json({ status: 200, result: orders });
    }
  });

  //Route get une commande
  app.get('/api/v1/Orders/:id', withAuthAdmin, async (req, res) => {
    const orders = await orderModel.getOneOrder(req.params.id);

    if (orders.code) {
      res.json({ status: 500, msg: 'Erreur de récuperation de commande!' });
    } else {
      res.json({ status: 200, result: orders });
    }
  });

  // Route pour récupere les commande par un utilisateur
  app.get('/api/v1/Orders/user/:id', withAuth, async (req, res) => {
    const orders = await orderModel.getAllOrdersByUser(req.params.id);

    if (orders.code) {
      res.json({ status: 500, msg: 'Erreur de récuperation des commandes!' });
    } else if (!orders || orders.length === 0) {
      res.json({ status: 404, msg: 'Pas de commandes trouvé' });
    } else {
      res.json({ status: 200, result: orders });
    }
  });

  // Get une command détaillée
  app.get('/api/v1/Orders/details/:id', withAuth, async (req, res) => {
    const order = await orderModel.getOneOrder(req.params.id);

    if (order.code) {
      res.json({ status: 500, msg: 'Erreur de récuperation de commande!' });
    } else {
      const user = await userModel.getUserById(order[0].userId);

      if (user.code) {
        res.json({
          status: 500,
          msg: "Erreur de récuperation de l'utilisateur!",
        });
      } else {
        const theUser = {
          firstName: user[0].firstName,
          lastName: user[0].lastName,
          email: user[0].email,
          city: user[0].city,
          country: user[0].country,
        };
        const detailedOrder = await orderModel.allOrderDetails(req.params.id);

        if (detailedOrder.code) {
          res.json({ status: 500, msg: 'Erreur de récuperation de détails!' });
        } else {
          res.json({
            status: 200,
            detailedOrder: detailedOrder,
            user: theUser,
          });
        }
      }
    }
  });
};
