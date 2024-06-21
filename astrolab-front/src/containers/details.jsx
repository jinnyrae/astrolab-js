import { useState, useEffect } from 'react';
import { config } from '../../config.js';
import { Link } from 'react-router-dom';
import { getOneProduct } from '../api/product';
import BasketMsg from '../components/basketMsg';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { selectBasket, updateBasket } from '../slices/basketSlice';
import { IoPlayBackOutline } from 'react-icons/io5';
const Details = (props) => {
  const basket = useSelector(selectBasket);
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState(false);
  const [basketMsg, setBasketMsg] = useState(false);
  const OnBasketClick = (actuelBasket, newProduct) => {
    console.log('actu', actuelBasket, 'new', newProduct);
    console.log(product);
    let theQuantity = quantity === '' ? 1 : parseInt(quantity); //Set quantity à 1 par default
    // Verfier la quantité , qu'elle est positive
    if (isNaN(theQuantity) || theQuantity <= 0) {
      setError('Veuillez saisir un chiffre');
    } else {
      setError(null);
      let newBasket = JSON.parse(JSON.stringify(actuelBasket || []));
      console.log('new basket1', newBasket, 'actuel1', actuelBasket);
      // verifier si le produit exsiste dans le panier
      if (newProduct) {
        const verifyProduct = newBasket.findIndex(
          (item) => item.id === newProduct.id,
        );
        console.log('verif', verifyProduct);
        if (verifyProduct === -1) {
          // produit inexistant
          let theProduct = JSON.parse(JSON.stringify(newProduct));
          console.log('new', newProduct);
          theProduct.cartQuantity = theQuantity;
          let theBasket = [...newBasket, theProduct];
          console.log('the basket', theBasket);
          let localStorageBasket = JSON.stringify(theBasket);
          window.localStorage.setItem('astrolab-basket', localStorageBasket);
          dispatch(updateBasket(theBasket));
        } else {
          // Le produit existe dans le panier
          newBasket[verifyProduct].cartQuantity = +theQuantity;
          let localStorageBasket = JSON.stringify(newBasket);
          window.localStorage.setItem('astrolab-basket', localStorageBasket);
          dispatch(updateBasket(newBasket));
        }
        setBasketMsg(true);
      } else {
        console.error('newProduct is undefined');
      }
      setBasketMsg(true);
    }
  };
  useEffect(() => {
    getOneProduct(props.params.id)
      .then((res) => {
        console.log('Product Response:', res);
        if (res.status === 200) {
          setProduct(res.result);
          console.log('reees', res.result);
        } else {
          console.log('Echec:', res.status);
        }
      })
      .catch((error) => console.log(error));
  }, [props.params.id]);

  return (
    <section className="Product__details">
      <h1>Details du Produit</h1>
      {basketMsg && (
        <BasketMsg
          msg={`Vous avez ajouté: ${quantity} produit(s) dans votre panier!`}
          onClickClose={(e) => {
            setBasketMsg(false);
            setQuantity('');
          }}
        />
      )}
      <Link className="icon" to="/shop">
        <IoPlayBackOutline className="Details__icon" />
      </Link>
      {product !== null && (
        <div className="Details">
          <h2>{product.productName}</h2>

          <div className="Details__section">
            <img
              className="Details__table-img"
              src={config.img_url + product.photo}
              alt={`image de la montre ${product.productName}`}
            />
            <div className="Details__desc">
              <table className="Details__table">
                <thead className="Details__table-head">
                  <tr className="Details__table-row">
                    <th>Marque</th>
                    <th>Genre</th>
                    <th>Mouvement</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{product.brand}</td>
                    <td>{product.gender}</td>
                    <td>{product.mouvement}</td>
                  </tr>
                </tbody>
              </table>
              <p className="Details__table-desc">{product.description}</p>
              <p className="Details__table-price">prix: {product.price} €</p>
            </div>
          </div>
          <p className="Details__table-history">{product.history}</p>
        </div>
      )}
      {error !== null && <p>{error}</p>}
      <p className="Details__panier">Ajouter au panier</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          OnBasketClick(basket.basket, product);
        }}
      >
        <input
          className="Details__input"
          type="text"
          onChange={(e) => {
            setQuantity(e.currentTarget.value);
          }}
        />
        <button className="Details__btn">
          <AiOutlinePlusCircle />
        </button>
      </form>
    </section>
  );
};
export default Details;