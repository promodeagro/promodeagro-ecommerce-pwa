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
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import MyCart from "components/MyCart";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesToggle: false,
      cartList: [],
      currentAddress: {},
      searchToggle: false,
      categories: [],
      currentName: "",
      currentPathName: "",
      pathId: null,
      profileName: "",
      authModalOpen: false,
      matches: window.matchMedia("(max-width: 600px)").matches,
      myCartOpen:false
    };

    this.profileModalRef = React.createRef();
  }

  componentDidMount() {
    window
      .matchMedia("(max-width: 600px)")
      .addEventListener("change", (e) => this.setState({ matches: e.matches }));
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
      this.state.currentPathName !== window.location.pathname &&
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
      this.state.currentPathName !== window.location.pathname &&
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
        categories: this.props.allCategories.data.data,
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

  handleFruitsandVeg = (data) => {
    this.props.setShopByCategory(data);
    this.setState({
      categoriesToggle: false,
    });
  };

  renderCategories = () => {
    const { categories } = this.state;
    return (
      <ul>
        {categories?.length ? (
          categories?.map((item, index) => {
            let c = item?.CategoryName.replaceAll(" ", "%20");
            const isActive = window.location.pathname.split("/").includes(c);

            return (
              <li key={index}>
                <Link
                  to={`/category/${item?.CategoryName}/${item?.Subcategories[0]?.name}`}
                  className={isActive ? "active" : ""}
                >
                  {item?.CategoryName}
                </Link>
              </li>
            );
          })
        ) : (
          <></>
        )}
      </ul>
    );
  };

  render() {
    const { cartList, currentAddress, matches, currentPathName } = this.state;
    const { noOfcartItemsInLS } = this.props;

    return (
      <>
        <Box className="header">
          <Container maxWidth={false}>
            <Grid container spacing={2} alignItems={"center"}>
              {!matches && (
                <Grid item xs={0} sm={5} md={5} lg={4}>
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
              )}
              <Grid item xs={9} sm={4} md={4} lg={6}>
                <Box className="search-box">
                  <Box
                    onClick={() => this.props.navigate("/")}
                    className={`back-button ${
                      currentPathName === "/" ? "none" : ""
                    }`}
                  >
                    <ArrowBackIosNewOutlinedIcon />
                  </Box>
                  <SearchResults cartItemsData={cartList} />
                </Box>
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={2}>
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


                  <Box
                  
                  onClick={() =>
                    loginDetails()?.userId
                        ? this.setState({ myCartOpen: true }) // Show MyCart modal
                        : this.setState({ authModalOpen: true }) // Show Login modal
                }
        className="card">


                    <Link to={"/mycart"}>
                      {noOfcartItemsInLS ? (
                        <p>{noOfcartItemsInLS}</p>
                      ) : this.state.cartList?.length ? (
                        <p>{this.state.cartList.length}</p>
                      ) : (
                        <></>
                      )}
                      <img src={cardIcon} alt="Shopping" /> <span>Cart</span>
                    </Link>
                  </Box>
                  {matches && (

                    <Box
                      className="profile-icon"
                      onClick={() =>
                        loginDetails()?.userId
                          ? this.props.navigate("/my-profile/manage-addresses")
                          : this.setState({ authModalOpen: true })
                      }
                    >
                      
                      <AccountCircleOutlinedIcon />
                    </Box>


                  )}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        {matches && (
          <>
            {currentAddress?.address && loginDetails()?.userId && (
              <Box
                className="mobile-deliver-box"
                onClick={() =>
                  this.props.navigate("/my-profile/manage-addresses")
                }
              >
                {currentAddress?.address} <KeyboardArrowDownIcon />
              </Box>
            )}
          </>
        )}
        <Box
          className={`categories-container ${
            currentPathName.includes("category/") ? "category" : ""
          }`}
        >
          <Container>{this.renderCategories()}</Container>
        </Box>
        <MyCart
        open={this.state.myCartOpen}
        handleClose={() => {
          this.setState({
            myCartOpen: false,
          });
        }}
        />
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
      </>
    );
  }
}

function mapStateToProps(state) {
  const { cartData } = state.home;
  const { cartItems, noOfcartItemsInLS } = state.cartitem;
  const { personalDetailsData } = state.login;
  const { shopCategoryData, productCategoryData, allCategories } =
    state.allproducts;
  const { allAddress, selectedAddressData, defaultAddressData } =
    state.alladdress;
  return {
    cartData,
    noOfcartItemsInLS,
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
