import React, { Component } from "react";
import { Box, Container, Button, Grid, IconButton } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import realtedProdctImg1 from "../../assets/img/realted-product-1.png";
import starIcon from "../../assets/img/star.png";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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
        </Container>
        <Box className="Related-products-container">
          <Container>
            <Box className="heading-part d-flex align-items-center justify-content-between">
              <span className="d-block title">Related Products</span>
              <Link to="">
                <span className="d-block">Show All</span>
              </Link>
            </Box>
            <Grid container spacing={2}>
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
