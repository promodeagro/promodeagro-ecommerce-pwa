import React, { Component } from "react";
import { Box } from "@mui/material";
import MainBanner from "./components/mainBanner";
import FeaturedProducts from "./components/featuredProducts";
import Service from "./components/service";
import OffersYouMightLike from "./components/offersYouMightLike";
import TopSellingCategories from "./components/topSellingCategories";
import CustomersSays from "./components/customersSays";
import { fetchHome } from "../../../Redux/Home/HomeThunk";
import { fetchCartItems } from "../../../Redux/Cart/CartThunk";
import status from "../../../Redux/Constants";
import { connect } from "react-redux";
import { Loader, loginDetails } from "Views/Utills/helperFunctions";
import { getAllAddress } from "../../../Redux/Address/AddressThunk";
import { setSelectedAdd } from "../../../Redux/Address/AddressSlice";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cartList: []
    };
  }
  componentDidMount() {
    this.props.fetchHome();
    const items = loginDetails();
    if (items?.userId) {

      this.props.fetchCartItems({
        userId: items.userId,
      });
      this.props.getAllAddress({
        userId: items.userId,
      })
    }
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

    if (
      prevProps.cartItems.status !== this.props.cartItems.status &&
      this.props.cartItems.status === status.SUCCESS &&
      this.props.cartItems.data
    ) {
      this.setState({
        cartList: this.props.cartItems.data.items,
      });
      this.setState({
        dataId: "",
      });
    }

    if (
      prevProps.allAddress.status !== this.props.allAddress.status &&
      this.props.allAddress.status === status.SUCCESS &&
      this.props.allAddress.data
    ) {
      this.props.setSelectedAdd(this.props.allAddress.data.addresses[0]);

    }
  }

  render() {
    const { data, cartList } = this.state;
    return (
      <Box className="main-container">
        <MainBanner />
        {this.props.homeData.status === status.IN_PROGRESS ? (
          Loader.commonLoader()
        ) : (
          <FeaturedProducts data={data} cartList={cartList} />
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
  const { additems, cartItems, updateItems, deleteItems } = state.cartitem;
  const { allAddress, selectedAddressData } = state.alladdress;
  return { homeData, cartItems, allAddress, selectedAddressData };
}

const mapDispatchToProps = { fetchHome, fetchCartItems, setSelectedAdd, getAllAddress };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
