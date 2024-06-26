import React, { Component } from "react";
import { Box, Container, Button, Grid, IconButton } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import realtedProdctImg1 from "../../assets/img/realted-product-1.png";
import starIcon from "../../assets/img/star.png";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import productCartImg from "../../assets/img/product-cart-img.png";

class MyCart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
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
              <Box className="sub-total d-flex align-items-center">
                <strong className="title">Subtotal</strong>
                <span className="item-count">(3 Items) :</span>
                <strong className="number">₹ 200.12</strong>
              </Box>
              <Box className="saving-amount">
                <strong className="title">Savings : </strong>
                <strong className="number">₹ 120.12</strong>
              </Box>
              <Button
                variant="contained"
                fullWidth
                className="common-btn"
                endIcon={<NavigateNextIcon />}
              >
                Checkout
              </Button>
            </Box>
          </Box>
          <Box className="cart-item-list">
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
            </Grid>
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
              <Grid item xs={4}>
                <Box className="product-details d-flex align-items-center ">
                  <img src={realtedProdctImg1} alt="" />
                  <Box className="product-price-info">
                    <span className="d-block product-name">Green Apple</span>
                    <Box className="d-flex align-items-center">
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
              <Grid item xs={4}>
                <Box className="product-details d-flex align-items-center ">
                  <img src={realtedProdctImg1} alt="" />
                  <Box className="product-price-info">
                    <span className="d-block product-name">Green Apple</span>
                    <Box className="d-flex align-items-center">
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
              <Grid item xs={4}>
                <Box className="product-details d-flex align-items-center ">
                  <img src={realtedProdctImg1} alt="" />
                  <Box className="product-price-info">
                    <span className="d-block product-name">Green Apple</span>
                    <Box className="d-flex align-items-center">
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
      </Box>
    );
  }
}

export default MyCart;
