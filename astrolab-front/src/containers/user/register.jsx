import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { insertUser } from '../../api/user';
import { validateFormInput } from '../../helpers/validateForm';
const Register = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);
  const handleRegister = (e) => {
    e.preventDefault();
    setError(null);

    const firstNameError = validateFormInput('Prenom', 'firstName', firstName);
    if (firstNameError !== true) {
      setError(firstNameError);
      return;
    }
    const lastNameError = validateFormInput('Nom', 'lastName', lastName);
    if (lastNameError !== true) {
      setError(lastNameError);
      return;
    }
    const emailError = validateFormInput('Email', 'email', email);
    if (emailError !== true) {
      setError(emailError);
      return;
    }
    const errorPassword = validateFormInput('Password', 'password', password);
    if (errorPassword !== true) {
      setError(errorPassword);
      return;
    }
    const errorPhone = validateFormInput('Phone', 'phone', phone);
    if (errorPhone !== true) {
      setError(errorPhone);
      return;
    }

    const errAddressLine1 = validateFormInput(
      'Adresse',
      'addressLine1',
      addressLine1,
    );
    if (errAddressLine1 !== true) {
      setError(errAddressLine1);
      return;
    }
    const errAddressLine2 = validateFormInput(
      'Adresse',
      'addressLine2',
      addressLine2,
    );
    if (errAddressLine2 !== true) {
      setError(errAddressLine2);
      return;
    }
    const errorCity = validateFormInput('Ville', 'city', city);
    if (errorCity !== true) {
      setError(errorCity);
      return;
    }
    const errorCountry = validateFormInput('Pays', 'country', country);
    if (errorCountry !== true) {
      setError(errorCountry);
      return;
    }
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      city: city,
      country: country,
    };
    insertUser(data)
      .then((res) => {
        if (res.status === 200) {
          setRedirect(true);
        } else {
          setError(res.error);
        }
      })
      .catch((error) => console.log(error));
  };
  if (redirect) {
    return <Navigate to="/login" />;
  }
  return (
    <section className="Register">
      <h2 className="Register__title">S'inscrire</h2>
      {error !== null && <p className="Register__error">{error}</p>}
      <form className="Register__form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Prénom"
          onChange={(e) => {
            setFirstName(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="Nom"
          onChange={(e) => {
            setLastName(e.currentTarget.value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="Téléphone"
          onChange={(e) => {
            setPhone(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="Adresse 1"
          onChange={(e) => {
            setAddressLine1(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="Adresse 2"
          onChange={(e) => {
            setAddressLine2(e.currentTarget.value);
          }}
        />

        <input
          type="text"
          placeholder="Ville"
          onChange={(e) => {
            setCity(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="Pays"
          onChange={(e) => {
            setCountry(e.currentTarget.value);
          }}
        />

        <input className="Register__submit" type="submit" name="Enregistrer" />
      </form>
    </section>
  );
};

export default Register;
