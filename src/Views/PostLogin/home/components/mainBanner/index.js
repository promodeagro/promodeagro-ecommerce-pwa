import React, { Component } from "react";
import { Box, Container } from "@mui/material";
import Slider from "react-slick";
import { connect } from "react-redux";
import { setShopByCategory } from "../../../../../Redux/AllProducts/AllProductSlice";
import noImage from "../../../../../assets/img/no-image.png";
import { Link } from "react-router-dom";
import { loginDetails } from "../../../../Utills/helperFunctions";


class MainBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taglineIndex: 0, // Index to track current tagline (0, 1, or 2)
    };
  }

  componentDidMount() {
    // Cycle through taglines every 4 seconds
    this.taglineInterval = setInterval(() => {
      this.setState((prevState) => ({
        taglineIndex: (prevState.taglineIndex + 1) % 3, // Cycle between 0, 1, 2
      }));
    }, 4000);
  }

  componentWillUnmount() {
    // Cleanup interval
    clearInterval(this.taglineInterval);
  }

  renderTagline() {
    const { taglineIndex } = this.state;

    switch (taglineIndex) {
      case 0:
        return (
          <p>
            Now delivering exclusively in{" "}
            <span className="taglie_highlight">Hyderabad</span>!
          </p>
        );
      case 1:
        return (
<p>
  Free delivery in Hyderabad on orders over <span className="taglie_highlight">₹300</span>!
</p>
        );
      case 2:
        return (
          <p>
            Free delivery on orders above <span className="taglie_highlight">₹100</span> in PBEL City!
          </p>
        );
      default:
        return null; // Fallback, should never hit
    }
  }
  render() {
    var settings = {
      dots: false,
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
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    const { allOffersList } = this.props;
    const isLoggedIn = loginDetails()?.token;
    const isSmallScreen = window.innerWidth <= 600;

    const productStyle = isSmallScreen
      ? { marginTop: isLoggedIn ? "110px" : "65px" }
      : {};
  
    return (
      <Box className="main-banner-container" style={productStyle}>
        <Container>
          <Box className="tagline-container">
            <div className="hyderabad_tag_line">{this.renderTagline()}</div>
          </Box>
          <Slider {...settings}>
            {allOffersList?.length > 0 ? (
              allOffersList?.map((item) => {
                return (
                  <Box className="banner-image">
                    <Link
                      to={`/category/${item?.category}/${item?.subCategory}`}
                    >
                      <img
                        src={item?.imageUrl ? item?.imageUrl : noImage}
                        alt="no image"
                      />
                    </Link>
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
