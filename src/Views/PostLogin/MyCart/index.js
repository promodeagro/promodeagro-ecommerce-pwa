import React, { Component } from "react";
import { Box, Container, Button, Grid, IconButton } from "@mui/material";
import { fetchCartItems, deleteItemToCart, updateItemToCart } from "../../../Redux/Cart/CartThunk";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import realtedProdctImg1 from "../../../assets/img/realted-product-1.png";
import starIcon from "../../../assets/img/star.png";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import productCartImg from "../../../assets/img/product-cart-img.png";
import { connect } from "react-redux"
import status from "../../../Redux/Constants";
import { Loader } from "../../../Views/Utills/helperFunctions";
import _ from "lodash"
class MyCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartList: []
    };
  }

  componentDidMount() {

    const items = JSON.parse(localStorage.getItem("login"));
    this.props.fetchCartItems({
      userId: items.userId
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const items = JSON.parse(localStorage.getItem("login"));
    if (
      prevProps.cartItems.status !==
      this.props.cartItems.status &&
      this.props.cartItems.status === status.SUCCESS &&
      this.props.cartItems.data
    ) {

      this.setState({
        cartList: this.props.cartItems.data.items
      })

    }

    if (
      prevProps.updateItems.status !== this.props.updateItems.status &&
      this.props.updateItems.status === status.SUCCESS &&
      this.props.updateItems.data
    ) {


      this.props.fetchCartItems({
        userId: items.userId
      });
    }




    if (
      prevProps.deleteItems.status !== this.props.deleteItems.status &&
      this.props.deleteItems.status === status.SUCCESS &&
      this.props.deleteItems.data
    ) {

      this.props.fetchCartItems({
        userId: items.userId
      });
    }
  }


  handleQuantityChange(id, increment, productQuantity) {
    const items = JSON.parse(localStorage.getItem("login"));
    productQuantity = productQuantity + increment
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
    return (
      <>{this.props.cartItems.status === status.IN_PROGRESS ? Loader.commonLoader() : <Box className="mycart-container">
        <Container>
          <Box className="sub-total-container d-flex justify-content-between">
            <Box className="left-part">
              <h1 className="d-block">My Cart</h1>
              <p className="d-block sub-heading">
                This is your cart based on your item you want to buy..
              </p>
            </Box>
            <Box className="right-part">
              <Box className="sub-total d-flex align-items-center">
                <strong className="title">Subtotal</strong>
                <span className="item-count">(3 Items) :</span>
                <strong className="number">₹ 200.12</strong>
              </Box>
              <Box className="saving-amount">
                <strong className="title">Savings : </strong>
                <strong className="number">₹ 120.12</strong>
              </Box>
              <Link to={"/myCart/address"}>
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
            {this.state.cartList.length > 0 ?

              <>
                <Grid
                  container
                  spacing={2}
                  alignItems={"center"}
                  className="cart-item-title"
                  data-aos="zoom-in-right"
                >
                  <Grid item xs={6}>
                    Items : 3
                  </Grid>
                  <Grid item xs={3}>
                    Quantity
                  </Grid>
                  <Grid item xs={3} justifyContent={"end"} display={"flex"}>
                    Sub total
                  </Grid>
                </Grid>
                {this.state.cartList.map((item) => {

                  return <Grid
                    container
                    spacing={2}
                    className="product-cart-container"
                    alignItems={"center"}
                    data-aos="zoom-in-right"
                  >
                    <Grid item xs={6}>
                      <Box className="d-flex align-items-center product-cart-list">
                        <img src={productCartImg} alt="product-cart-img" />
                        <Box className="d-block">
                          <span className="d-block name">Green Apple</span>
                          <Box className="d-flex align-items-center">
                            <span className="discount-amount">₹ 14.99</span>
                            <s className="amount">₹ 20.99</s>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
                      <Box className="number-input-container">

                        <Box className="number-input-container">
                          <Box
                            className="symbol"
                            onClick={() => {

                              let d = item.Quantity;
                              this.handleQuantityChange(item.ProductId, -1, Number(d));

                            }}
                          >
                            -
                          </Box>

                          <Box className="Number">{item?.Quantity}</Box>
                          <Box
                            className="symbol"
                            onClick={() => {
                              let d = item.Quantity;
                              this.handleQuantityChange(item.ProductId, 1, Number(d));


                            }}
                          >
                            +
                          </Box>
                        </Box>

                      </Box>
                      <Box className="d-flex align-items-ceneter btn-group">
                        <Button onClick={() => {
                          console.log("item", item);
                          const items = JSON.parse(localStorage.getItem("login"));
                          this.props.deleteItemToCart({
                            userId: items.userId,
                            productId: item.ProductId,
                          });
                        }}>Delete</Button>
                        <Button>Save it for later</Button>
                      </Box>
                    </Grid>
                    <Grid item xs={3} justifyContent={"end"} display={"flex"}>
                      <Box className="sub-total ">
                        <span className="d-block final-amount">₹ 200.12</span>
                        <span className="d-block save-amount">
                          Saved : <strong>₹ 120.12</strong>
                        </span>
                      </Box>
                    </Grid>
                  </Grid>
                })}

                {/* <Grid
                  container
                  spacing={2}
                  className="product-cart-container"
                  alignItems={"center"}
                  data-aos="zoom-in-right"
                >
                  <Grid item xs={6}>
                    <Box className="d-flex align-items-center product-cart-list">
                      <img src={productCartImg} alt="product-cart-img" />
                      <Box className="d-block">
                        <span className="d-block name">Green Apple</span>
                        <Box className="d-flex align-items-center">
                          <span className="discount-amount">₹ 14.99</span>
                          <s className="amount">₹ 20.99</s>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box className="number-input-container">
                      <Box className="symbol">-</Box>
                      <Box className="Number">3</Box>
                      <Box className="symbol">+</Box>
                    </Box>
                    <Box className="d-flex align-items-ceneter btn-group">
                      <Button>Delete</Button>
                      <Button>Save it for later</Button>
                    </Box>
                  </Grid>
                  <Grid item xs={3} justifyContent={"end"} display={"flex"}>
                    <Box className="sub-total ">
                      <span className="d-block final-amount">₹ 200.12</span>
                      <span className="d-block save-amount">
                        Saved : <strong>₹ 120.12</strong>
                      </span>
                    </Box>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  className="product-cart-container"
                  alignItems={"center"}
                  data-aos="zoom-in-right"
                >
                  <Grid item xs={6}>
                    <Box className="d-flex align-items-center product-cart-list">
                      <img src={productCartImg} alt="product-cart-img" />
                      <Box className="d-block">
                        <span className="d-block name">Green Apple</span>
                        <Box className="d-flex align-items-center">
                          <span className="discount-amount">₹ 14.99</span>
                          <s className="amount">₹ 20.99</s>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box className="number-input-container">
                      <Box className="symbol">-</Box>
                      <Box className="Number">3</Box>
                      <Box className="symbol">+</Box>
                    </Box>
                    <Box className="d-flex align-items-ceneter btn-group">
                      <Button>Delete</Button>
                      <Button>Save it for later</Button>
                    </Box>
                  </Grid>
                  <Grid item xs={3} justifyContent={"end"} display={"flex"}>
                    <Box className="sub-total ">
                      <span className="d-block final-amount">₹ 200.12</span>
                      <span className="d-block save-amount">
                        Saved : <strong>₹ 120.12</strong>
                      </span>
                    </Box>
                  </Grid>
                </Grid> */}
              </>
              : <></>}

          </Box>
        </Container>
        <Box className="Related-products-container">
          <Container>
            <Box className="heading-part d-flex align-items-center justify-content-between">
              <span className="d-block title">Related Products</span>
              <Link to="">
                <span className="d-block">Show All</span>
              </Link>
            </Box>
            <Grid container spacing={2} data-aos="zoom-in">
              <Grid item lg={4} md={6} sm={12} xs={12} >
                <Box className="product-details d-flex align-items-center ">
                  <img src={realtedProdctImg1} alt="" />
                  <Box className="product-price-info">
                    <span className="d-block product-name">Green Apple</span>
                    <Box className="amount-info d-flex align-items-center">
                      <span className="drop-amount">₹ 14.99</span>
                      <s className="final-amount">₹ 20.99</s>
                    </Box>
                    <Box className="rating-info d-flex align-items-center justify-content-between">
                      <Box className="rating d-flex align-items-center">
                        <img src={starIcon} alt="star-icon" />
                        <span className="rating-number">4.5</span>
                      </Box>
                      <Box className="d-flex align-items-center justify-content-between">
                        <IconButton aria-label="bookmark" className="icon-btn">
                          <BookmarkBorderIcon />
                        </IconButton>
                        <IconButton aria-label="bookmark" className="icon-btn">
                          <ShoppingCartIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12} >
                <Box className="product-details d-flex align-items-center ">
                  <img src={realtedProdctImg1} alt="" />
                  <Box className="product-price-info">
                    <span className="d-block product-name">Green Apple</span>
                    <Box className="amount-info d-flex align-items-center">
                      <span className="drop-amount">₹ 14.99</span>
                      <s className="final-amount">₹ 20.99</s>
                    </Box>
                    <Box className="rating-info d-flex align-items-center justify-content-between">
                      <Box className="rating d-flex align-items-center">
                        <img src={starIcon} alt="star-icon" />
                        <span className="rating-number">4.5</span>
                      </Box>
                      <Box className="d-flex align-items-center justify-content-between">
                        <IconButton aria-label="bookmark" className="icon-btn">
                          <BookmarkBorderIcon />
                        </IconButton>
                        <IconButton aria-label="bookmark" className="icon-btn">
                          <ShoppingCartIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12} >
                <Box className="product-details d-flex align-items-center ">
                  <img src={realtedProdctImg1} alt="" />
                  <Box className="product-price-info">
                    <span className="d-block product-name">Green Apple</span>
                    <Box className="amount-info d-flex align-items-center">
                      <span className="drop-amount">₹ 14.99</span>
                      <s className="final-amount">₹ 20.99</s>
                    </Box>
                    <Box className="rating-info d-flex align-items-center justify-content-between">
                      <Box className="rating d-flex align-items-center">
                        <img src={starIcon} alt="star-icon" />
                        <span className="rating-number">4.5</span>
                      </Box>
                      <Box className="d-flex align-items-center justify-content-between">
                        <IconButton aria-label="bookmark" className="icon-btn">
                          <BookmarkBorderIcon />
                        </IconButton>
                        <IconButton aria-label="bookmark" className="icon-btn">
                          <ShoppingCartIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>}</>

    );
  }
}


function mapStateToProps(state) {
  const { cartItems, deleteItems, updateItems } = state.cartitem;
  const { loginData } = state.login;
  return { cartItems, loginData, deleteItems, updateItems };


}

const mapDispatchToProps = { fetchCartItems, deleteItemToCart, updateItemToCart };

export default connect(mapStateToProps, mapDispatchToProps)(MyCart);
