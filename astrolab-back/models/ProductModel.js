module.exports = (_db) => {
  db = _db;
  return ProductModel;
};

class ProductModel {
  // get all products
  static getAllProducts() {
    return db
      .query('SELECT * FROM Products')
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }
  // Get one product
  static getOneProduct(id) {
    console.log(id);
    return db
      .query('SELECT * FROM Products WHERE id=?', [id])
      .then((res) => {
        return res[0];
      })
      .catch((error) => {
        return error;
      });
  }

  // Ajouter un produit
  static insertOneProduct(req) {
    return db
      .query(
        'INSERT INTO Products (productName, brand, gender, mouvement , description, stockQuantity, price, history,favorite, photo, photoName, photoAlt ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
        [
          req.body.productName,
          req.body.brand,
          req.body.gender,
          req.body.mouvement,
          req.body.description,
          req.body.stockQuantity,
          req.body.price,
          req.body.history,
          req.body.favorite,
          req.body.photo,
          req.body.photoName,
          req.body.photoAlt,
        ],
      )
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }
  // Modifier un produit
  static updateProduct(req, id) {
    return db
      .query(
        'UPDATE Products SET productName = ?, brand = ?, gender = ?, mouvement = ?, description = ?, stockQuantity = ?, price = ?, history = ?, favorite = ?, photo = ?, photoName = ?, photoAlt = ? WHERE id = ?',
        [
          req.body.productName,
          req.body.brand,
          req.body.gender,
          req.body.mouvement,
          req.body.description,
          req.body.stockQuantity,
          req.body.price,
          req.body.history,
          req.body.favorite,
          req.body.photo,
          req.body.photoName,
          req.body.photoAlt,
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
  //Supprimer un produit
  static deleteProduct(id) {
    return db
      .query('DELETE FROM Products WHERE id = ?', [id])
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }

  // coup de coeur home page
  static getFavorite(favorite) {
    return db
      .query('SELECT * FROM Products WHERE favorite = ? LIMIT 4', [favorite])
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }
}
