import React, { Component } from "react";
import {
  Box,
  Container,
  Rating,
  TextField,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import successImg from "../../../../../assets/img/success.png";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";

class OrderPlaced extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  render() {
    return (
      <Container>
        <Box
          className="order-placed-container"
          data-aos="zoom-in-right"
          data-aos-offset="200"
          data-aos-easing="ease-in-sine"
        >
          <Box className="order-placed-message">
            <Box className="d-block w-100">
              <img src={successImg} alt="" />
            </Box>
            <Box className="rating d-flex align-items-center justify-content-center w-100">
              <Rating
                name="simple-controlled"
                value={this.state.value}
                onChange={(event, newValue) => {
                  this.setState({ value: newValue });
                }}
                size="large"
              />
              <span className="d-block rating-info">How was everything ?</span>
            </Box>
            <h1 className="d-block title">Order Placed</h1>
            <p className="thank-you-message d-block">
              Thank’s for your order at Elma e-commerce. Your order will be
              processed as soon as possible. Make sure you make note of your
              order number, which is <strong>1234ABCD56EF.</strong> You will be
              receiving an email shortly with invoice from your order.
            </p>
            <Box className="d-flex align-items-center order-btn w-100 justify-content-center">
              <Link to={"/"}>
                <Button
                  variant="outlined"
                  fullWidth
                  className="outline-common-btn back-shopping-btn"
                  startIcon={<ArrowBackIosIcon fontSize="small" />}
                >
                  Back to shopping
                </Button>
              </Link>
              <Link to={"/my-order"}>
                <Button
                  variant="contained"
                  fullWidth
                  className="common-btn trach-order-btn"
                  startIcon={<LocalShippingIcon />}
                >
                  Track your order
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    );
  }
}

export default OrderPlaced;
