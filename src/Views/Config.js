const BASE_URL1 = "https://fakestoreapi.com";
// const BASE_URL = "https://khs9kwylpc.execute-api.us-east-1.amazonaws.com";
const BASE_URL = "https://09ubwkjphb.execute-api.us-east-1.amazonaws.com";

const Config = {
  BASE_URL,
  HOME: `${BASE_URL}/product`,
  FILTERED_PRODUCTS: `${BASE_URL}/products`,
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
  FORGOT_PASSWORD: `${BASE_URL}/forgetPassword`,
  GLOBAL_SEARCH: `${BASE_URL}/products/search`,
  CATEGOREIS: `${BASE_URL}/category`,
  SET_DEFAULT_ADDRESS: `${BASE_URL}/setDefaultAddress`,
  GET_DEFAULT_ADDRESS: `${BASE_URL}/getDefaultAddress`,
  DELIVERY_SLOT: `${BASE_URL}/getAvailableDeliverySlots`,
  PRODUCT_BY_SUBCATEGORY: `${BASE_URL}/getProductBySubCategory`,
  PRODUCT_BY_CATEGORY: `${BASE_URL}/getProductByCategory`,
  ADD_PRODUCT_WISHLIST: `${BASE_URL}/addProductInWishList`,
  DELETE_PRODUCT_WISHLIST: `${BASE_URL}/removeProductInWishList`,
  GET_PRODUCT_WISHLIST: `${BASE_URL}/getUserWishList`,
  GET_PRODUCT_REIVEW: `${BASE_URL}/getProductReview`,
  CHANGE_PASSWORD: `${BASE_URL}/changePassword`,
  TOP_SELLING_PRODUCTS: `${BASE_URL}/getTopSellingProducts`,
  GET_TOP_SELLING_CATEGOREIS: `${BASE_URL}/getTopSellingCategories`,
  GET_ALL_OFFERS: `${BASE_URL}/getAllOffers`,
  ADD_PRODUCT_REVIEW: `${BASE_URL}/addProductReview`,
  DELETE_USER: `${BASE_URL}/deleteUser`,
  UPDATE_PERSONAL_DETAILS: `${BASE_URL}/updatePersnalDetail`,
  FETCH_PERSONAL_DETAILS: `${BASE_URL}/getPersnalDetails`,
};

export default Config;
