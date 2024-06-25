import React, { Component } from "react";
import { Box, Container, Grid } from "@mui/material";
import offersBanner1 from "../../../../assets/img/offers-banner1.png";
import offersBanner2 from "../../../../assets/img/offers-banner2.png";
import offersBanner3 from "../../../../assets/img/offers-banner3.png";

class OffersYouMightLike extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Box className="offers-banners-container">
        <Container>
          <Box className="heading">Offers You Might Like</Box>
          <Box className="banners">
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={6}>
                <Box className="image">
                  <a href="#">
                    <img src={offersBanner1} alt="" />
                  </a>
                </Box>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <Box className="image">
                  <a href="#">
                    <img src={offersBanner2} alt="" />
                  </a>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Box className="d-flex w-100 justify-content-center">
                  <Box className="image">
                    <a href="#">
                      <img src={offersBanner3} alt="" />
                    </a>
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
