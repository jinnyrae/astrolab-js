module.exports = (_db) => {
  db = _db;
  return OrderModel;
};
class OrderModel {
  // Ajouter une commande
  static addOrder(userId, totalSum) {
    return db
      .query(
        'INSERT INTO Orders (userId, createTimeStamp, status, totalSum) VALUES (?, NOW(), "unpaid", ?)',
        [userId, totalSum],
      )
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }

  // Ajouter un order details
  static addOrderDetails(orderId, product) {
    const total = parseInt(product.cartQuantity) * product.price;
    console.log('total', total);
    return db
      .query(
        'INSERT INTO OrderDetails (orderId, productId, quantity, total, createTimeStamp) VALUES (?, ?, ?, ?, NOW())',
        [orderId, product.id, product.cartQuantity, total],
      )
      .then((res) => {
        return res;
      })
      .then((error) => {
        return error;
      });
  }
  // modifier totalSum dans le panier
  static updateTotalSum(orderId, sum) {
    return db
      .query('UPDATE Orders SET totalSum = ? WHERE id= ?', [sum, orderId])
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }

  //Get une commande par son id
  static getOneOrder(id) {
    return db
      .query('SELECT * FROM Orders WHERE id=?', [id])
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }

  // Modifier le status d'une commande
  static updateOrderStatus(id, status) {
    return db
      .query('UPDATE Orders SET status = ? WHERE id = ?', [status, id])
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }

  // Get tout les commande
  static getAllOrders() {
    return db
      .query('SELECT * FROM Orders')
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }

  // Get tout les commande d'un utilisateur
  static getAllOrdersByUser(userId) {
    return db
      .query(
        "SELECT Orders.id AS orderId, NOW() AS orderDate,Orders.status, Orders.totalSum, GROUP_CONCAT(Products.productName SEPARATOR ', ') AS productNames, GROUP_CONCAT(Products.photo SEPARATOR ', ') AS productPhotos FROM Orders INNER JOIN OrderDetails ON Orders.id = OrderDetails.orderId INNER JOIN Products ON Products.id = OrderDetails.productId WHERE Orders.userId = ? GROUP BY Orders.id",
        [userId],
      )
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }

  // Get les details d'une commande
  static allOrderDetails(orderId) {
    return db
      .query(
        'SELECT OrderDetails.id , OrderDetails.quantity,OrderDetails.createTimeStamp, OrderDetails.orderId, total, photo ,productName FROM OrderDetails INNER JOIN Products ON Products.id = OrderDetails.productId WHERE orderId = ? ',
        [orderId],
      )
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }
  static userOrder;
}
