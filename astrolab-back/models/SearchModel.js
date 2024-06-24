module.exports = (_db) => {
  db = _db;
  return SearchModel;
};
class SearchModel {
  //Afficher un produit par son nom
  static getProductByName(productName) {
    return db
      .query('SELECT * FROM Products WHERE productName = ?', [productName])
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }

  // Afficher les produit par genre
  static getProductByGender(gender) {
    return db
      .query('SELECT * FROM Products WHERE gender = ?', [gender])
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }

  // Afficher les produits par marque
  static getProductByBrand(brand) {
    return db
      .query('SELECT * FROM Products WHERE brand=?', [brand])
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }

  // Afficher les produits par mouvement
  static getProductByMouvement(mouvement) {
    return db
      .query('SELECT * FROM Products WHERE mouvement=?', [mouvement])
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }

  // static getProductBySearch(mouvement, brand, gender, productName) {
  //   return db
  //     .query(
  //       'SELECT * FROM Products WHERE productName=? OR brand=? OR gender=? OR mouvement=?',
  //       [productName || brand || gender || mouvement],
  //     )
  //     .then((res) => {
  //       return res;
  //     })
  //     .catch((error) => {
  //       return error;
  //     });
  // }
}
