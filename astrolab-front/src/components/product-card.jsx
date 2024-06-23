import { useState } from 'react';
import { config } from '../../config';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectBasket, updateBasket } from '../slices/basketSlice';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import BasketMsg from './basketMsg';
const ProductCard = (props) => {
  const basket = useSelector(selectBasket); // l'etat du panier dans redux
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState(false);
  const [basketMsg, setBasketMsg] = useState(false);
  const OnBasketClick = (actuelBasket, newProduct) => {
    let theQuantity = quantity === '' ? 1 : parseInt(quantity); //Set quantity à 1 par default
    // Verfier la quantité , qu'elle existe et positive
    if (isNaN(theQuantity) || theQuantity <= 0) {
      setError('Veuillez saisir un chiffre');
    } else {
      setError(null);
      let newBasket = JSON.parse(JSON.stringify(actuelBasket));
      console.log('new basket1', newBasket, 'actuel1', actuelBasket);
      const verifyProduct = newBasket.findIndex(
        (item) => item.id === newProduct.id,
      ); // verifier si le produit exsiste dans le panier
      if (verifyProduct === -1) {
        // produit inexsistant
        let theProduct = JSON.parse(JSON.stringify(newProduct)); // theProduct est aussi read only
        theProduct.cartQuantity = theQuantity;
        let theBasket = [...newBasket, theProduct]; // on ajoute le produit au panier
        let localStorageBasket = JSON.stringify(theBasket);
        window.localStorage.setItem('astrolab-basket', localStorageBasket);
        dispatch(updateBasket(theBasket));
      } else {
        // Le produit existe dans le panier
        newBasket[verifyProduct].cartQuantity = +theQuantity;
        let localStorageBasket = JSON.stringify(newBasket); // modification du panier dans le local storage
        window.localStorage.setItem('astrolab-basket', localStorageBasket);
        dispatch(updateBasket(newBasket));
      }
      setBasketMsg(true);
    }
  };
  return (
    <li className="Card">
      {basketMsg && (
        <BasketMsg
          msg={`Vous avez ajouté ${quantity} produit dans le panier`}
          onClickClose={(e) => {
            setBasketMsg(false);
            setQuantity('');
          }}
        />
      )}
      {error !== null && <p>{error}</p>}
      <Link to={`/details/${props.product.id}`}>
        <div>
          <h3 className="Card__title">{props.product.productName}</h3>
          <p className="Card__p">{props.product.brand}</p>
          <img
            src={config.img_url + props.product.photo}
            alt={`${props.product.productName}`}
          />
          <p className="Card__price">prix: {props.product.price} €</p>
        </div>
      </Link>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          OnBasketClick(basket.basket, props.product);
        }}
      >
        <input
          type="text"
          onChange={(e) => {
            setQuantity(e.currentTarget.value);
          }}
        />
        <button>
          <AiOutlinePlusCircle className="icon" />
        </button>
      </form>
    </li>
  );
};
export default ProductCard;
