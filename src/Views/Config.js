const BASE_URL1 = "https://fakestoreapi.com";
const BASE_URL = "https://khs9kwylpc.execute-api.us-east-1.amazonaws.com"



const Config = {
    BASE_URL,
    HOME: `${BASE_URL1}/products`,
    TOP_SELLING: `${BASE_URL1}/products`,
    SIGN_UP: `${BASE_URL}/register`,
    SIGN_IN: `${BASE_URL}/login`,
    ALL_PRODUCTS: `${BASE_URL}/product`,
    ADD_ITEM: `${BASE_URL}/cart/addItem`,
    FETCH_CART_ITEMS: `${BASE_URL}/cart/getItems`,
    UPDATE_ITEM: `${BASE_URL}/cart/updateItem`,
    DELETE_ITEM: `${BASE_URL}/cart/deleteItem`,

};

export default Config;
