import React, { Component } from "react";
import {
  Box,
  Container,
  Button,
  Grid,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  fetchCartItems,
  deleteItemToCart,
  updateItemToCart,
} from "../../../Redux/Cart/CartThunk";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import realtedProdctImg1 from "../../../assets/img/realted-product-1.png";
import starIcon from "../../../assets/img/star.png";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import productCartImg from "../../../assets/img/product-cart-img.png";
import { connect } from "react-redux";
import status from "../../../Redux/Constants";
import { Loader, loginDetails } from "../../../Views/Utills/helperFunctions";
import _ from "lodash";
import RecentlyViewedItems from "components/RecentlyViewedItems";
import { saveForLater } from "../../../Redux/AllProducts/AllProductthunk";
// import RelatedViewedItems from "./components/relatedViewedItems";
class MyCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartList: [],
      dataId: "",
      isUpdateIncrease: null,
      loaderCount: 0,
    };
  }

  componentDidMount() {
    const items = loginDetails();
    if (items?.userId) {
      this.props.fetchCartItems({
        userId: items.userId,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const items = loginDetails();
    if (
      prevProps.cartItems.status !== this.props.cartItems.status &&
      this.props.cartItems.status === status.SUCCESS &&
      this.props.cartItems.data
    ) {
      this.setState({
        cartList: this.props.cartItems.data.items,
        loaderCount: 1,
      });
    } else if (this.props.cartItems.status === status.FAILURE) {
      this.setState({
        cartList: [],
        loaderCount: 1,
      });
    }

    if (
      prevProps.saveForLaterData.status !==
        this.props.saveForLaterData.status &&
      this.props.saveForLaterData.status === status.SUCCESS
    ) {
      this.props.fetchCartItems({
        userId: items.userId,
      });
      this.setState({
        bookMarkId: "",
      });
    } else if (this.props.saveForLaterData.status === status.FAILURE) {
      this.setState({
        bookMarkId: "",
      });
    }

    if (
      prevProps.updateItems.status !== this.props.updateItems.status &&
      this.props.updateItems.status === status.SUCCESS &&
      this.props.updateItems.data
    ) {
      this.props.fetchCartItems({
        userId: items.userId,
      });
    } else if (this.props.updateItems.status === status.FAILURE) {
    }

    if (
      prevProps.deleteItems.status !== this.props.deleteItems.status &&
      this.props.deleteItems.status === status.SUCCESS &&
      this.props.deleteItems.data
    ) {
      this.props.fetchCartItems({
        userId: items.userId,
      });
    } else if (this.props.deleteItems.status === status.FAILURE) {
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
    }
  }

  render() {
    const { dataId, isUpdateIncrease } = this.state;
    return (
      <>
        <Box className="mycart-container">
          <Container>
            {this.state.cartList.length > 0 ? (
              <Box className="sub-total-container d-flex justify-content-between">
                <Box className="left-part">
                  <h1 className="d-block">My Cart</h1>
                  <p className="d-block sub-heading">
                    This is your cart based on your item you want to buy..
                  </p>
                </Box>
                <Box className="right-part">
                  <Box className="sub-total d-flex align-items-center flex-wrap">
                    <strong className="title">Subtotal </strong>
                    <span className="item-count">
                      ({this.state?.cartList?.length} Items) :
                    </span>
                    <strong className="number">
                      ₹ {this.props?.cartItems?.data?.subTotal}
                    </strong>
                  </Box>
                  <Box className="saving-amount">
                    <strong className="title">Savings : </strong>
                    <strong className="number">
                      ₹ {this.props?.cartItems?.data?.savings}
                    </strong>
                  </Box>
                  <Link to={"/mycart/address"} className="checkout-btn">
                    <Button
                      disabled={
                        this.props.saveForLaterData.status ===
                        status.IN_PROGRESS
                      }
                      variant="contained"
                      fullWidth
                      className="common-btn"
                      endIcon={<NavigateNextIcon />}
                    >
                      Checkout
                    </Button>
                  </Link>
                </Box>
              </Box>
            ) : (
              <></>
            )}
            {this.props.cartItems.status === status.IN_PROGRESS &&
            this.state.loaderCount == 0 ? (
              Loader.commonLoader()
            ) : (
              <Box className="cart-item-list">
                {this.state.cartList.length > 0 ? (
                  <>
                    <Grid
                      container
                      spacing={0}
                      alignItems={"center"}
                      className="cart-item-title"
                      data-aos="zoom-in-right"
                    >
                      <Grid item xs={6} md={6} lg={6} sm={6}>
                        Items : {this.state.cartList.length}
                      </Grid>
                      <Grid item xs={3} md={3} lg={3} sm={3}>
                        Quantity
                      </Grid>
                      <Grid
                        item
                        xs={3}
                        md={3}
                        lg={3}
                        sm={3}
                        justifyContent={"end"}
                        display={"flex"}
                      >
                        Sub total
                      </Grid>
                    </Grid>
                    {this.state.cartList.map((item) => {
                      return (
                        <Grid
                          container
                          spacing={0}
                          className="product-cart-container"
                          alignItems={"center"}
                          data-aos="zoom-in-right"
                        >
                          {/* <Box className="bookmark-btn">
                            <IconButton aria-label="bookmark">
                              <BookmarkBorderIcon />
                            </IconButton>
                          </Box> */}
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Box className="d-flex align-items-center product-cart-list">
                              <Box
                                className="product-cart-img"
                                onClick={() => {
                                  this.props.navigate(
                                    `/product-details/${
                                      item?.category ? item?.category : "FRUITS"
                                    }/${item?.productName}/${item?.ProductId}`
                                  );
                                }}
                              >
                                <img
                                  src={item?.productImage}
                                  alt="product-cart-img"
                                />
                              </Box>
                              <Box
                                className="d-block"
                                onClick={() => {
                                  this.props.navigate(
                                    `/product-details/${
                                      item?.category ? item?.category : "FRUITS"
                                    }/${item?.productName}/${item?.ProductId}`
                                  );
                                }}
                              >
                                <span className="d-block name">
                                  {item?.productName}
                                </span>
                                <Box className="d-flex align-items-center">
                                  <span className="discount-amount">
                                    ₹ {item?.Price}
                                  </span>
                                  <s className="amount">₹ {item?.Mrp} </s>
                                </Box>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <Box className="number-input-container">
                              <Box
                                className="symbol"
                                onClick={() => {
                                  let d = item.Quantity;

                                  this.handleQuantityChange(
                                    item.ProductId,
                                    -1,
                                    Number(d),
                                    item.QuantityUnits
                                  );
                                }}
                              >
                                {(this.props.deleteItems.status ===
                                  status.IN_PROGRESS &&
                                  item.ProductId === dataId &&
                                  !isUpdateIncrease) ||
                                (this.props.updateItems.status ===
                                  status.IN_PROGRESS &&
                                  item.ProductId === dataId &&
                                  !isUpdateIncrease) ? (
                                  <CircularProgress
                                    className="common-loader plus-icon"
                                    size={24}
                                  />
                                ) : (
                                  "-"
                                )}
                              </Box>

                              <Box className="Number">{item?.Quantity}</Box>
                              <Box
                                className="symbol"
                                onClick={() => {
                                  let d = item.Quantity;
                                  this.handleQuantityChange(
                                    item.ProductId,
                                    1,
                                    Number(d),
                                    item.QuantityUnits
                                  );
                                }}
                              >
                                {this.props.updateItems.status ===
                                  status.IN_PROGRESS &&
                                item.ProductId === dataId &&
                                isUpdateIncrease ? (
                                  <CircularProgress
                                    className="common-loader plus-icon"
                                    size={24}
                                  />
                                ) : (
                                  "+"
                                )}
                              </Box>
                            </Box>
                            <Box className="d-flex align-items-ceneter btn-group">
                              <Button
                                disabled={
                                  this.props.deleteItemToCart.status ===
                                  status.IN_PROGRESS
                                }
                                onClick={() => {
                                  this.handleQuantityChange(
                                    item.ProductId,
                                    -1,
                                    0
                                  );

                                  // const items = loginDetails();
                                  // this.props.deleteItemToCart({
                                  //   userId: items.userId,
                                  //   productId: item.ProductId,
                                  // });
                                }}
                              >
                                Delete
                              </Button>
                              <Button
                                disabled={
                                  this.props.saveForLaterData.status ===
                                  status.IN_PROGRESS
                                }
                                onClick={() => {
                                  this.props.saveForLater({
                                    userId: loginDetails()?.userId,
                                    productId: item.ProductId,
                                  });
                                }}
                              >
                                Save it for later
                              </Button>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <Box className="sub-total">
                              <span className="d-block final-amount">
                                ₹ {item?.Subtotal}
                              </span>
                              {item?.Savings ? (
                                <span className="d-block save-amount">
                                  Saved : <strong>₹ {item?.Savings}</strong>
                                </span>
                              ) : (
                                <></>
                              )}
                            </Box>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </>
                ) : (
                  <Box className="no-data"> No Items In Cart </Box>
                )}
              </Box>
            )}
          </Container>
          <RecentlyViewedItems />
        </Box>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { cartItems, deleteItems, updateItems } = state.cartitem;
  const { loginData } = state.login;
  const { saveForLaterData } = state.allproducts;
  return { cartItems, loginData, deleteItems, updateItems, saveForLaterData };
}

const mapDispatchToProps = {
  fetchCartItems,
  deleteItemToCart,
  updateItemToCart,
  saveForLater,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(MyCart));
