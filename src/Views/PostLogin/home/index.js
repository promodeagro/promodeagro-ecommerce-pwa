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
import {
  fetchTopSellingProducts,
  fetchToSellingCategories,
  fetchAllOffers,
} from "../../../Redux/AllProducts/AllProductthunk";
import status from "../../../Redux/Constants";
import { connect } from "react-redux";
import {
  ErrorMessages,
  Loader,
  loginDetails,
} from "Views/Utills/helperFunctions";
import {
  getAllAddress,
  fetchDefaultAddress,
} from "../../../Redux/Address/AddressThunk";
import { setSelectedAdd } from "../../../Redux/Address/AddressSlice";
import {
  productCategories,
  setShopByCategory,
} from "../../../Redux/AllProducts/AllProductSlice";
import { fetchPersonalDetails } from "../../../Redux/Signin/SigninThunk";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cartList: [],
      loaderCount: 0,
      topSellingProductsList: [],
      topSellCategoriesList: [],
      allOffersList: [],
    };
  }
  componentDidMount() {
    const items = loginDetails();
    this.setState({
      topSellingApiLoader: true,
    });
    this.props.fetchToSellingCategories();
    this.props.fetchAllOffers();
    if (items?.userId) {
      this.props.fetchPersonalDetails({
        userId: loginDetails()?.userId,
      });

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
      prevProps.personalDetailsData.status !==
        this.props.personalDetailsData.status &&
      this.props.personalDetailsData.status === status.SUCCESS &&
      this.props.personalDetailsData?.data
    ) {
      if (this.props.personalDetailsData?.data?.statusCode == 200) {
        this.setState({
          name: this.props.personalDetailsData?.data?.user?.Name,
          email: this.props.personalDetailsData?.data?.user?.email,
          mobileNumber:
            this.props.personalDetailsData?.data?.user?.MobileNumber,
        });
      } else if (this.props.personalDetailsData?.data?.statusCode == 404) {
        ErrorMessages.error(this.props.personalDetailsData?.data?.message);
        localStorage.removeItem("login");
      } else {
        ErrorMessages.error(this.props.personalDetailsData?.data?.message);
        localStorage.removeItem("login");
      }
    }
    if (
      prevProps.allOffersData.status !== this.props.allOffersData.status &&
      this.props.allOffersData.status === status.SUCCESS &&
      this.props.allOffersData?.data
    ) {
      this.setState({
        allOffersList: this.props.allOffersData?.data,
      });
    }

    if (
      prevProps.topSellingCategoriesData.status !==
        this.props.topSellingCategoriesData.status &&
      this.props.topSellingCategoriesData.status === status.SUCCESS &&
      this.props.topSellingCategoriesData?.data?.topSellingSubcategories
    ) {
      this.setState({
        topSellCategoriesList:
          this.props.topSellingCategoriesData?.data?.topSellingSubcategories,
      });
      if (
        this.props.topSellingCategoriesData?.data?.topSellingSubcategories
          ?.length > 0
      ) {
        this.props.fetchTopSellingProducts({
          userId: loginDetails()?.userId,
          subcategory:
            this.props.topSellingCategoriesData?.data
              ?.topSellingSubcategories[0] == "ALL"
              ? ""
              : this.props.topSellingCategoriesData?.data
                  ?.topSellingSubcategories[0],
        });
      }
    }

    if (
      prevProps.homeData.status !== this.props.homeData.status &&
      this.props.homeData.status === status.SUCCESS &&
      this.props.homeData?.data
    ) {
      if (
        this.props.homeData?.data?.response?.status == 500 ||
        this.props.homeData?.data?.response?.status == 401
      ) {
        this.setState({
          data: [],
          loaderCount: 1,
        });
      } else if (this.props?.homeData?.data?.products) {
        this.setState({
          data: this.props?.homeData?.data?.products,
          loaderCount: 1,
        });
      }
    } else if (this.props.homeData.status === status.FAILURE) {
      this.setState({
        data: [],
        loaderCount: 1,
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

    if (
      prevProps.topSellingProductsData.status !==
        this.props.topSellingProductsData.status &&
      this.props.topSellingProductsData.status === status.SUCCESS &&
      this.props.topSellingProductsData?.data?.topSellingProducts
    ) {
      this.setState({
        topSellingProductsList:
          this.props.topSellingProductsData.data?.topSellingProducts,
        topSellingApiLoader: false,
      });
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

  apiCalls = (subcategory) => {
    const items = loginDetails();
    this.props.fetchHome(items?.userId);
    this.props.fetchTopSellingProducts({
      userId: loginDetails()?.userId,
      subcategory: subcategory == "ALL" ? "" : subcategory,
    });
    if (items?.userId) {
      this.props.fetchCartItems({
        userId: items?.userId,
      });
    }
  };

  topSellingApiFromChild = (subcategory) => {
    this.setState({
      topSellingApiLoader: true,
    });

    this.props.fetchTopSellingProducts({
      userId: loginDetails()?.userId,
      subcategory: subcategory == "ALL" ? "" : subcategory,
    });
  };

  render() {
    const {
      data,
      cartList,
      topSellingProductsList,
      topSellCategoriesList,
      allOffersList,
    } = this.state;
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
            <OffersYouMightLike allOffersList={allOffersList} />

            <TopSellingCategories
              topSellingApiLoader={this.state.topSellingApiLoader}
              topSellingProductsList={topSellingProductsList}
              fetchTopSellings={this.topSellingApiFromChild}
              topSellCategoriesList={topSellCategoriesList}
              apiCalls={this.apiCalls}
            />
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
  const { topSellingProductsData, topSellingCategoriesData, allOffersData } =
    state.allproducts;
  const { personalDetailsData } = state.login;
  return {
    homeData,
    cartItems,
    allAddress,
    selectedAddressData,
    topSellingProductsData,
    topSellingCategoriesData,
    allOffersData,
    personalDetailsData,
  };
}

const mapDispatchToProps = {
  fetchHome,
  fetchCartItems,
  setSelectedAdd,
  getAllAddress,
  productCategories,
  setShopByCategory,
  fetchDefaultAddress,
  fetchTopSellingProducts,
  fetchToSellingCategories,
  fetchAllOffers,
  fetchPersonalDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
