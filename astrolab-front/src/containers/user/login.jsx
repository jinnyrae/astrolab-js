import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { loginUser } from '../../api/user';
import { useDispatch } from 'react-redux';
import { connectUser } from '../../slices/userSlice';
import { validateFormInput } from '../../helpers/validateForm';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);

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

    const userDatas = {
      email: email,
      password: password,
    };

    loginUser(userDatas)
      .then((res) => {
        if (res.status === 200) {
          window.localStorage.setItem('3wa-project-token', res.token); // ajout du token au localStorage

          const newUser = { ...res.user, token: res.token }; // objet user dans redux

          dispatch(connectUser(newUser)); //connexion de user a redux
          setRedirect(true);
        } else {
          setError(res.msg);
        }
      })
      .catch((error) => console.log(error));
  };
  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <section className="Form">
      <h2 className="Form__title">Se Connecter</h2>
      {error !== null && <p className="Form__error">{error}</p>}

      <div className="Sign-up">
        <h3 className="Form__title">Pas encore membre?</h3>
        <Link className="registerLink" to={'/register'}>
          S'inscrire
        </Link>
      </div>
      <form className="Form__log" onSubmit={handleLogin}>
        <input
          className="Form__log--input"
          type="email"
          placeholder="Votre Email"
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <input
          className="Form__log--input"
          type="password"
          placeholder="Mot de Passe"
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        <input className="Form__btn" type="submit" name="Enregister" />
      </form>
    </section>
  );
};

export default Login;
