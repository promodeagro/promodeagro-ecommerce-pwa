import React, { Component } from "react";
import { Box, Container } from "@mui/material";
import Slider from "react-slick";
import { connect } from "react-redux";
import { setShopByCategory } from "../../../../../Redux/AllProducts/AllProductSlice";
import noImage from "../../../../../assets/img/no-image.png";
import { Link } from "react-router-dom";

class MainBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
         {/* <Box sx={{
        marginBottom:"15px",
        borderRadius:'8px',
        background:"#e6f8e7",
        height:"40px",
         fontWeight:"600",
         fontStyle:"italic",
        color:"rgba(114, 114, 114, 0.8)",
        display:"flex" , alignItems:"center" , justifyContent:'center'
        ,
      }}>
<span style={{ display: "inline-block", whiteSpace: "nowrap", 
    // animation: "moveText 15s linear infinite"
    }}> Focused on Hyderabad – Serving You, Right Where You Are!</span>
      </Box> */}
        <Container>
       
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
