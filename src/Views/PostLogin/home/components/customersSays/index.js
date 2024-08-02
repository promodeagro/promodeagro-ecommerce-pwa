import React, { Component } from "react";
import { Box, Container, Tooltip, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import personImg from "../../../../../assets/img/person.png";
import customerBg from "../../../../../assets/img/customer-bg.png";
import saysReviewImg1 from "../../../../../assets/img/says-review-img1.png";
import saysReviewImg2 from "../../../../../assets/img/says-review-img2.png";
import saysReviewImg3 from "../../../../../assets/img/says-review-img3.png";

import Slider from "react-slick";

class CustomersSays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: window.matchMedia("(max-width: 900px)").matches,
      customersReviews: [
        {
          rating: 5,
          heading: "On Time Delivery",
          content:
            "The home delivery of fruits and vegetables along with other Kolkata specific products from Promode Agro has been a blessing for me, I rarely need to go out these days. Their products are fresh,very fair pricing and delivery is always on time. Keep up the good work !",
          image: saysReviewImg1,
          name: "Indrani Patro",
          customer: "PBEL City",
        },
        {
          rating: 5,
          heading: "On Time Delivery",
          content:
            "The vegetables and fruits are fresh and handpicked as well as reasonably priced, the variety usually includes from all regions, specially north Indian winter vegetables two delivery slots makes it easier to plan, just in case the morning slot is missed.",
          image: saysReviewImg2,
          name: "Indrani Patro",
          customer: "PBEL City",
        },
        {
          rating: 5,
          heading: "On Time Delivery",
          content:
            "Have been using Promote Agro' produces from the last 6 months. FIRST thing: The produces are of very high quality & tastes differently than that available in another shops. Secondly, the purpose of starting Promode Agro farm makes me to stay connected with them in order to help underprivileged youngsters. My take: With PROMODE AGRO, you ALWAYS GROW",
          image: saysReviewImg3,
          name: "Md Juber Khan",
          customer: "PBEL City, Hyderabad",
        },
      ],
    };
  }
  componentDidMount() {
    window
      .matchMedia("(max-width: 900px)")
      .addEventListener("change", (e) => this.setState({ matches: e.matches }));
  }

  render() {
    const { customersReviews } = this.state;
    var settings = {
      dots: false,
      arrows: this.state.matches
        ? true
        : customersReviews?.length > 3
        ? true
        : false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
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
    return (
      <Box className="customers-says-container">
        <Container>
          <Box className="heading">What our Customers Says</Box>
          <Box className="customers-container">
            <Slider {...settings}>
              {customersReviews.map((item) => {
                return (
                  <Box className="customers-says">
                    <Box className="customers-info">
                      <Box className="ratting">
                        <Rating
                          defaultValue={item.rating}
                          readOnly
                          className="rating"
                        />
                      </Box>
                      <Box className="name">{item.heading}</Box>
                      <Tooltip arrow title={item.content}>
                        <Box className="text">{item.content}</Box>
                      </Tooltip>
                      <Box className="customer-bg">
                        <img src={customerBg} alt="" />
                      </Box>
                    </Box>
                    <Box className="customers-person">
                      <Box className="icon">
                        <img src={item.image} alt="" />
                      </Box>
                      <Box className="info">
                        <Box className="name">{item.name}</Box>
                        <Box className="customer">{item.customer}</Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Slider>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default CustomersSays;
