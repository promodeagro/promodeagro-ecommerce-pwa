import React, { Component } from "react";
import { Box, Container, Grid, Button } from "@mui/material";
import Carousel from "react-multi-carousel";
import EastIcon from '@mui/icons-material/East';
import bannerImg from "../../../../../assets/img/banner-img.png";
import uptoOffImg from "../../../../../assets/img/upto-off-img.png";

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
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Box className="main-banner-container">
        <Container>
          <Box className="main-banner-container">
            <Carousel
              id="carousel-2"
              showDots={true}
              responsive={responsive}
              containerClass="carousel-banner-container"
            >
              <Box className="banner-contents">
                <Grid container spacing={2} alignItems={'center'}>
                  <Grid item xs={6} sm={6} md={6}>
                    <Box className="contents">
                      <Box className="mostly-organic"><span>Mostly Organic</span></Box>
                      <Box className="heading">Fresh & Healthy <span>Organic </span> Food</Box>
                      <Box className="text">Enjoy free shipping on orders to PBEL City. Sit back and relax while we handle the delivery for you.</Box>
                      <Box className="button"><Button>Shop now <EastIcon /></Button></Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <Box className="images">
                      <Box className="upto-off-img"><img src={uptoOffImg} alt="" /></Box>
                      <Box className="image"><img src={bannerImg} alt="" /></Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box className="banner-contents">
                <Grid container spacing={2} alignItems={'center'}>
                  <Grid item xs={6} sm={6} md={6}>
                    <Box className="contents">
                      <Box className="mostly-organic"><span>Mostly Organic</span></Box>
                      <Box className="heading">Fresh & Healthy <span>Organic </span> Food</Box>
                      <Box className="text">Enjoy free shipping on orders to PBEL City. Sit back and relax while we handle the delivery for you.</Box>
                      <Box className="button"><Button>Shop now <EastIcon /></Button></Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <Box className="images">
                      <Box className="upto-off-img"><img src={uptoOffImg} alt="" /></Box>
                      <Box className="image"><img src={bannerImg} alt="" /></Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box className="banner-contents">
                <Grid container spacing={2} alignItems={'center'}>
                  <Grid item xs={6} sm={6} md={6}>
                    <Box className="contents">
                      <Box className="mostly-organic"><span>Mostly Organic</span></Box>
                      <Box className="heading">Fresh & Healthy <span>Organic </span> Food</Box>
                      <Box className="text">Enjoy free shipping on orders to PBEL City. Sit back and relax while we handle the delivery for you.</Box>
                      <Box className="button"><Button>Shop now <EastIcon /></Button></Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <Box className="images">
                      <Box className="upto-off-img"><img src={uptoOffImg} alt="" /></Box>
                      <Box className="image"><img src={bannerImg} alt="" /></Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Carousel>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default MainBanner;
