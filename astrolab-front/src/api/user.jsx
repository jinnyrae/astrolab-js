import axios from 'axios';
import { config } from '../../config';

const token = window.localStorage.getItem('3wa-project-token');

// ajouter un utilisateur
export function insertUser(data) {
  return axios
    .post(`${config.api_url}/api/v1/Users/save`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
}

//Connexion utilisateur
export function loginUser(data) {
  return axios
    .post(`${config.api_url}/api/v1/Users/login`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
}

// Modifier un utilisateur
export function updateUser(data, id) {
  return axios
    .put(`${config.api_url}/api/v1/Users/update/${id}`, data, {
      headers: { 'x-access-token': token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
}

//Suppromer un utilisateur
export function deleteUser(id) {
  return axios
    .delete(`${config.api_url}/api/v1/Users/delete/${id}`, {
      headers: { 'x-access-token': token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
}

// Get user by id/ Admin
export function userById(id) {
  return axios
    .get(`${config.api_url}/api/v1/Users/${id}`, {
      headers: { 'x-access-token': token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
}

// Verification du token pour une reconnexion automatique
export function checkToken() {
  return axios
    .get(`${config.api_url}/api/v1/auth/checkToken`, {
      headers: { 'x-access-token': token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
}

// Get all users
export function getAllUsers() {
  return axios
    .get(`${config.api_url}/api/v1/Users`, {
      headers: { 'x-access-token': token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
}

// Modifier le role d'un user / Admin
export function updateUserRole(id, data) {
  return axios
    .put(`${config.api_url}/api/v1/Users/role/${id}`, data, {
      headers: { 'x-access-token': token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
}
