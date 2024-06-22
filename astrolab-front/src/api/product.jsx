import axios from 'axios';
import { config } from '../../config';

const token = window.localStorage.getItem('3wa-project-token');

// Afficher tous les produit
export function displayAllProducts() {
  return axios
    .get(`${config.api_url}/api/v1/Products/all`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
}

//recuperer un produit
export function getOneProduct(id) {
  return axios
    .get(`${config.api_url}/api/v1/Products/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
}
// Ajouter un produit
export function insertProduct(data) {
  return axios
    .post(`${config.api_url}/api/v1/Products/insert`, data, {
      headers: { 'x-access-token': token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
}
// Modifier un produit
export function updateProduct(data, id) {
  return axios
    .put(`${config.api_url}/api/v1/Products/update/${id}`, data, {
      headers: { 'x-access-token': token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
}
// Supprimer un produit
export function deleteProduct(id) {
  return axios
    .delete(`${config.api_url}/api/v1/Products/delete/${id}`, {
      headers: { 'x-access-token': token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
}
export function favoriteProducts(data) {
  return axios
    .post(`${config.api_url}/api/v1/Products/favorite`, data, {
      headers: { 'x-access-token': token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
}
