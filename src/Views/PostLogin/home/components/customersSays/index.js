import React, { Component } from "react";
import { Box, Container } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import personImg from "../../../../../assets/img/person.png";
import customerBg from "../../../../../assets/img/customer-bg.png";
import Slider from "react-slick";

class CustomersSays extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
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
    return (
      <Box className="customers-says-container">
        <Container>
          <Box className="heading">What our Customers Says</Box>
          <Box className="customers-container">
            <Slider {...settings}>
              <Box className="customers-says">
                <Box className="customers-info">
                  <Box className="ratting">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon className="gray" />
                  </Box>
                  <Box className="name">On Time Delivery</Box>
                  <Box className="text">
                    “Aenean et nisl eget eros consectetur vestibulum vel id
                    erat. Aliquam feugiat massa dui. Sed sagittis diam sit amet
                    ante sodales semper. ”
                  </Box>
                  <Box className="customer-bg">
                    <img src={customerBg} alt="" />
                  </Box>
                </Box>
                <Box className="customers-person">
                  <Box className="icon">
                    <img src={personImg} alt="" />
                  </Box>
                  <Box className="info">
                    <Box className="name">Jenny Wilson</Box>
                    <Box className="customer">Customer</Box>
                  </Box>
                </Box>
              </Box>
              <Box className="customers-says">
                <Box className="customers-info">
                  <Box className="ratting">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon className="gray" />
                  </Box>
                  <Box className="name">On Time Delivery</Box>
                  <Box className="text">
                    “Aenean et nisl eget eros consectetur vestibulum vel id
                    erat. Aliquam feugiat massa dui. Sed sagittis diam sit amet
                    ante sodales semper. ”
                  </Box>
                  <Box className="customer-bg">
                    <img src={customerBg} alt="" />
                  </Box>
                </Box>
                <Box className="customers-person">
                  <Box className="icon">
                    <img src={personImg} alt="" />
                  </Box>
                  <Box className="info">
                    <Box className="name">Jenny Wilson</Box>
                    <Box className="customer">Customer</Box>
                  </Box>
                </Box>
              </Box>
              <Box className="customers-says">
                <Box className="customers-info">
                  <Box className="ratting">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon className="gray" />
                  </Box>
                  <Box className="name">On Time Delivery</Box>
                  <Box className="text">
                    “Aenean et nisl eget eros consectetur vestibulum vel id
                    erat. Aliquam feugiat massa dui. Sed sagittis diam sit amet
                    ante sodales semper. ”
                  </Box>
                  <Box className="customer-bg">
                    <img src={customerBg} alt="" />
                  </Box>
                </Box>
                <Box className="customers-person">
                  <Box className="icon">
                    <img src={personImg} alt="" />
                  </Box>
                  <Box className="info">
                    <Box className="name">Jenny Wilson</Box>
                    <Box className="customer">Customer</Box>
                  </Box>
                </Box>
              </Box>
              <Box className="customers-says">
                <Box className="customers-info">
                  <Box className="ratting">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon className="gray" />
                  </Box>
                  <Box className="name">On Time Delivery</Box>
                  <Box className="text">
                    “Aenean et nisl eget eros consectetur vestibulum vel id
                    erat. Aliquam feugiat massa dui. Sed sagittis diam sit amet
                    ante sodales semper. ”
                  </Box>
                  <Box className="customer-bg">
                    <img src={customerBg} alt="" />
                  </Box>
                </Box>
                <Box className="customers-person">
                  <Box className="icon">
                    <img src={personImg} alt="" />
                  </Box>
                  <Box className="info">
                    <Box className="name">Jenny Wilson</Box>
                    <Box className="customer">Customer</Box>
                  </Box>
                </Box>
              </Box>
              <Box className="customers-says">
                <Box className="customers-info">
                  <Box className="ratting">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon className="gray" />
                  </Box>
                  <Box className="name">On Time Delivery</Box>
                  <Box className="text">
                    “Aenean et nisl eget eros consectetur vestibulum vel id
                    erat. Aliquam feugiat massa dui. Sed sagittis diam sit amet
                    ante sodales semper. ”
                  </Box>
                  <Box className="customer-bg">
                    <img src={customerBg} alt="" />
                  </Box>
                </Box>
                <Box className="customers-person">
                  <Box className="icon">
                    <img src={personImg} alt="" />
                  </Box>
                  <Box className="info">
                    <Box className="name">Jenny Wilson</Box>
                    <Box className="customer">Customer</Box>
                  </Box>
                </Box>
              </Box>
              <Box className="customers-says">
                <Box className="customers-info">
                  <Box className="ratting">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon className="gray" />
                  </Box>
                  <Box className="name">On Time Delivery</Box>
                  <Box className="text">
                    “Aenean et nisl eget eros consectetur vestibulum vel id
                    erat. Aliquam feugiat massa dui. Sed sagittis diam sit amet
                    ante sodales semper. ”
                  </Box>
                  <Box className="customer-bg">
                    <img src={customerBg} alt="" />
                  </Box>
                </Box>
                <Box className="customers-person">
                  <Box className="icon">
                    <img src={personImg} alt="" />
                  </Box>
                  <Box className="info">
                    <Box className="name">Jenny Wilson</Box>
                    <Box className="customer">Customer</Box>
                  </Box>
                </Box>
              </Box>
            </Slider>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default CustomersSays;
