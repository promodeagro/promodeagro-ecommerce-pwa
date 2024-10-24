import React, { Component } from "react";
import { Box, Container, Grid } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import bannerImg1 from "../../../../../assets/img/banner-img1.png";
import bannerImg2 from "../../../../../assets/img/banner-img2.png";
import bannerImg3 from "../../../../../assets/img/banner-img3.png";
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
    this.state = {};
  }

  render() {
    var settings = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      fade: true,
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
    return (
      <Box className="main-banner-container">
        <Container>
          <Slider {...settings}>
            <Box className="banner-contents">
              <Box className="desktop-banner mostly-organic-banner">
                <Box className="contents">
                  <Box width={"100%"}>
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
                </Box>
                <Box className="image">
                  <img
                    src={bannerImg1}
                    alt="Mostly Organic Fresh & Healthy Organic Food"
                  />
                </Box>
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
              <Box className="desktop-banner best-deal-banner">
                <Box className="contents">
                  <Box width={"100%"}>
                    <Box className="mostly-organic">
                      <span>Best Deal</span>
                    </Box>
                    <Box className="heading">
                      <span>Special Products</span>
                      Deal of the Month
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
                </Box>
                <Box className="image">
                  <img
                    src={bannerImg2}
                    alt="Special Products Deal of the Month"
                  />
                </Box>
              </Box>
              <Box className="mobile-banner">
                <Link to="/category">
                  <img
                    src={mobileBannerImg}
                    alt="Special Products Deal of the Month"
                  />
                </Link>
              </Box>
            </Box>
            <Box className="banner-contents">
              <Box className="desktop-banner direct-farmer-banner">
                <Box className="left-top-shaph"></Box>
                <Box className="right-top-shaph"></Box>
                <Box className="right-bottom-shaph"><span></span></Box>
                <Box className="contents">
                  <Box width={"100%"}>
                    <Box className="mostly-organic">
                      <span>Best Deal</span>
                    </Box>
                    <Box className="heading">
                      Direct From Farmer to Your Home
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
                </Box>
                <Box className="image">
                  <img src={bannerImg3} alt="Direct From Farmer to Your Home" />
                </Box>
              </Box>
              <Box className="mobile-banner">
                <Link to="/category">
                  <img
                    src={mobileBannerImg}
                    alt="Direct From Farmer to Your Home"
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
  return {};
}

const mapDispatchToProps = {
  setShopByCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainBanner);
