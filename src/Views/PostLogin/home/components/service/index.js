import React, { Component } from "react";
import { Box, Container, Grid } from "@mui/material";
import deliveryTruck from "../../../../../assets/img/delivery-truck.png";
import customerSupport from "../../../../../assets/img/customer-support.png";
import securePayment from "../../../../../assets/img/secure-payment.png";
import moneyBack from "../../../../../assets/img/money-back.png";

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Box className="service-container">
        <Container>
          <Box className="services">
            <Grid container spacing={2}>
              <Grid item xs={6} lg={3} md={3} sm={3}>
                <Box className="service-box">
                  <Box className="icon">
                    <img src={deliveryTruck} alt="Free Shipping" />
                  </Box>
                  <Box className="info">
                    <Box className="name">Free Shipping</Box>
                    <Box className="text">Free shipping on all your order</Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6} lg={3} md={3} sm={3}>
                <Box className="service-box">
                  <Box className="icon">
                    <img src={customerSupport} alt="24/7 Service" />
                  </Box>
                  <Box className="info">
                    <Box className="name">Customer Support 24/7</Box>
                    <Box className="text">Instant access to Support</Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6} lg={3} md={3} sm={3}>
                <Box className="service-box">
                  <Box className="icon">
                    <img src={securePayment} alt="Secure Payment" />
                  </Box>
                  <Box className="info">
                    <Box className="name">100% Secure Payment</Box>
                    <Box className="text">We ensure your money is save</Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6} lg={3} md={3} sm={3}>
                <Box className="service-box">
                  <Box className="icon">
                    <img src={moneyBack} alt="100% Assurance" />
                  </Box>
                  <Box className="info">
                    <Box className="name">Money-Back Guarantee</Box>
                    <Box className="text">Same Days Money-Back Guarantee</Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default Service;
