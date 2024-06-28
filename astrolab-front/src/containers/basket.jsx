import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../slices/userSlice';
import { updateBasket, emptyBasket, selectBasket } from '../slices/basketSlice';
import { insertOrder } from '../api/order';
import { FaRegTrashCan } from 'react-icons/fa6';
import { Navigate } from 'react-router-dom';

const Basket = () => {
  const basket = useSelector(selectBasket);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [redirect, setRedirect] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [loginRedirect, setLoginRedirect] = useState(false);

  const handleInsertOrder = (e) => {
    e.preventDefault();

    if (user.IsLogged) {
      const data = {
        userId: user.userInfo.id,
        basket: basket.basket,
      };

      insertOrder(data)
        .then((res) => {
          if (res.status === 200) {
            setOrderId(res.insertOrderId);
            setRedirect(true);
          }
        })
        .catch((error) => console.log(error));
    } else {
      setLoginRedirect(true);
    }
  };

  //Fonction pour déduire la quantité du produit du panier
  const deducetItem = (actuelBasket, product) => {
    let newBasket = JSON.parse(JSON.stringify(actuelBasket)); // Deep clone the object

    const verifyProduct = newBasket.findIndex((item) => item.id === product.id);

    if (verifyProduct !== -1) {
      newBasket[verifyProduct].cartQuantity -= 1;
    }
    let lsBasket = JSON.stringify(newBasket);
    window.localStorage.setItem('astrolab-basket', lsBasket); // modifier local storage et store
    dispatch(updateBasket(newBasket));
  };
  // Function pour augmenter la quantité de produit
  const addItem = (actuelBasket, product) => {
    let newBasket = JSON.parse(JSON.stringify(actuelBasket));

    const verifyProduct = newBasket.findIndex((item) => item.id === product.id);

    if (verifyProduct !== -1) {
      newBasket[verifyProduct].cartQuantity += 1;
    }

    let lsBasket = JSON.stringify(newBasket);
    window.localStorage.setItem('astrolab-basket', lsBasket); // Reinitialisation du local storage et store
    dispatch(updateBasket(newBasket));
  };
  const emptyCart = () => {
    window.localStorage.removeItem('astrolab-basket');
    dispatch(emptyBasket());
  };
  // Fonction pour supprimer un produit du panier
  const deleteItem = (actuelBasket, product) => {
    let newBasket = JSON.parse(JSON.stringify(actuelBasket));
    let deleteBasket = newBasket.filter(
      (actuelProduct) => actuelProduct.id !== product.id,
    );
    let lsBasket = JSON.stringify(deleteBasket);
    window.localStorage.setItem('astrolab-basket', lsBasket); // modifier le local storage
    dispatch(updateBasket(deleteBasket)); // modifier le store
  };

  if (redirect) return <Navigate to={`/payment/${orderId}`} />;
  if (loginRedirect) return <Navigate to={`/login`} />;
  return (
    <section>
      <h2>Mon Panier</h2>
      {basket.basket.length > 0 ? (
        <table className="Basket__form">
          <thead>
            <tr>
              <th className="Panier__quantity">Quantité</th>
              <th>-</th>
              <th>+</th>
              <th className="Panier__nom">Nom</th>
              <th>Prix</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td colSpan="7">
                <button className="Panier__btn " onClick={() => emptyCart()}>
                  Vider le Panier
                </button>
              </td>
            </tr>
          </tfoot>
          <tbody>
            {basket.basket.map((item) => {
              let total = parseFloat(item.price) * parseInt(item.cartQuantity);
              return (
                <tr key={item.id}>
                  <td>{item.cartQuantity}</td>
                  <td>
                    <button
                      className="Banier__btn-add"
                      onClick={() => deducetItem(basket.basket, item)}
                    >
                      -
                    </button>
                  </td>
                  <td>
                    <button
                      className="Banier__btn-add"
                      onClick={() => addItem(basket.basket, item)}
                    >
                      +
                    </button>
                  </td>
                  <td className="Panier__productName">{item.productName}</td>
                  <td>{item.price}</td>
                  <td>{total}</td>
                  <td>
                    <button
                      className="Banier__btn-add"
                      onClick={() => {
                        deleteItem(basket.basket, item);
                      }}
                    >
                      <FaRegTrashCan className="Panier__icon" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="Panier">Votre panier et vide</p>
      )}
      {basket.basket.length > 0 && (
        <button className="Panier__btn pay" onClick={handleInsertOrder}>
          Payer
        </button>
      )}
    </section>
  );
};
export default Basket;
