import { LOCALSTORAGE_ITEMS } from "../Redux/Constants";

export const LocalStorageCartService = {
  getData: () => {
    const data = localStorage.getItem(LOCALSTORAGE_ITEMS.cartItem);
    return data ? JSON.parse(data) : null;
  },

  saveData: (value) => {
    if (value && Object.prototype.toString.call(value) === "[object Object]") {
      localStorage.setItem(LOCALSTORAGE_ITEMS.cartItem, JSON.stringify(value));
    }
  },

  addItem: (productId, value) => {
    if (
      productId &&
      value &&
      Object.prototype.toString.call(value) === "[object Object]"
    ) {
      let cartData = LocalStorageCartService.getData() || {};
      if (
        value.quantity &&
        typeof value.quantity === "number" &&
        value.quantityUnits &&
        typeof value.quantityUnits === "number"
      ) {
        cartData[productId] = value;
      }

      LocalStorageCartService.saveData(cartData);
    }
  },

  deleteItem: (productId) => {
    if (productId) {
      let cartData = LocalStorageCartService.getData();
      if (cartData && cartData[productId]) {
        delete cartData[productId];
        LocalStorageCartService.saveData(cartData);
      }
    }
  },

  updateItem: (productId, { quantity, quantityUnits }) => {
    if (productId && typeof productId === "string") {
      let cartData = LocalStorageCartService.getData();
      if (cartData && cartData[productId]) {
        if (quantity !== undefined) {
          cartData[productId].quantity = quantity;
        }
        if (quantityUnits !== undefined) {
          cartData[productId].quantityUnits = quantityUnits;
        }
        LocalStorageCartService.saveData(cartData);
      }
    }
  },
};
