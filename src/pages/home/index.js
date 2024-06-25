import React, { Component } from "react";
import { Box } from "@mui/material";
import MainBanner from "./components/mainBanner";
import FeaturedProducts from "./components/featuredProducts";
import Service from "./components/service";
import OffersYouMightLike from "./components/offersYouMightLike";
import CustomersSays from "./components/customersSays";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }



  render() {
    return (
      <Box className="main-container">
        <MainBanner />
        <FeaturedProducts />
        <Service />
        <OffersYouMightLike />
        <CustomersSays />
      </Box>
    );
  }
}


export default Home;
