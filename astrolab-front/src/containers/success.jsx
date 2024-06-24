import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { emptyBasket } from '../slices/basketSlice';
import { IoPlayBackOutline } from 'react-icons/io5';
const Success = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.localStorage.removeItem('astrolab-basket');
    dispatch(emptyBasket());
  }, []);
  return (
    <section>
      <h2>Astrolab Vous remercie !</h2>
      <div className="Success__back">
        <Link className="Success__link" to="/">
          <IoPlayBackOutline className="Success__icon" />
          Retour
        </Link>
      </div>

      <p className="Success__p">Votre commande a été effectué avec succès!</p>
    </section>
  );
};
export default Success;
