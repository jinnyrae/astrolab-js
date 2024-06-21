import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import logo from '../assets/logo/astrolab-svg.svg';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logoutUser } from '../slices/userSlice.jsx';
import { selectBasket } from '../slices/basketSlice.jsx';
import { FaBasketShopping } from 'react-icons/fa6';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { FaUserLarge } from 'react-icons/fa6';
import { RiAdminFill } from 'react-icons/ri';
import { FaAmericanSignLanguageInterpreting } from 'react-icons/fa';
import { FaUserPlus } from 'react-icons/fa6';
const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const basket = useSelector(selectBasket);
  const [redirect, setRedirect] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  //deconnexion d'un user
  const logout = () => {
    //annulation du token
    window.localStorage.removeItem('3wa-project-token');
    //on réinitialise le store de redux
    dispatch(logoutUser());
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <header className="Header">
        <nav className="Header__nav">
          <div className="Header__logo">
            <Link to="/">
              <img
                className="Header__logo--img"
                src={logo}
                alt="logo Astrolab"
              />
            </Link>
            <p className="Header__logo--txt">
              Dieu a inventé le temps, l'homme a inventé la montre
            </p>
          </div>

          <div className={`navbar ${menuOpen ? 'open' : ''}`}>
            <div className="navbar-container">
              <input
                type="checkbox"
                checked={menuOpen}
                onChange={menuToggle}
                id="menu-toggle"
              />
              <label htmlFor="menu-toggle" className="hamburger-lines">
                <span className="line line1"></span>
                <span className="line line2"></span>
                <span className="line line3"></span>
              </label>
              <ul className="menu-items">
                <li>
                  <Link className="nav-link" to="/">
                    Astrolab 11
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/shop">
                    La Boutique
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/atelier">
                    Nos Ateliers
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* //user déconnecté */}
          {user.IsLogged === false ? (
            <div className="Header__basket--icons ">
              <Link className="icon-text" to="/register">
                Sign up
                <FaUserPlus className="icon" />
              </Link>

              <Link className="icon-text" to="/login">
                Se connecter
                <FaAmericanSignLanguageInterpreting className="icon" />
              </Link>
              <Link className="icon-text basket" to="/basket">
                <FaBasketShopping className="icon" />
                {basket.basket.length > 0 && (
                  <span className="span-basket">{basket.basket.length}</span>
                )}
              </Link>
            </div>
          ) : (
            // user connecté
            <div className="Header__basket--icons connected">
              {user.userInfo.role === 'admin' && (
                <Link className="icon-text" to="/admin">
                  {user.userInfo.firstName} {user.userInfo.lastName}
                  <RiAdminFill className="icon" />
                </Link>
              )}

              <Link className="icon-text" to="/profil">
                Mon Profil
                <FaUserLarge className="icon" />
              </Link>
              <a className="icon-text" href="#" onClick={logout}>
                Log out
                <RiLogoutCircleRLine className="icon" />
              </a>
              <div></div>
              <Link className=" basket" to="/basket">
                <FaBasketShopping className="icon" />
              </Link>
              {basket.basket.length > 0 && (
                <span className="icon-text">{basket.basket.length}</span>
              )}
            </div>
          )}
        </nav>
      </header>
      <section className="Banner">
        <div className=" Banner__img"></div>
      </section>
    </>
  );
};

export default Header;
