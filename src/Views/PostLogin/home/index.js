import React, { Component } from "react";
import { Box } from "@mui/material";
import MainBanner from "./components/mainBanner";
import FeaturedProducts from "./components/featuredProducts";
import Service from "./components/service";
import OffersYouMightLike from "./components/offersYouMightLike";
import TopSellingCategories from "./components/topSellingCategories";
import CustomersSays from "./components/customersSays";
import { fetchHome } from "../../../Redux/Home/HomeThunk";
import status from "../../../Redux/Constants";
import { connect } from "react-redux";
import { Loader } from "Views/Utills/helperFunctions";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.props.fetchHome();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.homeData.status !== this.props.homeData.status &&
      this.props.homeData.status === status.SUCCESS &&
      this.props.homeData?.data
    ) {
      this.setState({
        data: this.props.homeData?.data,
      });
    }
  }

  render() {
    const { data } = this.state;
    return (
      <Box className="main-container">
        <MainBanner />
        {this.props.homeData.status === status.IN_PROGRESS ? (
          Loader.commonLoader()
        ) : (
          <FeaturedProducts data={data} />
        )}

        <Service />
        <OffersYouMightLike />
        <TopSellingCategories />
        <CustomersSays />
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { homeData } = state.home;
  return { homeData };
}

const mapDispatchToProps = { fetchHome };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
