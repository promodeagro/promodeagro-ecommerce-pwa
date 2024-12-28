import React, { Component } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
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
    this.setState({
      topSellingApiLoader: true,
    });
    this.props.fetchCategories();
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
      prevProps.allCategories.status !== this.props.allCategories.status &&
      this.props.allCategories.status === status.SUCCESS
    ) {
      if (this.props.allCategories.data.statusCode === 200) {
        this.setState({
          categories: this.props.allCategories.data.data,
        });
      } else {
        ErrorMessages.error(this.props?.allCategories?.data?.message);
      }
    }
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
      this.props.allOffersData.status === status.SUCCESS
    ) {
      if (this.props.allOffersData.data.statusCode === 200) {
        this.setState({
          allOffersList: this.props.allOffersData?.data?.data,
        });
      } else {
        ErrorMessages.error(this.props?.allOffersData?.data?.message);
      }
    }

    if (
      prevProps.topSellingCategoriesData.status !==
        this.props.topSellingCategoriesData.status &&
      this.props.topSellingCategoriesData.status === status.SUCCESS
    ) {
      if (this.props.topSellingCategoriesData?.data.statusCode === 200) {
        this.setState({
          topSellCategoriesList:
            this.props.topSellingCategoriesData?.data?.data
              ?.topSellingSubcategories,
        });

        if (
          this.props.topSellingCategoriesData?.data?.data
            ?.topSellingSubcategories?.length > 0
        ) {
          this.props.fetchTopSellingProducts({
            userId: loginDetails()?.userId,
            subcategory:
              this.props.topSellingCategoriesData?.data?.data
                ?.topSellingSubcategories[0] == "ALL"
                ? ""
                : this.props.topSellingCategoriesData?.data?.data
                    ?.topSellingSubcategories[0],
          });
        }
      } else {
        ErrorMessages.error(this.props.topSellingCategoriesData?.data.message);
      }
    }

    if (
      prevProps.homeData.status !== this.props.homeData.status &&
      this.props.homeData.status === status.SUCCESS
    ) {
      if (this.props.homeData.data.statusCode === 200) {
        this.setState({
          data: this.props?.homeData?.data?.data?.products,
          loaderCount: 1,
        });
      } else {
        this.setState({
          data: [],
          loaderCount: 1,
        });
        ErrorMessages.error(this.props?.homeData?.data?.message);
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
      this.props.topSellingProductsData.status === status.SUCCESS
    ) {
      if (this.props.topSellingProductsData.data.statusCode === 200) {
        this.setState({
          topSellingProductsList:
            this.props.topSellingProductsData.data?.data?.topSellingProducts,
          topSellingApiLoader: false,
        });
      } else {
        ErrorMessages.error(this.props?.topSellingProductsData?.data?.message);
        this.setState({
          topSellingApiLoader: false,
        });
      }
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
            <Box minHeight={'100vh'}  className="main-banner-container">
              <Container>

<Skeleton   animation="wave"   sx={{ borderRadius: "12px" }}  variant="rectangular" height={200} width="100%" />

<Box paddingTop={'20px'} >
{/* Section Title */}
<Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
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

<Box paddingTop={'20px'} >
{/* Section Header */}
<Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
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
   width={'20%'} 
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
    <Skeleton width="70%" height={20} animation="wave" sx={{ marginBottom: "8px" }} />

    {/* Dropdown Skeleton */}
    <Skeleton width="80%" height={30} animation="wave" sx={{ marginBottom: "8px" }} />

    {/* Price */}
    <Skeleton width="50%" height={20} animation="wave" sx={{ marginBottom: "8px" }} />
    <Skeleton width="30%" height={15} animation="wave" sx={{ marginBottom: "16px" }} />

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
