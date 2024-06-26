import React, { Component } from "react";
import { Box } from "@mui/material";
import MainBanner from "./components/mainBanner";
import FeaturedProducts from "./components/featuredProducts";
import Service from "./components/service";
import OffersYouMightLike from "./components/offersYouMightLike";
import CustomersSays from "./components/customersSays";
import { fetchHome } from "../../Redux/Home/HomeThunk";
import status from "../../Redux/Constants"
import { connect } from "react-redux"
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    this.props.fetchHome()
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


function mapStateToProps(state) {
  const { } = state;
  return {};
}

const mapDispatchToProps = { fetchHome };

export default connect(mapStateToProps, mapDispatchToProps)(Home);

