import React, { Component } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { setShopByCategory } from "../../Redux/AllProducts/AllProductSlice";
import { fetchCategories } from "../../Redux/AllProducts/AllProductthunk";
import { fetchPersonalDetails } from "../../Redux/Signin/SigninThunk";
import Logo from "../../assets/img/logo.png";
import cardIcon from "../../assets/img/card-icon.png";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import status from "../../Redux/Constants";
import { loginDetails } from "Views/Utills/helperFunctions";
import { getAllAddress } from "../../Redux/Address/AddressThunk";
import SearchResults from "./searchResults";
import _ from "lodash";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import { fetchDefaultAddress } from "../../Redux/Address/AddressThunk";
import { fetchCartItems } from "../../Redux/Cart/CartThunk";
import AuthModal from "components/ModalLogin/LoginModal";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartList: [],
      currentAddress: {},
      searchToggle: false,
      categories: [],
      currentName: "",
      currentPathName: "",
      pathId: null,
      profileName: "",
      authModalOpen: false,
    };

    this.profileModalRef = React.createRef();
  }

  componentDidMount() {
    let items = loginDetails();

    if (items?.userId) {
      this.props.fetchDefaultAddress(items?.userId);
    }
    if (loginDetails()?.userId) {
      this.props.fetchPersonalDetails({
        userId: loginDetails()?.userId,
      });
    }
    this.props.fetchCategories();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.profileName && !loginDetails()?.userId) {
      this.setState({
        profileName: "",
      });
    }

    let path = window.location.pathname;
    if (
      this.state.currentPathName != window.location.pathname &&
      !window.location.pathname.includes(this.state.pathId)
    ) {
      if (path.includes("updated-address") || path.includes("order-placed")) {
        const id = this.extractIdFromPath(path);
        this.setState({
          pathId: id,
        });
      } else if (this.state.pathId) {
        this.setState({
          pathId: "",
        });
      }
      this.setState({
        currentPathName: window.location.pathname,
      });
    } else if (
      this.state.currentPathName != window.location.pathname &&
      loginDetails()?.userId
    ) {
      this.setState({
        currentPathName: window.location.pathname,
      });
      this.props.fetchCartItems({
        userId: loginDetails()?.userId ? loginDetails()?.userId : "",
      });
    }

    if (
      prevProps.personalDetailsData.status !==
        this.props.personalDetailsData.status &&
      this.props.personalDetailsData.status === status.SUCCESS &&
      this.props.personalDetailsData?.data
    ) {
      if (this.props.personalDetailsData?.data?.statusCode == 200) {
        this.setState({
          profileName: this.props.personalDetailsData?.data?.user?.Name,
        });
      } else {
        this.setState({
          profileName: "",
        });
      }
    } else if (this.props.personalDetailsData.status === status.FAILURE) {
      this.setState({
        profileName: "",
      });
    }

    if (
      prevProps.defaultAddressData.status !==
        this.props.defaultAddressData.status &&
      this.props.defaultAddressData.status === status.SUCCESS &&
      this.props.defaultAddressData.data
    ) {
      if (this.props.defaultAddressData.data?.status == 404) {
        this.setState({
          currentAddress: {},
          currentName: "",
        });
      } else if (this.props.defaultAddressData.data?.addressId) {
        this.setState({
          currentAddress: this.props.defaultAddressData.data,
          currentName: this.props.defaultAddressData.data?.name,
        });
      }
    }

    if (
      prevProps.allCategories.status !== this.props.allCategories.status &&
      this.props.allCategories.status === status.SUCCESS &&
      this.props.allCategories.data
    ) {
      this.setState({
        categories: this.props.allCategories.data,
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
    }
  }

  extractIdFromPath = (path) => {
    const pathSegments = path.split("/");
    const id = pathSegments[pathSegments?.length - 1];
    return id;
  };

  searchToggle = () => {
    this.setState({
      searchToggle: !this.state.searchToggle,
    });
  };

  render() {
    const { cartList, currentAddress } = this.state;
    console.log(currentAddress);

    return (
      <Box className="header">
        <Container maxWidth={false}>
          <Grid container spacing={2} alignItems={"center"}>
            <Grid item xs={6} sm={4} md={4}>
              <Box width={"100%"} alignItems={"center"} display={"flex"}>
                <Box className="logo">
                  <Link to={"/"}>
                    <img src={Logo} alt="Promode Agro Farms" />
                  </Link>
                </Box>
                {currentAddress?.address && loginDetails()?.userId && (
                  <Box
                    className="deliver-box"
                    onClick={() =>
                      this.props.navigate("/my-profile/manage-addresses")
                    }
                  >
                    <strong>Deliver to</strong>
                    <span>
                      {currentAddress?.address} <KeyboardArrowDownIcon />
                    </span>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <Box className="search-box">
                <SearchResults cartItemsData={cartList} />
              </Box>
            </Grid>
            <Grid item xs={6} sm={2} md={2}>
              <Box
                width={"100%"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-end"}
              >
                {!loginDetails()?.userId ? (
                  <Box
                    className="login"
                    onClick={() => this.setState({ authModalOpen: true })}
                  >
                    {loginDetails()?.userId && currentAddress?.name
                      ? currentAddress?.name
                      : "Login"}
                  </Box>
                ) : (
                  <Box className="login">{currentAddress?.name}</Box>
                )}
                <Box className="card">
                  <Link to={"/mycart"}>
                    {this.props?.cartData?.length ? (
                      <p>{this.props.cartData.length}</p>
                    ) : (
                      <></>
                    )}
                    {this.state.cartList?.length ? (
                      <p>{this.state.cartList.length}</p>
                    ) : (
                      <></>
                    )}
                    <img src={cardIcon} alt="Shopping" /> <span>Cart</span>
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <AuthModal
          open={this.state.authModalOpen}
          handleDefaultAddress={() => {
            this.props.fetchCategories();
            this.props.fetchDefaultAddress(loginDetails()?.userId);
            this.props.fetchPersonalDetails({
              userId: loginDetails()?.userId,
            });
            this.props.navigate(0);
          }}
          handleClose={() => {
            this.setState({
              authModalOpen: false,
            });
          }}
        />
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { cartData } = state.home;
  const { cartItems } = state.cartitem;
  const { personalDetailsData } = state.login;
  const { shopCategoryData, productCategoryData, allCategories } =
    state.allproducts;
  const { allAddress, selectedAddressData, defaultAddressData } =
    state.alladdress;

  return {
    cartData,
    cartItems,
    allAddress,
    selectedAddressData,
    shopCategoryData,
    productCategoryData,
    allCategories,
    defaultAddressData,
    personalDetailsData,
  };
}

const mapDispatchToProps = {
  getAllAddress,
  setShopByCategory,
  fetchCategories,
  fetchDefaultAddress,
  fetchPersonalDetails,
  fetchCartItems,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(Header));
