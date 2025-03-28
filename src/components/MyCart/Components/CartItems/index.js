import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Component } from "react";
import { connect } from "react-redux";
import status from "../../../../Redux/Constants";
import { LocalStorageCartService } from "Services/localStorageCartService";
import { Loader, loginDetails } from "Views/Utills/helperFunctions";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import { saveForLater } from "../../../../Redux/AllProducts/AllProductthunk";
import { fetchDefaultAddress } from "../../../../Redux/Address/AddressThunk";

import {
  fetchCartItems,
  deleteItemToCart,
  updateItemToCart,
  addListOfItemsToCartReq,
} from "../../../../Redux/Cart/CartThunk";
class Carts extends Component {
  constructor(props, handkeDrawerCloze) {
    super(props);
    this.state = {
      cartList: [],
      dataId: "",
      isUpdateIncrease: null,
      loaderCount: 0,
      deleteItemId: "",
    };
  }

  componentDidMount() {
    const items = loginDetails();
    if (items?.userId) {
      this.props.fetchDefaultAddress(items.userId);
      const cartData = LocalStorageCartService.getData() || {};
      this.props.addListOfItemsToCartReq({
        userId: items.userId,
        cartItems: Object.values(cartData).length ? Object.values(cartData) : [],
      });
      const addressId = localStorage.getItem("address");
      this.props.fetchCartItems({ 
        userId: items.userId, 
        addressId: addressId !== null ? addressId : undefined 
      });
          }
  }

  componentDidUpdate(prevProps, prevState) {
    
    const items = loginDetails();
    const addressId = localStorage.getItem("address") || undefined; // Explicitly set undefined if not found
    const { handleClose } = this.props;
    if (prevProps.triggerFetchCart !== this.props.triggerFetchCart && this.props.triggerFetchCart) {
      if (items?.userId && addressId) {
        this.props.fetchCartItems({ userId: items.userId, addressId });
      }}
  
    if (
      prevProps.defaultAddressData?.status !==
        this.props?.defaultAddressData?.status &&
      this.props?.defaultAddressData?.status === status.SUCCESS &&
      this.props?.defaultAddressData?.data
    ) {
      if (
        JSON.stringify(this.state.defaultSelectedAddress) !==
        JSON.stringify(this.props.defaultAddressData.data)
      ) {
        this.setState({
          defaultSelectedAddress: this.props.defaultAddressData.data,
        });
      }
    }
    if (
      prevProps.addListOfItemRes.status !==
        this.props.addListOfItemRes.status &&
      this.props.addListOfItemRes.status === status.SUCCESS && addressId
    ) {
      this.props.fetchCartItems({ userId: items.userId, addressId });
    }

    if (
      prevProps.cartItems.status !== this.props.cartItems.status &&
      this.props.cartItems.status === status.SUCCESS &&
      this.props.cartItems.data
    ) {
      let cartListData = [];
      let itemListData = [];

      this.props?.cartItems?.data?.items?.forEach((item) => {
        let data = {
          mrp: item.Mrp,
          price: item.Price,
          id: item.ProductId,
          Quantity: item.Quantity,
          savingsPercentage: item.Savings,
          subtotal: item.Subtotal,
          userId: item.UserId,
          image: item.productImage,
          name: item.productName,
        };

        let data1 = {
          productId: item.ProductId,
          quantity: item.Quantity,
          quantityUnits: item.QuantityUnits,
        };

        itemListData.push(data1);
        cartListData.push(data);
      });

      if (
        JSON.stringify(this.state.cartListArr) !== JSON.stringify(cartListData) ||
        JSON.stringify(this.state.itemListArr) !== JSON.stringify(itemListData)
      ) {
        this.setState({
          cartList: this.props.cartItems.data.items,
          ListData: this.props.cartItems.data.items,
          cartListArr: cartListData,
          itemListArr: itemListData,
          totalPrice: this.props.cartItems.data.finalTotal,
          loaderCount: 1,
        });
      }
    }

    if (
      prevProps.saveForLaterData.status !==
        this.props.saveForLaterData.status &&
      this.props.saveForLaterData.status === status.SUCCESS && addressId
    ) {
      this.props.fetchCartItems({ userId: items.userId, addressId });
      this.setState({ bookMarkId: "" });

      if (
        this.state.deleteItemId &&
        typeof this.state.deleteItemId === "string"
      ) {
        LocalStorageCartService.deleteItem(this.state.deleteItemId);
      }
    }

    if (
      prevProps.updateItems.status !== this.props.updateItems.status &&
      this.props.updateItems.status === status.SUCCESS &&
      this.props.updateItems.data && addressId
    ) {
      this.props.fetchCartItems({ userId: items.userId, addressId });

      if (
        this.state.deleteItemId &&
        typeof this.state.deleteItemId === "object" &&
        this.state.deleteItemId.productId
      ) {
        LocalStorageCartService.updateItem(
          this.state.deleteItemId.productId,
          this.state.deleteItemId
        );
        this.setState({ deleteItemId: null });
      }
    }

    if (
      prevProps.deleteItems.status !== this.props.deleteItems.status &&
      this.props.deleteItems.status === status.SUCCESS &&
      this.props.deleteItems.data && addressId
    ) {
      this.props.fetchCartItems({ userId: items.userId, addressId });

      if (
        this.state.deleteItemId &&
        typeof this.state.deleteItemId === "string"
      ) {
        LocalStorageCartService.deleteItem(this.state.deleteItemId);
        this.setState({ deleteItemId: null });
      }
    }

        }
      
  
  handleQuantityChange(id, increment, productQuantity = 0, qty) {
    const items = loginDetails();
    if (increment < 0 && productQuantity != 0) {
      this.setState({ isUpdateIncrease: false });
    } else if (productQuantity != 0) {
      this.setState({ isUpdateIncrease: true });
    }
    this.setState({
      dataId: id,
    });

    productQuantity = productQuantity + increment;
    if (productQuantity > 0) {
      this.setState({
        deleteItemId: {
          productId: id,
          quantity: parseInt(productQuantity),
          quantityUnits: qty,
        },
      });
      this.props.updateItemToCart({
        userId: items.userId,
        productId: id,
        quantity: parseInt(productQuantity),
        quantityUnits: qty,
      });
    } else {
      this.props.deleteItemToCart({
        userId: items.userId,
        productId: id,
      });
      this.setState({
        deleteItemId: id,
      });
    }
  }

