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
import rupee3 from "../../../../assets/img/rupee3.svg";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";

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
      console.log(cartData, "cartData");
      this.props.addListOfItemsToCartReq({
        userId: items.userId,
        cartItems: Object.values(cartData).length
          ? Object.values(cartData)
          : [],
      });
      const addressId = localStorage.getItem("address");
      this.props.fetchCartItems({
        userId: items.userId,
        addressId: addressId !== null ? addressId : undefined,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const items = loginDetails();
    const addressId = localStorage.getItem("address") || undefined; // Allow undefined explicitly
    const { handleClose } = this.props;

    // Fetch cart items when triggerFetchCart changes
    if (
      prevProps.triggerFetchCart !== this.props.triggerFetchCart &&
      this.props.triggerFetchCart
    ) {
      if (items?.userId) {
        // Removed addressId condition
        this.props.fetchCartItems({ userId: items.userId, addressId });
      }
    }

    // Update default selected address if it changes
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

    // Handle cart item updates
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
        JSON.stringify(this.state.cartListArr) !==
          JSON.stringify(cartListData) ||
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

    // Save for later functionality
    if (
      prevProps.saveForLaterData.status !==
        this.props.saveForLaterData.status &&
      this.props.saveForLaterData.status === status.SUCCESS
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

    // ✅ Fix: Allow updates to local storage even if addressId is undefined
    if (
      prevProps.updateItems.status !== this.props.updateItems.status &&
      this.props.updateItems.status === status.SUCCESS &&
      this.props.updateItems.data
    ) {
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

      // Fetch cart items only if userId exists
      if (items?.userId) {
        this.props.fetchCartItems({ userId: items.userId, addressId });
      }
    }

    // Handle delete items
    if (
      prevProps.deleteItems.status !== this.props.deleteItems.status &&
      this.props.deleteItems.status === status.SUCCESS &&
      this.props.deleteItems.data
    ) {
      if (items?.userId) {
        this.props.fetchCartItems({ userId: items.userId, addressId });
      }

      if (
        this.state.deleteItemId &&
        typeof this.state.deleteItemId === "string"
      ) {
        LocalStorageCartService.deleteItem(this.state.deleteItemId);
        this.setState({ deleteItemId: null });
      }
    }
  }

  // ✅ Fix: Update local storage immediately inside handleQuantityChange()
  handleQuantityChange(id, increment, productQuantity = 0, qty) {
    const items = loginDetails();
    let newQuantity = productQuantity + increment;

    // Always update Local Storage, even if addressId is undefined
    if (newQuantity > 0) {
      LocalStorageCartService.updateItem(id, {
        productId: id,
        quantity: parseInt(newQuantity),
        quantityUnits: qty,
      });
    } else {
      LocalStorageCartService.deleteItem(id);
    }

    this.setState({
      deleteItemId:
        newQuantity > 0
          ? { productId: id, quantity: newQuantity, quantityUnits: qty }
          : id,
    });

    // Fetch cart items only if userId exists
    if (items?.userId) {
      this.props.updateItemToCart({
        userId: items.userId,
        productId: id,
        quantity: parseInt(newQuantity),
        quantityUnits: qty,
      });
    }

    console.log("Updated Local Storage:", LocalStorageCartService.getData());
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
    const cartData = LocalStorageCartService.getData() || {};
    console.log(cartData, "cartData");
    console.log(this.state.cartList, "cartList");

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
                      <span style={{ fontSize: "12px" }}>
                        {item?.QuantityUnits}
                      </span>

                      <Box display="flex" alignItems="center">
                        <Box className="price">
                          <CurrencyRupeeOutlinedIcon
                            style={{
                              fontSize: "16px",
                              verticalAlign: "middle",
                            }}
                          />
                          {item?.Price}
                        </Box>
                        {item?.Mrp > 0 && (
                          <span className="mrp">
                            <CurrencyRupeeOutlinedIcon
                              style={{
                                fontSize: "13px",
                                verticalAlign: "middle",
                              }}
                            />
                            {item?.Mrp}
                          </span>
                        )}
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
