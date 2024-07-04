import React, { Component } from "react";
import { Box, Container, Grid } from "@mui/material";
import deliveryTruck from "../../../../../assets/img/delivery-truck.png";
import customerSupport from "../../../../../assets/img/customer-support.png";
import lockSync from "../../../../../assets/img/lock-sync.png";
import securityCheck from "../../../../../assets/img/security-check.png";

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
              <Grid item xs={12} lg={3} md={6} sm={6}>
                <Box className="service-box">
                  <Box className="icon">
                    <img src={deliveryTruck} alt="" />
                  </Box>
                  <Box className="info">
                    <Box className="name">Free Shipping</Box>
                    <Box className="text">Delivery at your door step</Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} lg={3} md={6} sm={6}>
                <Box className="service-box">
                  <Box className="icon">
                    <img src={customerSupport} alt="" />
                  </Box>
                  <Box className="info">
                    <Box className="name">24/7 Service</Box>
                    <Box className="text">Reach us when needed</Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} lg={3} md={6} sm={6}>
                <Box className="service-box">
                  <Box className="icon">
                    <img src={lockSync} alt="" />
                  </Box>
                  <Box className="info">
                    <Box className="name">Secure Payment</Box>
                    <Box className="text">We ensure Your money is safe</Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} lg={3} md={6} sm={6}>
                <Box className="service-box">
                  <Box className="icon">
                    <img src={securityCheck} alt="" />
                  </Box>
                  <Box className="info">
                    <Box className="name">100% Assurance</Box>
                    <Box className="text">We ensure Your money is safe</Box>
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
