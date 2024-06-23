module.exports = (app, db) => {
  const searchModel = require('../models/SearchModel')(db);
  //Route pour afficher un produit par son nom
  app.get('/api/v1/search/name', async (req, res) => {
    const productByName = req.query.productName;
    const product = await searchModel.getProductByName(productByName);

    if (product.code) {
      res.json({ status: 500, msg: 'Echec de trouver le produit!' });
    } else {
      if (product.length === 0) {
        res.json({ status: 404, msg: 'Produit introuvable!' });
      } else {
        res.json({ status: 200, product: product, msg: 'Voilà!' });
      }
    }
  });
  //Route pour afficher un produit par gender
  app.get('/api/v1/search/gender', async (req, res) => {
    const productsByGender = req.query.gender;
    const products = await searchModel.getProductByGender(productsByGender);

    if (products.code) {
      res.json({ status: 500, msg: 'Echec de trouver le produit!' });
    } else if (products.length === 0) {
      res.json({ status: 404, msg: 'Products not found!' });
    } else {
      res.json({
        status: 200,
        products: products,
        msg: 'Voilà!',
      });
    }
  });
  app.get('/api/v1/search/brand', async (req, res) => {
    const productsByBrand = req.query.brand;
    const products = await searchModel.getProductByBrand(productsByBrand);

    if (products.code) {
      res.json({ status: 500, msg: 'Echec de trouver le produit!' });
    } else if (products.length === 0) {
      res.json({ status: 404, msg: 'Products not found!' });
    } else {
      res.json({
        status: 200,
        products: products,
        msg: 'Voilà!',
      });
    }
  });
  app.get('/api/v1/search/mouvement', async (req, res) => {
    const productsByMouvement = req.query.mouvement;
    const products =
      await searchModel.getProductByMouvement(productsByMouvement);

    if (products.code) {
      res.json({ status: 500, msg: 'Echec de trouver le produit!' });
    } else if (products.length === 0) {
      res.json({ status: 404, msg: 'Products not found!' });
    } else {
      res.json({
        status: 200,
        products: products,
        msg: 'Voilà!',
      });
    }
  });
};
