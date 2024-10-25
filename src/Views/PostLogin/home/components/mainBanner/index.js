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

    const { allOffersList } = this.props;
    return (
      <Box className="main-banner-container">
        <Container>
          <Slider {...settings}>
            {allOffersList?.length > 0 ? (
              allOffersList?.map((item) => {
                return (
                  <Box className="banner-contents">
                    <img src={item?.imageUrl} alt="no image" />
                  </Box>
                );
              })
            ) : (
              <></>
            )}
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
