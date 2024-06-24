import { createSlice } from '@reduxjs/toolkit';

// Verification de l'existance d'un panier dans le local storage
let localStorageBasket = JSON.parse(
  window.localStorage.getItem('astrolab-basket'),
);
if (localStorageBasket === null) {
  localStorageBasket = [];
}
// Fonction pour calculer le montant total s'il y a un panier dans le local storage
const calculateTotalSum = (basket) => {
  let price = 0;
  basket.forEach((product) => {
    price += parseInt(product.cartQuantity) * parseFloat(product.price); // prix de l'articl * quantité
  });
  return price;
};
const basketPrice = calculateTotalSum(localStorageBasket); // le prix initial du panier dans le redux store

const initialState = {
  basket: localStorageBasket,
  totalPrice: basketPrice,
};
// Creation du slice

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    updateBasket: (state, action) => {
      let total = calculateTotalSum(action.payload);
      state.basket = action.payload;
      state.totalPrice = total;
    },
    emptyBasket: (state) => {
      state.basket = [];
      state.totalPrice = 0;
    },
  },
});
export const { updateBasket, emptyBasket } = basketSlice.actions;
export const selectBasket = (state) => state.basket;
export default basketSlice.reducer;
