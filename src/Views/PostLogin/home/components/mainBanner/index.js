import React, { Component } from "react";
import { Box, Container, Grid, Button } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import bannerImg from "../../../../../assets/img/banner-img.png";
import uptoOffImg from "../../../../../assets/img/upto-off-img.png";
import mobileBannerImg from "../../../../../assets/img/mobile-main-banner-img.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setShopByCategory } from "../../../../../Redux/AllProducts/AllProductSlice";
class MainBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: window.matchMedia("(max-width: 600px)").matches,
    };
  }

  componentDidMount() {
    window
      .matchMedia("(max-width: 600px)")
      .addEventListener("change", (e) => this.setState({ matches: e.matches }));
  }

  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1.2,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1.2,
            slidesToScroll: 1,
          },
        },
      ],
    };
    const { matches } = this.state;
    return (
      <Box className="main-banner-container">
        <Container>
          <Slider {...settings}>
            <Box className="banner-contents">
              <Box className="desktop-banner">
                <Grid container spacing={2} alignItems={"center"}>
                  <Grid item sm={6}>
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
                      <Box
                        className="button"
                        onClick={() => this.props.setShopByCategory([])}
                      >
                        <Link to="/category">
                          Shop now <EastIcon />
                        </Link>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item sm={6}>
                    <Box className="images">
                      <Box className="upto-off-img">
                        <img
                          src={uptoOffImg}
                          alt="Mostly Organic Fresh & Healthy Organic Food"
                        />
                      </Box>
                      <Box className="image">
                        <img
                          src={bannerImg}
                          alt="Mostly Organic Fresh & Healthy Organic Food"
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box className="mobile-banner">
                <Link to="/category">
                  <img
                    src={mobileBannerImg}
                    alt="Mostly Organic Fresh & Healthy Organic Food"
                  />
                </Link>
              </Box>
            </Box>
            <Box className="banner-contents">
              <Box className="desktop-banner">
                <Grid container spacing={2} alignItems={"center"}>
                  <Grid item sm={6}>
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
                      <Box
                        className="button"
                        onClick={() => this.props.setShopByCategory([])}
                      >
                        <Link to="/category">
                          Shop now <EastIcon />
                        </Link>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item sm={6}>
                    <Box className="images">
                      <Box className="upto-off-img">
                        <img
                          src={uptoOffImg}
                          alt="Mostly Organic Fresh & Healthy Organic Food"
                        />
                      </Box>
                      <Box className="image">
                        <img
                          src={bannerImg}
                          alt="Mostly Organic Fresh & Healthy Organic Food"
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box className="mobile-banner">
                <Link to="/category">
                  <img
                    src={mobileBannerImg}
                    alt="Mostly Organic Fresh & Healthy Organic Food"
                  />
                </Link>
              </Box>
            </Box>
            <Box className="banner-contents">
              <Box className="desktop-banner">
                <Grid container spacing={2} alignItems={"center"}>
                  <Grid item sm={6}>
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
                      <Box
                        className="button"
                        onClick={() => this.props.setShopByCategory([])}
                      >
                        <Link to="/category">
                          Shop now <EastIcon />
                        </Link>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item sm={6}>
                    <Box className="images">
                      <Box className="upto-off-img">
                        <img
                          src={uptoOffImg}
                          alt="Mostly Organic Fresh & Healthy Organic Food"
                        />
                      </Box>
                      <Box className="image">
                        <img
                          src={bannerImg}
                          alt="Mostly Organic Fresh & Healthy Organic Food"
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box className="mobile-banner">
                <Link to="/category">
                  <img
                    src={mobileBannerImg}
                    alt="Mostly Organic Fresh & Healthy Organic Food"
                  />
                </Link>
              </Box>
            </Box>
          </Slider>
        </Container>
      </Box>
    );
  }
}

function mapStateToProps(state) {


  return {
  
  };
}

const mapDispatchToProps = {
  setShopByCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainBanner);
