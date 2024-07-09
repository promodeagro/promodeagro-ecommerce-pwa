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
import RelatedViewedItems from "./components/relatedViewedItems";
class MyCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartList: [],
      dataId: "",
      isUpdateIncrease: null
    };
  }

  componentDidMount() {
    const items = loginDetails();
    this.props.fetchCartItems({
      userId: items.userId,
    });
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
    }

    if (
      prevProps.deleteItems.status !== this.props.deleteItems.status &&
      this.props.deleteItems.status === status.SUCCESS &&
      this.props.deleteItems.data
    ) {
      this.props.fetchCartItems({
        userId: items.userId,
      });
    }
  }
  handleQuantityChange(id, increment, productQuantity) {
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
    if (productQuantity != 0) {
      this.props.updateItemToCart({
        userId: items.userId,
        productId: id,
        quantity: productQuantity.toString(),
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
                  <span className="item-count">(3 Items) :</span>
                  <strong className="number">₹ 200.12</strong>
                </Box>
                <Box className="saving-amount">
                  <strong className="title">Savings : </strong>
                  <strong className="number">₹ 120.12</strong>
                </Box>
                <Link to={"/myCart/address"} className="checkout-btn">
                  <Button
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
                      Items : 3
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
                            <Box className="product-cart-img">
                              <img
                                src={item?.productImage}
                                alt="product-cart-img"
                              />
                            </Box>
                            <Box className="d-block">
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
                                  Number(d)
                                );
                              }}
                            >
                              {(this.props.deleteItems.status === status.IN_PROGRESS && item.ProductId === dataId && !isUpdateIncrease) ||
                                (this.props.updateItems.status === status.IN_PROGRESS && item.ProductId === dataId && !isUpdateIncrease) ? (
                                <CircularProgress className="common-loader plus-icon" size={24} />
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
                                  Number(d)
                                );
                              }}
                            >
                              {this.props.updateItems.status === status.IN_PROGRESS && item.ProductId === dataId && isUpdateIncrease ? (
                                <CircularProgress className="common-loader plus-icon" size={24} />
                              ) : (
                                "+"
                              )}
                            </Box>

                          </Box>
                          <Box className="d-flex align-items-ceneter btn-group">
                            <Button
                              onClick={() => {
                                console.log("item", item);
                                const items = loginDetails();
                                this.props.deleteItemToCart({
                                  userId: items.userId,
                                  productId: item.ProductId,
                                });
                              }}
                            >
                              Delete
                            </Button>
                            <Button>Save it for later</Button>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                          <Box
                            className="sub-total"
                          >
                            <span className="d-block final-amount">
                              ₹ {item?.Subtotal}
                            </span>
                            <span className="d-block save-amount">
                              Saved : <strong>₹ {item.Savings}</strong>
                            </span>
                          </Box>
                        </Grid>
                      </Grid>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </Box>
          </Container>
          <RelatedViewedItems />
        </Box>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { cartItems, deleteItems, updateItems } = state.cartitem;
  const { loginData } = state.login;
  return { cartItems, loginData, deleteItems, updateItems };
}

const mapDispatchToProps = {
  fetchCartItems,
  deleteItemToCart,
  updateItemToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCart);
