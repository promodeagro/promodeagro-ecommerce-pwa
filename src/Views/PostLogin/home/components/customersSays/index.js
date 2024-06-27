import React, { Component } from "react";
import { Box, Container, Grid } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import StarIcon from '@mui/icons-material/Star';
import personImg from "../../../../../assets/img/person.png";
import customerBg from "../../../../../assets/img/customer-bg.png";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};


class CustomersSays extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Box className="customers-says-container">
        <Container>
          <Box className="heading">What our Customers Says</Box>
          <Box className="customers-container">
            <Carousel
              id="carousel-1"
              responsive={responsive}
              containerClass="carousel-container"
            >
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
                    “Aenean et nisl eget eros consectetur vestibulum vel id erat. Aliquam feugiat massa dui. Sed sagittis diam sit amet ante sodales semper. ”
                  </Box>
                  <Box className="customer-bg"><img src={customerBg} alt="" /></Box>
                </Box>
                <Box className="customers-person">
                  <Box className="icon"><img src={personImg} alt="" /></Box>
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
                    “Aenean et nisl eget eros consectetur vestibulum vel id erat. Aliquam feugiat massa dui. Sed sagittis diam sit amet ante sodales semper. ”
                  </Box>
                  <Box className="customer-bg"><img src={customerBg} alt="" /></Box>
                </Box>
                <Box className="customers-person">
                  <Box className="icon"><img src={personImg} alt="" /></Box>
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
                    “Aenean et nisl eget eros consectetur vestibulum vel id erat. Aliquam feugiat massa dui. Sed sagittis diam sit amet ante sodales semper. ”
                  </Box>
                  <Box className="customer-bg"><img src={customerBg} alt="" /></Box>
                </Box>
                <Box className="customers-person">
                  <Box className="icon"><img src={personImg} alt="" /></Box>
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
                    “Aenean et nisl eget eros consectetur vestibulum vel id erat. Aliquam feugiat massa dui. Sed sagittis diam sit amet ante sodales semper. ”
                  </Box>
                  <Box className="customer-bg"><img src={customerBg} alt="" /></Box>
                </Box>
                <Box className="customers-person">
                  <Box className="icon"><img src={personImg} alt="" /></Box>
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
                    “Aenean et nisl eget eros consectetur vestibulum vel id erat. Aliquam feugiat massa dui. Sed sagittis diam sit amet ante sodales semper. ”
                  </Box>
                  <Box className="customer-bg"><img src={customerBg} alt="" /></Box>
                </Box>
                <Box className="customers-person">
                  <Box className="icon"><img src={personImg} alt="" /></Box>
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
                    “Aenean et nisl eget eros consectetur vestibulum vel id erat. Aliquam feugiat massa dui. Sed sagittis diam sit amet ante sodales semper. ”
                  </Box>
                  <Box className="customer-bg"><img src={customerBg} alt="" /></Box>
                </Box>
                <Box className="customers-person">
                  <Box className="icon"><img src={personImg} alt="" /></Box>
                  <Box className="info">
                    <Box className="name">Jenny Wilson</Box>
                    <Box className="customer">Customer</Box>
                  </Box>
                </Box>
              </Box>
            </Carousel>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default CustomersSays;