  render() {
    const { dataId, isUpdateIncrease } = this.state;
    return (
      <>
        {this.props.cartItems.status === status.IN_PROGRESS ? (
          Loader.commonLoader() // Show loader while data is being fetched
        ) : (
          <div className="items_container">
            {this.state.cartList?.length > 0 ? (
              this.state.cartList.map((item) => {
                return (
                  <Box className="cart_item" key={item?.ProductId}>
                    {/* Image */}
                    <Box
                      className="img_box"
                      onClick={() => {
                        this.props.navigate(
                          `/product-details/${item?.category}/${item?.subcategory}/${item?.ProductId}`
                        );
                      }}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 1,
                        marginRight: 2,
                        overflow: "hidden",
                        border: "1px solid #F0F0F0",
                        padding: "2px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                        src={item?.productImage}
                        alt="product-cart-img"
                      />
                    </Box>
                    <Box className="item_details" flexGrow={1}>
                      <span>{item?.productName}</span>
                      <span>{item?.quantity}</span>
                      <Box display="flex" alignItems="center">
                        <span className="price">₹{item?.Price}</span>
                        <span className="mrp">₹{item?.Mrp}</span>
                      </Box>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      borderRadius={1}
                      bgcolor="#1F9151"
                      color="white"
                    >
                      <IconButton
                        onClick={() => {
                          let d = item.Quantity;

                          this.handleQuantityChange(
                            item.ProductId,
                            -1,
                            Number(d),
                            item.QuantityUnits
                          );
                        }}
                        size="small"
                        color="inherit"
                      >
                        {(this.props.deleteItems.status ===
                          status.IN_PROGRESS &&
                          item.ProductId === dataId &&
                          !isUpdateIncrease) ||
                        (this.props.updateItems.status === status.IN_PROGRESS &&
                          item.ProductId === dataId &&
                          !isUpdateIncrease) ? (
                          <CircularProgress size={24} />
                        ) : (
                          "-"
                        )}
                      </IconButton>
                      <Typography variant="body1" mx={1}>
                        {item?.Quantity}
                      </Typography>
                      <IconButton
                        onClick={() => {
                          let d = item.Quantity;
                          this.handleQuantityChange(
                            item.ProductId,
                            1,
                            Number(d),
                            item.QuantityUnits
                          );
                        }}
                        size="small"
                        color="inherit"
                      >
                        {this.props.updateItems.status === status.IN_PROGRESS &&
                        item.ProductId === dataId &&
                        isUpdateIncrease ? (
                          <CircularProgress size={24} />
                        ) : (
                          "+"
                        )}
                      </IconButton>
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  minHeight: "100px",
                  alignItems: "center",
                }}
              >
                No Items In Cart
              </Box>
            )}
          </div>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  const { cartItems, deleteItems, updateItems, addListOfItemRes } =
    state.cartitem;
  const { loginData } = state.login;
  const { saveForLaterData } = state.allproducts;
  return {
    cartItems,
    loginData,
    deleteItems,
    updateItems,
    saveForLaterData,
    addListOfItemRes,
  };
}

const mapDispatchToProps = {
  fetchCartItems,
  deleteItemToCart,
  updateItemToCart,
  saveForLater,
  addListOfItemsToCartReq,
  fetchDefaultAddress,

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(Carts));
