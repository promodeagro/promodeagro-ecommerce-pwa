const BASE_URL1 = "https://fakestoreapi.com";
// const BASE_URL = "https://khs9kwylpc.execute-api.us-east-1.amazonaws.com";
const BASE_URL = "https://09ubwkjphb.execute-api.us-east-1.amazonaws.com"

const Config = {
  BASE_URL,
  HOME: `${BASE_URL}/product`,
  TOP_SELLING: `${BASE_URL1}/products`,
  SIGN_UP: `${BASE_URL}/register`,
  SIGN_IN: `${BASE_URL}/login`,
  ALL_PRODUCTS: `${BASE_URL}/product`,
  ADD_ITEM: `${BASE_URL}/cart/addItem`,
  FETCH_CART_ITEMS: `${BASE_URL}/cart/getItems`,
  UPDATE_ITEM: `${BASE_URL}/cart/updateItem`,
  DELETE_ITEM: `${BASE_URL}/cart/deleteItem`,
  GET_ALL_ADDRESS: `${BASE_URL}/getAllAddress`,
  ADD_ADDRESS: `${BASE_URL}/addAddress`,
  DELETE_ADDRESS: `${BASE_URL}/deleteAddress`,
  UPDATE_ADDRESS: `${BASE_URL}/updateAddress`,
  PLACE_ORDER: `${BASE_URL}/order`,
  FORGOT_PASSWORD: `${BASE_URL}/changePassword`,
  GLOBAL_SEARCH: `${BASE_URL}/products/search`,
  CATEGOREIS:`${BASE_URL}/category`,
  SET_DEFAULT_ADDRESS:`${BASE_URL}/setDefaultAddress`,
  GET_DEFAULT_ADDRESS:`${BASE_URL}/getDefaultAddress`,
  
  
};

export default Config;
