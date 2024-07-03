import React, { Component } from "react";
import { Box, Container, Grid } from "@mui/material";
import offersBanner1 from "../../../../../assets/img/offers-banner1.png";
import offersBanner2 from "../../../../../assets/img/offers-banner2.png";
import offersBanner3 from "../../../../../assets/img/offers-banner3.png";
import { Link } from "react-router-dom";

class OffersYouMightLike extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Box className="offers-banners-container">
        <Container>
          <Box className="heading">Offers You Might Like</Box>
          <Box className="banners">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <Box className="image">
                  <Link to="/category">
                    <img src={offersBanner1} alt="" />
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box className="image">
                  <Link to="/category">
                    <img src={offersBanner2} alt="" />
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Box className="d-flex w-100 justify-content-center">
                  <Box className="image">
                    <Link to="/category">
                      <img src={offersBanner3} alt="" />
                    </Link>
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

export default OffersYouMightLike;
