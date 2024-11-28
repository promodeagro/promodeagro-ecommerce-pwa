import React, { Component } from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import deliveryTruck from "../../../assets/img/delivery-truck.png";
import customerSupport from "../../../assets/img/customer-support.png";
import lockSync from "../../../assets/img/lock-sync.png";
import securityCheck from "../../../assets/img/security-check.png";
import ceoImg from "../../../assets/img/ceo-img.png";
import signatureImg from "../../../assets/img/signature-img.png";
import groceryImg from "../../../assets/img/grocery-img.png";
import freshImg from "../../../assets/img/fresh-img.png";
import dairyImg from "../../../assets/img/dairy-img.png";
import communityImg from "../../../assets/img/community-img.png";

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { } = this.state;
    return (
      <Box className="main-container">
        <Box className="welcome-promode-banner">
          <Container>
            <Box className="contents">
              <h2>
                Welcome to&nbsp;<span> Promode Agro Farms !</span>
              </h2>
              <p>
              Promode Agro Farm,Bio Dynamic Farming at best ensuring
<br /> 1. Organic Equivalent at Normal Price!"
<br /> 2. Missing your state? your Bengali Food @doorstep. <br /> 
Nestled in the heart of Yadgirigutta, our farm is a testament to nature's bounty and the hard work of our dedicated team.
              </p>
              <Button className="common-btn story-btn">Know Our Story</Button>
            </Box>
          </Container>
        </Box>
        <Box className="our-story-container">
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={3} md={3} sm={6}>
                <Box className="heading">
                  <span>Our Story</span>
                  <h2>We are building a better future</h2>
                </Box>
              </Grid>
              <Grid item xs={12} lg={9} md={9} sm={12}>
                <Box className="contents">
                  <p>
                    Promode Agro Farms was founded in 2021 by group of visionaries with a deep love for the land and a commitment to sustainable agriculture.We started this farming for our own needs for two reasons:
                <br /> 1. We knew health benefits of Organic Foods but it was much costly to afford.
                   <br /> 2. We missed our Bengali Food in Hyderabad so wanted to frow here <br /> 
                    What began as a small family venture has grown into a thriving farm that embraces modern Bio Dynamic farminng techniques while staying true to traditional values. Over the years, we have expanded our operations and enhanced our practices to ensure that we deliver fresh, healthy, and environmentally-friendly products to our customers.
                  </p>

                  {/* <Box className="ceo-details">
                    <Box className="image">
                      <img src={ceoImg} alt="" />
                    </Box>
                    <Box className="name">
                      <strong>Tina Bhattacharya</strong>
                      <span>CEO</span>
                    </Box>
                    <Box className="signature">
                      <img src={signatureImg} alt="" />
                    </Box>
                  </Box> */}


                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box className="service-container">
          <Container>
            <Box className="services">
              <Grid container spacing={2}>
                <Grid item xs={12} lg={3} md={3} sm={6}>
                  <Box className="service-box">
                    <Box className="icon">
                      <img src={deliveryTruck} alt="" />
                    </Box>
                    <Box className="info">
                      <Box className="name">Free Shipping</Box>
                      <Box className="text">Delivery at your door step</Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={6}>
                  <Box className="service-box">
                    <Box className="icon">
                      <img src={customerSupport} alt="" />
                    </Box>
                    <Box className="info">
                      <Box className="name">24/7 Service</Box>
                      <Box className="text">Reach us when needed</Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={6}>
                  <Box className="service-box">
                    <Box className="icon">
                      <img src={lockSync} alt="" />
                    </Box>
                    <Box className="info">
                      <Box className="name">Secure Payment</Box>
                      <Box className="text">We ensure Your money is safe</Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={6}>
                  <Box className="service-box">
                    <Box className="icon">
                      <img src={securityCheck} alt="" />
                    </Box>
                    <Box className="info">
                      <Box className="name">100% Assurance</Box>
                      <Box className="text">We ensure Your money is safe</Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
        <Box className="specialties-container">
          <Container>
            <Box className="heading">Our Specialties:</Box>
            <Box className="specialties-boxes">
              <Box className="specialties-box">
                <Box className="image">
                  <img src={groceryImg} alt="" />
                </Box>
                <Box className="name">
                  <h4>Grocery</h4>
                  <span>Products</span>
                </Box>
                <p>
                  Seeing rather her you not esteem men settle genius excuse.
                  Deal say over means age from. Comparison new melancholy son
                  devonshire to the dispatched.
                </p>
              </Box>
              <Box className="specialties-box">
                <Box className="image">
                  <img src={freshImg} alt="" />
                </Box>
                <Box className="name">
                  <h4>Fresh</h4>
                  <span>Vegetables</span>
                </Box>
                <p>
                  Perming rather her you not esteem men settle genius excuse.
                  Deal say over means age from. Comparison new melancholy son
                  devonshire to the dispatched.
                </p>
              </Box>
              <Box className="specialties-box">
                <Box className="image">
                  <img src={dairyImg} alt="" />
                </Box>
                <Box className="name">
                  <h4>Dairy</h4>
                  <span>Products</span>
                </Box>
                <p>
                  Seeing rather her you not esteem men settle genius excuse.
                  Deal say over means age from. Comparison new melancholy son
                  devonshire to the dispatched.
                </p>
              </Box>
            </Box>
          </Container>
        </Box>
        <Box className="our-mission-container">
          <Container>
            <Box className="contents">
              <h2>Our Mission</h2>
              <p>
                Our mission is to provide nutritious and delicious food to our
                community while promoting sustainable farming practices. We
                believe in nurturing the soil, conserving water, and protecting
                biodiversity. By doing so, we aim to create a healthier planet
                and a more resilient food system. We are creating jobs for non
                privileged farmers and giving them a superior lifestyle.
              </p>
            </Box>
          </Container>
        </Box>
        <Box className="sustainability-container">
          <Container>
            <Box className="contents">
              <Box className="organic-box">
                <strong>100</strong>
                <span>Organic</span>
              </Box>
              <h2>Sustainability</h2>
              <p>
                Sustainability is at the core of everything we do. We employ
                techniques such as crop rotation, organic fertilization, and
                integrated pest management to maintain soil health and reduce
                our environmental footprint. Our commitment to sustainability
                extends beyond our farming practices to include water
                conservation, renewable energy use, and waste reduction.
              </p>
            </Box>
          </Container>
        </Box>
        <Box className="our-community-container">
          <Container>
            <Grid container spacing={5}>
              <Grid item xs={12} lg={6} md={6} sm={12}>
                <Box className="image">
                  <img src={communityImg} alt="" />
                </Box>
              </Grid>
              <Grid item xs={12} lg={6} md={6} sm={12}>
                <Box className="community-contents">
                  <Box className="contents">
                    <span>Get to Know Us</span>
                    <h2>Our Community</h2>
                    <p>
                      We believe that a farm is more than just a place to grow
                      food; it’s a hub for community engagement and education.
                      We regularly host events, workshops, and tours to share
                      our knowledge and passion for farming with others. We are
                      proud to support our local community and work closely with
                      schools, nonprofits, and other organizations to promote
                      agricultural education and food security.
                    </p>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box className="joinus-container">
          <Container>
            <Box className="contents">
              <h2>Join us</h2>
              <p>
                Whether you’re a long-time customer or a first-time visitor, we
                invite you to join us on our journey towards a more sustainable
                and delicious future. Visit our farm, explore our offerings, and
                taste the difference that sustainable farming makes
              </p>
              <Button className="common-btn join-btn">Join Now</Button>
            </Box>
          </Container>
        </Box>
      </Box>
    );
  }
}

export default AboutUs;



