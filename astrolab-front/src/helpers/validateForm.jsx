/* eslint-disable no-case-declarations */
export const validateFormInput = (label, type, value) => {
  if (value === '') {
    // input non renseigné
    return `Veuillez remplir le champ ${label}!`;
  }

  switch (type) {
    case 'firstName':
      const regFirstName = /^[a-z]*$/i;
      if (regFirstName.test(value) === false) {
        return `Le champ ${label} doit contenir des lettres uniquement!`;
      }
      break;
    case 'lastName':
      const regLastName = /^[a-z]*$/i;
      if (regLastName.test(value) === false) {
        return `Le champ ${label} doit contenir des lettres uniquement!`;
      }
      break;
    case 'email':
      // eslint-disable-next-line no-case-declarations
      const regMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (regMail.test(value) === false) {
        return `Le champ ${label} n'est pas valide!`;
      }
      break;
    case 'password':
      const regPassword =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      if (regPassword.test(value) === false) {
        return `Le champ ${label} doit contenir minimum 8 charactères et au moins: un chiffre, une lettre majuscule, une lettre minuscule et un caractère spécial!`;
      }
      break;
    case 'phone':
      const regPhone =
        /^(\+[0-9]{2}[.\-\s]?|00[.\-\s]?[0-9]{2}|0)([0-9]{1,3}[.\-\s]?(?:[0-9]{2}[.\-\s]?){4})$/;
      if (regPhone.test(value) === false) {
        return `Le numero de teléphone n'est pas valid !`;
      }
      break;
    case 'addressLine1':
      if (value.length > 50) {
        return `Le champ ${label} ne dépasse pas 50 caractères!`;
      } else if (value.length < 5) {
        return `Veuillez compléter le champ ${label}!`;
      }
      break;
    case 'addressLine2':
      if (value.length > 50) {
        return `Le champ ${label} ne dépasse pas 50 caractères!`;
      } else if (value.length < 5) {
        return `Veuillez compléter le champ ${label}!`;
      }
      break;

    case 'city':
      const regCity = /^[a-z ]*$/i;
      if (regCity.test(value) === false) {
        return `Le champ ${label} doit contenir des lettres uniquement!`;
      }
      break;
    case 'country':
      const regCountry = /^[a-z ]*$/i;
      if (regCountry.test(value) === false) {
        return `Le champ ${label} doit contenir des lettres uniquement!`;
      }
      break;
  }
  return true;
};
