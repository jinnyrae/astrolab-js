import axios from 'axios';
import { config } from '/Users/jinny/Documents/astrolab-js/astrolab-front/config.js';

const token = window.localStorage.getItem('3wa-project-token');

// Ajouter une commande
export function insertOrder(data) {
  return axios
    .post(`${config.api_url}/api/V1/Orders/add`, data, {
      headers: { 'x-access-token': token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
}
// Gestion de paiement
export function checkPayment(data) {
  return axios
    .post(`${config.api_url}/api/v1/Orders/payment`, data, {
      headers: { 'x-access-token': token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
}
// Modification du status d'une commande
export function updatePaymentStatus(data) {
  return axios
    .put(`${config.api_url}/api/v1/Orders/status`, data, {
      headers: { 'x-access-token': token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
}
// Récuperer toutes les commandes
export function getAllOrders() {
  return axios
    .get(`${config.api_url}/api/v1/Orders/all`, {
      headers: { 'x-access-token': token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
}
// Récuperer une commande par son id
export function getOneOrder(id) {
  return axios
    .get(`${config.api_url}/api/v1/Orders/${id}`, {
      headers: { 'x-access-token': token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
}
// Recuperer les commandes d'un utilisateur
export function getUserOrders(id) {
  return axios
    .get(`${config.api_url}/api/v1/Orders/user/${id}`, {
      headers: { 'x-access-token': token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
}
// Récuperer une commande détaillée
export function getDetailedOrder(id) {
  return axios
    .get(`${config.api_url}/api/v1/Orders/details/${id}`, {
      headers: { 'x-access-token': token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
}
