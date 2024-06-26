import React, { Component } from "react";
import { Box, Container, Grid } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import bannerImg from "../../../../assets/img/banner-img.png";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

class MainBanner extends Component {


  render() {
    return (
      <Box className="main-banner-container">
        <Container>
          <Carousel
            showDots={false}
            responsive={responsive}
            autoPlay={this.props.deviceType !== "mobile" ? true : false}
            keyBoardControl={true}
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType={this.props.deviceType}
          >
            <Box className="banner-contents">
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={6}></Grid>
                <Grid item xs={6} sm={6} md={6}>
                  <Box className="image"><img src={bannerImg} alt="" /></Box>
                </Grid>
              </Grid>
            </Box>
          </Carousel>
        </Container>
      </Box>
    );
  }
}

export default MainBanner;
