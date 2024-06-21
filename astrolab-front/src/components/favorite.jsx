import { useState, useEffect } from 'react';
import { config } from '../../config';
import { favoriteProducts } from '../api/product';
import { useSelector, useDispatch } from 'react-redux';
import { selectBasket, updateBasket } from '../slices/basketSlice';
import BasketMsg from './basketMsg';

const Favorite = (props) => {
  const basket = useSelector(selectBasket); // l'etat du panier dans redux
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState(false);
  const [favorite, setFavorite] = useState([]);
  const [basketMsg, setBasketMsg] = useState(false);
  const OnBasketClick = (actuelBasket, newProduct) => {
    console.log('actu', actuelBasket, 'new', newProduct);
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
  const getFavorites = (favo) => {
    const data = { favorite: favo };
    console.log('Request Data:', data);
    favoriteProducts(data)
      .then((res) => {
        console.log('Full Response:', res);
        if (res.status === 200) {
          console.log('Data:', res.result);
          setFavorite(res.result);
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getFavorites('1');
  }, []);

  return (
    <li className="Card Favorite  ">
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
      <div className="Home__gallery">
        <li>
          <img
            className="Home__gallery-photo"
            src={config.img_url + props.product.photo}
          />
        </li>
        <li className="Home__gallery-name">{props.product.productName}</li>
        <li className="Home__gallery-price">{props.product.price} € TTC</li>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          OnBasketClick(basket.basket, props.product);
        }}
      >
        <button>Ajouter au panier</button>
      </form>
    </li>
  );
};
export default Favorite;
