import React, { Component } from "react";
import { Box, Container, Skeleton, Typography } from "@mui/material";
import MainBanner from "./components/mainBanner";
import ShopByCategories from "./components/shopByCategories";
import Service from "./components/service";
import TopSellingCategories from "./components/topSellingCategories";
import CustomersSays from "./components/customersSays";
import { fetchHome } from "../../../Redux/Home/HomeThunk";
import { fetchCartItems } from "../../../Redux/Cart/CartThunk";

import {
  fetchTopSellingProducts,
  fetchToSellingCategories,
  fetchAllOffers,
  fetchCategories,
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
import category from "../category";
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
      categories: [],
    };
  }
  componentDidMount() {
    const items = loginDetails();
    this.setState({ topSellingApiLoader: true });

    this.props.fetchCategories();
    this.props.fetchToSellingCategories();
    this.props.fetchAllOffers();

    if (items?.userId) {
      this.props.fetchPersonalDetails({ userId: items.userId });
      this.props.fetchHome(items.userId);
      this.props.fetchCartItems({ userId: items.userId });

      console.log("Fetching default address for the user...");
      this.props
        .fetchDefaultAddress(items.userId)
        .then((response) => {
          console.log("Response from fetchDefaultAddress:", response);
          if (response?.payload?.address) {
            console.log(
              "Default address fetched successfully:",
              response.payload
            );
            localStorage.setItem(
              "address",
              response.payload.addressId.replace(/"/g, "")
            );
            console.log("Default address saved to localStorage.");
          } else {
            console.error(
              "Failed to fetch default address. Response:",
              response
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching default address:", error);
        });
    } else {
      console.log("No user ID found. Fetching home data...");
      this.props.fetchHome();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      allCategories,
      personalDetailsData,
      allOffersData,
      topSellingCategoriesData,
      homeData,
      cartItems,
      allAddress,
      topSellingProductsData,
    } = this.props;

    // Batch state updates to prevent multiple re-renders
    const stateUpdates = {};

    if (
      prevProps.allCategories.status !== allCategories.status &&
      allCategories.status === status.SUCCESS
    ) {
      if (allCategories.data.statusCode === 200) {
        stateUpdates.categories = allCategories.data.data;
      } else {
        ErrorMessages.error(allCategories?.data?.message);
      }
    }

    if (
      prevProps.personalDetailsData.status !== personalDetailsData.status &&
      personalDetailsData.status === status.SUCCESS &&
      personalDetailsData?.data
    ) {
      if (personalDetailsData.data.statusCode === 200) {
        const user = personalDetailsData.data.user;
        if (user?.Name !== this.state.name) stateUpdates.name = user?.Name;
        if (user?.email !== this.state.email) stateUpdates.email = user?.email;
        if (user?.MobileNumber !== this.state.mobileNumber)
          stateUpdates.mobileNumber = user?.MobileNumber;
      } else {
        ErrorMessages.error(personalDetailsData.data.message);
        localStorage.removeItem("login");
      }
    }

    if (
      prevProps.allOffersData.status !== allOffersData.status &&
      allOffersData.status === status.SUCCESS
    ) {
      if (allOffersData.data.statusCode === 200) {
        stateUpdates.allOffersList = allOffersData?.data?.data;
      } else {
        ErrorMessages.error(allOffersData?.data?.message);
      }
    }

    if (
      prevProps.topSellingCategoriesData.status !==
        topSellingCategoriesData.status &&
      topSellingCategoriesData.status === status.SUCCESS
    ) {
      if (topSellingCategoriesData?.data.statusCode === 200) {
        const topSellingSubcategories =
          topSellingCategoriesData?.data?.data?.topSellingSubcategories;
        stateUpdates.topSellCategoriesList = topSellingSubcategories;

        if (topSellingSubcategories?.length > 0) {
          const subcategory =
            topSellingSubcategories[0] === "ALL"
              ? ""
              : topSellingSubcategories[0];
          this.props.fetchTopSellingProducts({
            userId: loginDetails()?.userId,
            subcategory,
          });
        }
      } else {
        ErrorMessages.error(topSellingCategoriesData?.data.message);
      }
    }

    if (
      prevProps.homeData.status !== homeData.status &&
      homeData.status === status.SUCCESS
    ) {
      if (homeData.data.statusCode === 200) {
        stateUpdates.data = homeData?.data?.data?.products;
        stateUpdates.loaderCount = 1;
      } else {
        stateUpdates.data = [];
        stateUpdates.loaderCount = 1;
        ErrorMessages.error(homeData?.data?.message);
      }
    } else if (homeData.status === status.FAILURE) {
      stateUpdates.data = [];
      stateUpdates.loaderCount = 1;
    }

    if (
      prevProps.cartItems.status !== cartItems.status &&
      cartItems.status === status.SUCCESS &&
      cartItems.data
    ) {
      stateUpdates.cartList = cartItems.data.items;
      stateUpdates.dataId = "";
    }

    if (
      prevProps.allAddress.status !== allAddress.status &&
      allAddress.status === status.SUCCESS &&
      allAddress.data
    ) {
      this.props.setSelectedAdd(allAddress.data.addresses[0]);
    }

    if (
      prevProps.topSellingProductsData.status !==
        topSellingProductsData.status &&
      topSellingProductsData.status === status.SUCCESS
    ) {
      if (topSellingProductsData.data.statusCode === 200) {
        stateUpdates.topSellingProductsList =
          topSellingProductsData.data?.data?.topSellingProducts;
        stateUpdates.topSellingApiLoader = false;
      } else {
        ErrorMessages.error(topSellingProductsData?.data?.message);
        stateUpdates.topSellingApiLoader = false;
      }
    }

    // Only update state if there are actual changes
    if (Object.keys(stateUpdates).length > 0) {
      this.setState(stateUpdates);
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
          <>
            <Box minHeight={"100vh"} className="main-banner-container">
              <Container>
                <Skeleton
                  animation="wave"
                  sx={{ borderRadius: "12px" }}
                  variant="rectangular"
                  height={200}
                  width="100%"
                />

                <Box paddingTop={"30px"}>
                  {/* Section Title */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Typography variant="h6">
                      <Skeleton width={200} animation="wave" />
                    </Typography>
                    <Skeleton width={60} animation="wave" />
                  </Box>

                  {/* Category Skeletons */}
                  <Box display="flex" gap={2} flexWrap="wrap">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <Box key={index} textAlign="center">
                        <Skeleton
                          variant="rectangular"
                          animation="wave"
                          height={100}
                          width={120}
                          sx={{ borderRadius: "12px", marginBottom: "8px" }}
                        />
                        <Skeleton width={80} height={20} animation="wave" />
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Box paddingTop={"20px"}>
                  {/* Section Header */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Typography variant="h6">
                      <Skeleton width={150} animation="wave" />
                    </Typography>
                    <Skeleton width={60} animation="wave" />
                  </Box>

                  {/* Product Skeletons */}
                  <Box display="flex" gap={2} overflow="auto">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Box
                        key={index}
                        width={"20%"}
                        borderRadius="8px"
                        padding="16px"
                        boxShadow="0px 1px 3px rgba(0,0,0,0.1)"
                        bgcolor="#fff"
                      >
                        {/* Discount Tag */}
                        <Skeleton
                          variant="rectangular"
                          width={60}
                          height={20}
                          sx={{ borderRadius: "8px", marginBottom: "8px" }}
                          animation="wave"
                        />

                        {/* Product Image */}
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={100}
                          sx={{ borderRadius: "8px", marginBottom: "8px" }}
                          animation="wave"
                        />

                        {/* Product Title */}
                        <Skeleton
                          width="70%"
                          height={20}
                          animation="wave"
                          sx={{ marginBottom: "8px" }}
                        />

                        {/* Dropdown Skeleton */}
                        <Skeleton
                          width="80%"
                          height={30}
                          animation="wave"
                          sx={{ marginBottom: "8px" }}
                        />

                        {/* Price */}
                        <Skeleton
                          width="50%"
                          height={20}
                          animation="wave"
                          sx={{ marginBottom: "8px" }}
                        />
                        <Skeleton
                          width="30%"
                          height={15}
                          animation="wave"
                          sx={{ marginBottom: "16px" }}
                        />

                        {/* Add Button */}
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={40}
                          sx={{ borderRadius: "8px" }}
                          animation="wave"
                        />
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Container>
            </Box>
          </>
        ) : (
          <>
            <MainBanner allOffersList={allOffersList} />
            <ShopByCategories categories={this.state.categories} />
            <TopSellingCategories
              topSellingApiLoader={this.state.topSellingApiLoader}
              topSellingProductsList={topSellingProductsList}
              fetchTopSellings={this.topSellingApiFromChild}
              topSellCategoriesList={topSellCategoriesList}
              apiCalls={this.apiCalls}
            />
            <Service />
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
  const {
    topSellingProductsData,
    topSellingCategoriesData,
    allOffersData,
    allCategories,
  } = state.allproducts;
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
    allCategories,
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
  fetchCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
