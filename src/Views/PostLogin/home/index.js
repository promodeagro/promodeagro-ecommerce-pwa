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
import {
  getAllAddress,
  fetchDefaultAddress,
} from "../../../Redux/Address/AddressThunk";
import { setSelectedAdd } from "../../../Redux/Address/AddressSlice";
import {
  productCategories,
  setShopByCategory,
} from "../../../Redux/AllProducts/AllProductSlice";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cartList: [],
      loaderCount: 0,
    };
  }
  componentDidMount() {
    const items = loginDetails();

    if (items?.userId) {
      this.props.fetchHome(items?.userId);
      this.props.fetchCartItems({
        userId: items?.userId,
      });
      this.props.fetchDefaultAddress(items?.userId);

      // this.props.getAllAddress({
      //   userId: items?.userId,
      // })
    } else {
      this.props.fetchHome();
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
        loaderCount: 1,
      });

      let fruits = [];
      let vegetables = [];

      this.props.homeData?.data.forEach((product) => {
        if (product.category === "FRUITS") {
          fruits.push(product);
        } else if (product.category === "VEGETABLES") {
          vegetables.push(product);
        }
      });
      this.props.productCategories([fruits, vegetables]);
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

  fetchHome = () => {
    const items = loginDetails();

    if (items?.userId) {
      this.props.fetchHome(items?.userId);
      this.props.fetchCartItems({
        userId: items?.userId,
      });
    }
  };

  render() {
    const { data, cartList } = this.state;
    return (
      <Box className="main-container">
        {this.props.homeData.status === status.IN_PROGRESS &&
        this.state.loaderCount == 0 ? (
          Loader.commonLoader()
        ) : (
          <>
            <MainBanner />
            <FeaturedProducts
              data={data}
              cartList={cartList}
              fetchHome={this.fetchHome}
            />
            <Service />
            <OffersYouMightLike />
            <TopSellingCategories />
            <CustomersSays />
          </>
        )}
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

const mapDispatchToProps = {
  fetchHome,
  fetchCartItems,
  setSelectedAdd,
  getAllAddress,
  productCategories,
  setShopByCategory,
  fetchDefaultAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
