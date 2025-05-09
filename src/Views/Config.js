const BASE_URL1 = "https://fakestoreapi.com";
// const BASE_URL = "https://khs9kwylpc.execute-api.us-east-1.amazonaws.com";

// const BASE_URL = "https://9ti4fcd117.execute-api.ap-south-1.amazonaws.com";
const BASE_URL = "https://7x29t2x9xk.execute-api.ap-south-1.amazonaws.com/prod";

const Config = {
  BASE_URL,
  HOME: `${BASE_URL}/product`,
  FILTERED_PRODUCTS: `${BASE_URL}/products`,
  PRODUCTS_DETAIL: `${BASE_URL}/productByGroupId`,
  SIGN_UP: `${BASE_URL}/register`,
  SIGN_IN: `${BASE_URL}/login`,
  VALIDATE_OTP: `${BASE_URL}/login/validate-otp`,
  ALL_PRODUCTS: `${BASE_URL}/product`,
  ADD_ITEM: `${BASE_URL}/cart/addItem`,
  FETCH_CART_ITEMS: `${BASE_URL}/cart/getItems`,
  UPDATE_ITEM: `${BASE_URL}/cart/updateItem`,
  DELETE_ITEM: `${BASE_URL}/cart/deleteItem`,
  ADDLISTOFITEMS: `${BASE_URL}/cart/addListOfItems`,
  GET_ALL_ADDRESS: `${BASE_URL}/getAllAddress`,
  ADD_ADDRESS: `${BASE_URL}/addAddress`,
  DELETE_ADDRESS: `${BASE_URL}/deleteAddress`,
  UPDATE_ADDRESS: `${BASE_URL}/updateAddress`,
  PLACE_ORDER: `${BASE_URL}/order`,
  ORDER_BY_ID: `${BASE_URL}/getOrderById`,
  FORGOT_PASSWORD: `${BASE_URL}/forgetPassword`,
  GLOBAL_SEARCH: `${BASE_URL}/products/search`,
  CATEGOREIS: `${BASE_URL}/getAllCategories`,
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
  GET_ALL_OFFERS: `${BASE_URL}/getOffers`,
  ADD_PRODUCT_REVIEW: `${BASE_URL}/addProductReview`,
  DELETE_USER: `${BASE_URL}/deleteUser`,
  UPDATE_PERSONAL_DETAILS: `${BASE_URL}/updatePersnalDetail`,
  FETCH_PERSONAL_DETAILS: `${BASE_URL}/getPersnalDetails`,
  SAVE_FOR_LATER: `${BASE_URL}/SaveForLater`,
  UPDATE_PRODUCT_PRICE: `${BASE_URL}/updatePriceByQty`,
  CANCLE_ORDER: `${BASE_URL}/cancleorder`,
  CANCLE_ORDER_REQUEST: `${BASE_URL}/cancelOrderRequest`,
  All_PRODUCT_WITH_CATEGORY: `${BASE_URL}/homePageProducts`,
  DELIVERY_SLOTS: `${BASE_URL}/slot`,
  CREATE_FEEDBACK: `${BASE_URL}/createFeedback`,
  // GET_ALGOLIA_KEYS:`${BASE_URL}/getSecrets`
};

export default Config;
