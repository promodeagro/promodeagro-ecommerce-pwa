import React, { Component } from "react";
import { Box, Container, Grid, Button } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import bannerImg from "../../../../../assets/img/banner-img.png";
import uptoOffImg from "../../../../../assets/img/upto-off-img.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

class MainBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <Box className="main-banner-container">
        <Container>
          <Box className="main-banner-container">
            <Slider {...settings}>
              <Box className="banner-contents">
                <Grid container spacing={2} alignItems={"center"}>
                  <Grid item xs={6} sm={6} md={6}>
                    <Box className="contents">
                      <Box className="mostly-organic">
                        <span>Mostly Organic</span>
                      </Box>
                      <Box className="heading">
                        Fresh & Healthy <span>Organic </span> Food
                      </Box>
                      <Box className="text">
                        Enjoy free shipping on orders to PBEL City. Sit back and
                        relax while we handle the delivery for you.
                      </Box>
                      <Box className="button">
                        <Link to="/category">
                          Shop now <EastIcon />
                        </Link>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <Box className="images">
                      <Box className="upto-off-img">
                        <img src={uptoOffImg} alt="" />
                      </Box>
                      <Box className="image">
                        <img src={bannerImg} alt="" />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box className="banner-contents">
                <Grid container spacing={2} alignItems={"center"}>
                  <Grid item xs={6} sm={6} md={6}>
                    <Box className="contents">
                      <Box className="mostly-organic">
                        <span>Mostly Organic</span>
                      </Box>
                      <Box className="heading">
                        Fresh & Healthy <span>Organic </span> Food
                      </Box>
                      <Box className="text">
                        Enjoy free shipping on orders to PBEL City. Sit back and
                        relax while we handle the delivery for you.
                      </Box>
                      <Box className="button">
                        <Link to="/category">
                          Shop now <EastIcon />
                        </Link>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <Box className="images">
                      <Box className="upto-off-img">
                        <img src={uptoOffImg} alt="" />
                      </Box>
                      <Box className="image">
                        <img src={bannerImg} alt="" />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box className="banner-contents">
                <Grid container spacing={2} alignItems={"center"}>
                  <Grid item xs={6} sm={6} md={6}>
                    <Box className="contents">
                      <Box className="mostly-organic">
                        <span>Mostly Organic</span>
                      </Box>
                      <Box className="heading">
                        Fresh & Healthy <span>Organic </span> Food
                      </Box>
                      <Box className="text">
                        Enjoy free shipping on orders to PBEL City. Sit back and
                        relax while we handle the delivery for you.
                      </Box>
                      <Box className="button">
                        <Link to="/category">
                          Shop now <EastIcon />
                        </Link>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <Box className="images">
                      <Box className="upto-off-img">
                        <img src={uptoOffImg} alt="" />
                      </Box>
                      <Box className="image">
                        <img src={bannerImg} alt="" />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Slider>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default MainBanner;
