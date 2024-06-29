import { useState, useEffect } from 'react';
import { config } from '../../config.js';
import { Link, useParams } from 'react-router-dom';
import { getOneProduct } from '../api/product';
import BasketMsg from '../components/basketMsg';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { selectBasket, updateBasket } from '../slices/basketSlice';
import { IoPlayBackOutline } from 'react-icons/io5';
import InfinitText from '../components/infinitText';
import Reassurance from '../components/reassurance';
const Details = () => {
  const basket = useSelector(selectBasket);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState(null);
  const [basketMsg, setBasketMsg] = useState(false);

  const OnBasketClick = (actuelBasket, newProduct) => {
    let theQuantity = quantity === '' ? 1 : parseInt(quantity); //Set quantity à 1 par default

    // Verfier la quantité , qu'elle est positive
    if (isNaN(theQuantity) || theQuantity <= 0) {
      setError('Veuillez saisir un chiffre');
    } else {
      let newBasket = JSON.parse(JSON.stringify(actuelBasket || [])); //cloner le panier du store

      // verifier si le produit exsiste déjà dans le panier
      if (newProduct) {
        const verifyProduct = newBasket.findIndex(
          (item) => item.id === newProduct.id,
        );

        if (verifyProduct === -1) {
          // produit inexistant
          let theProduct = JSON.parse(JSON.stringify(newProduct)); // cloner le produit
          theProduct.cartQuantity = theQuantity; //mettre à jour la quantité
          let theBasket = [...newBasket, theProduct]; //mettre à jour le panier
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
      }
      setBasketMsg(true);
    }
  };

  useEffect(() => {
    getOneProduct(id)
      .then((res) => {
        if (res.status === 200) {
          setProduct(res.result);
        }
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <section className="Product__details">
      <InfinitText />
      <h1>Details du Produit</h1>
      {basketMsg && (
        <BasketMsg
          msg={`Vous avez ajouté: ${quantity} produit(s) dans votre panier!`}
          onClickClose={() => {
            setBasketMsg(false);
            setQuantity('');
          }}
        />
      )}
      <div className="retour">
        <IoPlayBackOutline className="Admin__icon" />
        <Link to={'/admin/orderTable'} className="Admin__links">
          Retour
        </Link>
      </div>
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
      {error !== null && (
        <p
          className="Form__error"
          style={{ paddingTop: '2rem', paddingBottom: '0' }}
        >
          {error}
        </p>
      )}
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
      <Reassurance />
    </section>
  );
};
export default Details;
