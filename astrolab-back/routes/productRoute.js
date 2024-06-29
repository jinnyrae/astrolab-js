const fs = require('fs');
const withAuthAdmin = require('../withAuthAdmin');

module.exports = (app, db) => {
  const productModel = require('../models/ProductModel')(db);
  // Route pour récuperer tout les produits
  app.get('/api/v1/Products/all', async (req, res) => {
    const products = await productModel.getAllProducts();

    if (products.code) {
      res.json({ status: 500, msg: 'Une erreur est survenue!' });
    } else {
      res.json({ status: 200, result: products, msg: 'Success!' });
    }
  });

  // Route pour ajouter un produit
  app.post('/api/v1/Products/insert', withAuthAdmin, async (req, res) => {
    const newProduct = await productModel.insertOneProduct(req);

    if (newProduct.code) {
      res.json({ status: 500, msg: 'Server Error!' });
    } else {
      res.json({
        status: 200,
        msg: 'Le produit a bien été ajouté!',
      });
    }
  });

  // Rout pour ajouter une image
  app.post('/api/v1/Products/image', withAuthAdmin, async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      res.json;
      ({ status: 400, msg: "La photo n'a pas pu être récupérée!" });
    } else {
      const image = req.files.image;

      image.mv(`public/images/${image.name}`, (error) => {
        if (error) {
          res.json({
            status: 500,
            msg: "La photo n'a pas pu être enregistrée",
          });
        } else {
          res.json({
            status: 200,
            msg: "L'image a bien été enregistrée",
            url: image.name,
          });
        }
      });
    }
  });

  // Route pour supprimer un produit
  app.delete(
    '/api/v1/Products/delete/:id',
    withAuthAdmin,
    async (req, res, next) => {
      const product = await productModel.getOneProduct(req.params.id); // Recupération du produit à supprimer pour pouvoir supprimer l'image

      if (!product) {
        res.json({ status: 500, msg: 'Server Error' });
      } else {
        const deleteProduct = await productModel.deleteProduct(req.params.id);

        if (deleteProduct.code) {
          res.json({ status: 500, msg: 'Server Error' });
        } else {
          if (product.photo) {
            // il y a une photo
            fs.unlink(`public/images/${product.photo}`, () => {});
            res.json({ status: 200, msg: 'Produit supprimé!' });
          } else {
            res.json({ status: 200, msg: 'Produit supprimé!' });
          }
        }
      }
    },
  );

  // Route pour le coup de coeur home page
  app.post('/api/v1/Products/favorite', async (req, res) => {
    const favorite = await productModel.getFavorite(req.body.favorite);

    if (favorite.code) {
      res.json({ status: 500, msg: 'Server Error!' });
    } else {
      res.json({ status: 200, result: favorite });
    }
  });

  // Route pour récuperer un produit par id
  app.get('/api/v1/Products/:id', async (req, res) => {
    const product = await productModel.getOneProduct(req.params.id);

    if (product.code) {
      res.json({ status: 500, msg: 'Server Error!' });
    } else {
      res.json({ status: 200, result: product, msg: 'Voilà!' });
    }
  });

  //Route pour modifier un produit
  app.put('/api/v1/Products/update/:id', withAuthAdmin, async (req, res) => {
    const product = await productModel.updateProduct(req, req.params.id);

    if (product.code) {
      res.json({ status: 500, msg: 'Server Error!' });
    } else {
      res.json({ status: 200, result: product, msg: 'Produit modifié!' });
    }
  });
};
