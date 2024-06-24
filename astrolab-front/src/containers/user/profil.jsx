import { useState, useEffect } from 'react';
import { updateUser } from '../../api/user';
import { selectUser, connectUser, logoutUser } from '../../slices/userSlice';
import { validateFormInput } from '../../helpers/validateForm';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../api/user';
import { getUserOrders } from '../../api/order';
import { config } from '../../../config';
import moment from 'moment';

const Profil = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState('');
  const [userOrder, setUserOrder] = useState([]);

  const handleDeleteUser = () => {
    deleteUser(user.userInfo.id)
      .then((res) => {
        if (res.status === 200) {
          setMsg(res.msg);
          window.localStorage.removeItem('3wa-project-token');
          dispatch(logoutUser(user.userInfo.id));
        }
      })
      .catch((error) => console.log(error));
  };

  const handleProfil = (e) => {
    const firstNameError = validateFormInput('Prenom', 'firstName', firstName);

    e.preventDefault();
    setError(null);

    if (firstNameError !== true) {
      setError(firstNameError);
      return;
    }

    const lastNameError = validateFormInput('Nom', 'lastName', lastName);
    if (lastNameError !== true) {
      setError(lastNameError);
      return;
    }

    const phoneError = validateFormInput('Phone', 'phone', phone);
    if (phoneError !== true) {
      setError(phoneError);
      return;
    }

    const addressLine1Error = validateFormInput(
      'Adresse',
      'addressLine1',
      addressLine1,
    );

    if (addressLine1Error !== true) {
      setError(addressLine1Error);
      return;
    }

    const addressLine2Error = validateFormInput(
      'Adresse',
      'addressLine2',
      addressLine2,
    );

    if (addressLine2Error !== true) {
      setError(addressLine2Error);
      return;
    }

    const cityError = validateFormInput('Ville', 'city', city);
    if (cityError !== true) {
      setError(cityError);
      return;
    }

    const countryError = validateFormInput('Pays', 'country', country);
    if (countryError !== true) {
      setError(countryError);
      return;
    }

    const data = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      city: city,
      country: country,
    };

    updateUser(data, user.userInfo.id)
      .then((res) => {
        if (res.status === 200) {
          const token = window.localStorage.getItem('3wa-project-token');
          let newUser = res.newUser;

          newUser.token = token;
          setMsg(res.msg);
          dispatch(connectUser(newUser));
        } else {
          setError('Erreur de modification');
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    setFirstName(user.userInfo.firstName);
    setLastName(user.userInfo.lastName);
    setPhone(user.userInfo.phone);
    setAddressLine1(user.userInfo.addressLine1);
    setAddressLine2(user.userInfo.addressLine2);
    setCity(user.userInfo.city);
    setCountry(user.userInfo.country);
  }, [user]);

  useEffect(() => {
    const data = user.userInfo.id;

    getUserOrders(data)
      .then((res) => {
        if (res.status === 200) {
          setUserOrder(res.result);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="Profil">
      <h2 className="Profil__title">Mon Profil</h2>
      {error !== null && <p className="Profil__error">{error}</p>}
      {msg !== null && (
        <p className="Profil__title" style={{ color: 'red' }}>
          {msg}
        </p>
      )}
      <button
        className="Profil__submit-delete"
        onClick={() => handleDeleteUser()}
      >
        {' '}
        Supprimer mon Compte
      </button>

      <form className="Profil__form" onSubmit={handleProfil}>
        <input
          type="text"
          value={firstName || ''}
          placeholder="Prénom"
          onChange={(e) => {
            setFirstName(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          value={lastName || ''}
          placeholder="Nom"
          onChange={(e) => {
            setLastName(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          value={phone || ''}
          placeholder="Téléphone"
          onChange={(e) => {
            setPhone(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          value={addressLine1 || ''}
          placeholder="Adresse 1"
          onChange={(e) => {
            setAddressLine1(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          value={addressLine2 || ''}
          placeholder="Adresse 2"
          onChange={(e) => {
            setAddressLine2(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          value={city || ''}
          placeholder="Ville"
          onChange={(e) => {
            setCity(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          value={country || ''}
          placeholder="Pays"
          onChange={(e) => {
            setCountry(e.currentTarget.value);
          }}
        />
        <input className="Profil__submit" type="submit" name="Enregistrer" />
      </form>

      <h3>Mes Commandes</h3>
      <table className="Profil__table">
        <thead>
          <tr>
            <th>Commande ID</th>
            <th>Photo</th>
            <th>Produit</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody className="Profile__table-body">
          {userOrder.length > 0 &&
            userOrder.map((item, index) => {
              return (
                <tr key={index} className="Profile__table-row">
                  <td>{item.orderId}</td>
                  <td>
                    <img
                      className="orderImg"
                      src={config.img_url + item.productPhotos}
                      alt={`Image de ${item.productNames}`}
                    />
                  </td>
                  <td>{item.productNames}</td>
                  <td>{moment(item.createTimeStamp).format('DD-MM-YYYY')}</td>
                  <td>{item.status}</td>
                  <td>{item.totalSum} €</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
};
export default Profil;
