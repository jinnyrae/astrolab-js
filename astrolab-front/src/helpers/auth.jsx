import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import { selectUser, connectUser } from '../slices/userSlice';
import { checkToken } from '../api/user';

const RequireAuth = ({ child, admin }) => {
  const params = useParams(); // params de la route

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const Child = child; //la page concernée

  const [redirect, setRedirect] = useState(false);
  const [redirectAdmin, setRedirectAdmin] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem('3wa-project-token');

    if (token === null) {
      // token introuvable et auth demandé
      setRedirect(true); // accès refusé et user redirigé
    } else {
      if (user.userInfo.role !== 'admin' && admin) {
        // Verification du role du user: Le role n'est pas admin et authAdmin demandé
        setRedirectAdmin(true); // accès refusé et user redirigé
      }

      // token trouvé
      checkToken() // verification du token
        .then((res) => {
          if (res.status !== 200) {
            // token n'est pas valable et auth demandé
            setRedirect(true); // accès refusé et user redirigé
          } else {
            // token valable
            let theUser = res.user; //recupération de user
            theUser.token = token; //theUser ajouté au token
            dispatch(connectUser(theUser)); // User se connecte
          }
        })
        .catch((error) => console.log('error', error));
    }
  }, [admin, child]);

  if (redirect) {
    return <Navigate to="/login" />; //redirection vers route pour se connecter en tant que user
  }
  if (redirectAdmin) {
    return <Navigate to="/" />; //redirection route vers la page Home
  }
  return <Child admin child params={params} />; // Accès à la page demandée si tous les verifications sont correctes
};
export default RequireAuth;
