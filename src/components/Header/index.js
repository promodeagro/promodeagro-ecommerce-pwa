import React, { Component } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { setShopByCategory } from "../../Redux/AllProducts/AllProductSlice";
import { fetchCategories } from "../../Redux/AllProducts/AllProductthunk";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  HomeOutlined as HomeOutlinedIcon,
} from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import Logo from "../../assets/img/logo.png";
import supportIcon from "../../assets/img/support-icon.png";
import deliverIcon from "../../assets/img/deliver-icon.png";
import notificationIcon from "../../assets/img/notification-icon.png";
import cardIcon from "../../assets/img/card-icon.png";
import searchIcon from "../../assets/img/search-icon.png";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import status from "../../Redux/Constants";
import { loginDetails } from "Views/Utills/helperFunctions";
import { getAllAddress } from "../../Redux/Address/AddressThunk";
import SearchResults from "./searchResults";
import { allProductsFilters } from "../../Redux/ProductFilters/ProductFiltersThunk";
import _ from "lodash";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesToggle: false,
      matches: window.matchMedia("(max-width: 900px)").matches,
      cartList: [],
      currentAddress: "",
      searchToggle: false,
      productsData: [],
      productsFiltersData: [],
      categories: [],
    };
  }
  componentDidMount() {
    window
      .matchMedia("(max-width: 900px)")
      .addEventListener("change", (e) => this.setState({ matches: e.matches }));
    // let items = loginDetails();
    // if (items?.userId) {
    //   this.props.getAllAddress({
    //     userId: items.userId,
    //   });
    // }
    // let items = this.state.productsFiltersData;
    this.props.fetchCategories();
    this.props.allProductsFilters({});
  }

  componentDidUpdate(prevProps, prevState) {
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
      prevProps.allProductsFiltersData.status !==
        this.props.allProductsFiltersData.status &&
      this.props.allProductsFiltersData.status === status.SUCCESS &&
      this.props.allProductsFiltersData.data
    ) {
      this.setState({
        productsFiltersData: this.props.allProductsFiltersData.data,
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

    if (
      // this.props.selectedAddressData?.address &&
      this.state.currentAddress !== this.props.selectedAddressData?.address
    ) {
      this.setState({
        currentAddress: this.props.selectedAddressData?.address
          ? this.props.selectedAddressData.address
          : this.props.allAddress.data?.addresses[0]?.address,
      });
    }
  }

  handleClickCategoriesToggle = () => {
    this.setState({
      categoriesToggle: !this.state.categoriesToggle,
    });
  };

  handleFruitsandVeg = (data) => {
    this.props.setShopByCategory(data);
    this.setState({
      categoriesToggle: false,
    });
  };

  searchToggle = () => {
    this.setState({
      searchToggle: !this.state.searchToggle,
    });
  };

  renderCategories = () => {
    return (
      <Box className="categories-box">
        {this.state.categories.length ? (
          this.state.categories.map((item, index) => {
            if (index % 2 == 0) {
              return (
                <Box className="categories">
                  <h2>{item?.CategoryName}</h2>
                  <ul>
                    {item?.Subcategories?.length ? (
                      item.Subcategories?.map((subcat) => {
                        const { category } = item;

                        return (
                          <li
                            onClick={() => {
                              this.handleFruitsandVeg([
                                `${item?.CategoryName.toUpperCase()}`,
                                `${subcat}`,
                              ]);
                              this.props.navigate(
                                `/category/${item?.CategoryName.toUpperCase()}/${subcat}`
                              );
                            }}
                          >
                            <Link>{subcat}</Link>
                          </li>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </ul>
                  <ul></ul>
                </Box>
              );
            } else {
              return (
                <Box className="sub-categories">
                  <h3>{item?.CategoryName}</h3>
                  <ul>
                    {item?.Subcategories?.length ? (
                      item?.Subcategories.map((subcat) => {
                        return (
                          <li
                            onClick={() => {
                              this.handleFruitsandVeg([
                                `${item?.CategoryName}`,
                                `${subcat}`,
                              ]);
                              this.props.navigate(
                                `/category/${item?.CategoryName}/${subcat}`
                              );
                            }}
                          >
                            <Link>{subcat}</Link>
                          </li>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </ul>
                </Box>
              );
            }
          })
        ) : (
          <></>
        )}
      </Box>
    );
  };

  renderBreadcrumb = () => {
    let path = _.cloneDeep(window.location.pathname);
    let pathArr = path.split("/");

    let subCat = pathArr[0];
    return (
      <Box className="breadcrumb">
        <ul>
          <li>
            <Link to="/">
              <HomeOutlinedIcon /> Home
              {/* {pathArr?.[1]} */}
            </Link>
          </li>
          {pathArr.length ? (
            <>
              <li>/</li>
              <li
                onClick={() => {
                  this.props.navigate(
                    `/category/${pathArr?.[2]?.toUpperCase()}`
                  );
                }}
              >
                <Link>{pathArr?.[2]?.toUpperCase()}</Link>
              </li>
              <li>/</li>
              <li className="active">
                <Link to="/category">
                  {pathArr?.[3]?.replaceAll("%20", " ")}{" "}
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </Box>
    );
  };

  render() {
    const {
      categoriesToggle,
      matches,
      searchToggle,
      productsData,
      cartList,
      productsFiltersData,
    } = this.state;
    const { allAddress } = this.props;
    const address = allAddress ? allAddress.address : "";
    let login = loginDetails();

    const path = window.location.pathname;

    return (
      <div className="header">
        <Box className="header-top-container">
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4} md={4}>
                <Box className="logo">
                  <Link to={"/"}>
                    <img src={Logo} alt="" />
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={6} sm={8} md={8}>
                <Box className="header-top-right">
                  <Box className="support-box">
                    <img src={supportIcon} alt="" /> Customer Support 24/7
                  </Box>
                  {this.state.currentAddress ? (
                    <Box className="deliver-box">
                      Deliver to <img src={deliverIcon} alt="Deliver Icon" />
                      <span>{this.state.currentAddress}</span>
                    </Box>
                  ) : (
                    <></>
                  )}
                  {/* <Box className="language-list-box">
                    <FormControl fullWidth>
                      <NativeSelect
                        defaultValue={10}
                        inputProps={{
                          name: "age",
                          id: "uncontrolled-native",
                        }}
                      >
                        <option value={10}>English</option>
                        <option value={20}>Armenian</option>
                        <option value={30}>German</option>
                      </NativeSelect>
                    </FormControl>
                  </Box> */}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box className="header-categories-container">
          <Container>
            <Grid container spacing={2} alignItems={"center"}>
              <Grid
                item
                xs={12}
                md={4}
                order={
                  [
                    "/",
                    "/signin",
                    "/signup",
                    "/about-us",
                    "/contact-us",
                    "/terms-condition",
                  ].includes(path)
                    ? 0
                    : 1
                }
              >
                <Box
                  className="categories menu"
                  justifyContent={
                    [
                      "/",
                      "/signin",
                      "/signup",
                      "/about-us",
                      "/contact-us",
                      "/terms-condition",
                    ].includes(path)
                      ? ""
                      : "flex-end"
                  }
                >
                  <ul>
                    <li>
                      <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                      <Link to={"/about-us"}>About Us</Link>
                    </li>
                    <li>
                      <Link to={"/contact-us"}>Contact Us</Link>
                    </li>
                  </ul>
                </Box>
              </Grid>
              {!matches && (
                <Grid item xs={12} md={8}>
                  {["/my-order"].includes(path) ? (
                    <Box className="back-shopping">
                      <Link to="/">
                        <ChevronLeftOutlinedIcon /> Back to shopping
                      </Link>
                    </Box>
                  ) : (
                    <></>
                  )}
                  {[
                    "/",
                    "/signin",
                    "/signup",
                    "/about-us",
                    "/contact-us",
                    "/terms-condition",
                  ].includes(path) ? (
                    <Box className="categories" justifyContent={"flex-end"}>
                      <ul>
                        <li className="quick">
                          <Link to="/category">Quick Links</Link>
                        </li>
                        <li
                          onClick={() =>
                            this.handleFruitsandVeg(["FRUITS", "Exotic Fruits"])
                          }
                        >
                          <Link to="/category">Exotic Fruits</Link>
                        </li>
                        <li
                          onClick={() =>
                            this.handleFruitsandVeg([
                              "VEGETABLES",
                              "Leafy Vegetables",
                            ])
                          }
                        >
                          <Link to="/category">Leafy Vegetables</Link>
                        </li>
                        <li
                          onClick={() =>
                            this.handleFruitsandVeg(["FRUITS", "Fresh fruits"])
                          }
                        >
                          <Link to="/category">Fresh fruits</Link>
                        </li>
                        <li
                          onClick={() =>
                            this.handleFruitsandVeg([
                              "VEGETABLES",
                              "Cuts & Sprouts",
                            ])
                          }
                        >
                          <Link to="/category">Cuts & Sprouts</Link>
                        </li>
                      </ul>
                    </Box>
                  ) : (
                    ![
                      "/mycart",
                      "/mycart/address/order-details",
                      "/mycart/address",
                      "/mycart/address/add-new-address",
                      "/mycart/address/updated-address",
                      "/my-order",
                      "/mycart/address/order-placed/:id",
                    ].includes(path) && this.renderBreadcrumb()
                  )}
                </Grid>
              )}
            </Grid>
          </Container>
        </Box>
        {![
          "/mycart",
          "/mycart/address",
          "/mycart/address/order-details",
          "/mycart/address/add-new-address",
          "/mycart/address/updated-address",
          "/my-order",
          "/mycart/address/order-placed/:id",
          "/my-profile/personal-information",
          "/my-profile/manage-addresses",
          "/my-profile/change-password",
          "/my-profile/wish-list",
          "/my-profile/notification",
          "/my-profile/account-privacy",
          "/about-us",
          "/contact-us",
          "/terms-condition",
        ].includes(path) && (
          <Box className="header-bottom-container">
            <Container>
              <Grid container spacing={2} alignItems={"center"}>
                <Grid item xs={7} sm={8} md={3} lg={3}>
                  <Box className="categories-container">
                    <Box
                      className="categories-toggle"
                      onClick={this.handleClickCategoriesToggle}
                    >
                      Shop by Categories
                      <span>
                        {categoriesToggle ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </span>
                    </Box>
                    {categoriesToggle && this.renderCategories()}
                    {categoriesToggle && (
                      <Box
                        className="categories-bg"
                        onClick={this.handleClickCategoriesToggle}
                      ></Box>
                    )}
                  </Box>
                </Grid>
                {this.state.matches ? (
                  ""
                ) : (
                  <Grid item xs={2} md={6} lg={6}>
                    <Box className="search-box">
                      <SearchResults
                        data={productsFiltersData || []}
                        cartItemsData={cartList}
                      />
                    </Box>
                  </Grid>
                )}
                <Grid item xs={5} sm={4} md={3} lg={3}>
                  <Box
                    display={"inline-flex"}
                    justifyContent={"flex-end"}
                    width={"100%"}
                  >
                    {this.state.matches ? (
                      <Button
                        variant="outlined"
                        className="search-icon"
                        startIcon={<img src={searchIcon} alt="" />}
                        onClick={this.searchToggle}
                      ></Button>
                    ) : (
                      ""
                    )}
                    {login?.userId ? (
                      <>
                        <Button
                          variant="outlined"
                          className="notification"
                          startIcon={<img src={notificationIcon} alt="" />}
                        >
                          <p></p>
                        </Button>

                        <Link to={"/mycart"}>
                          <Button
                            variant="outlined"
                            className="card"
                            startIcon={<img src={cardIcon} alt="" />}
                          >
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
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <></>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        )}
        {this.state.matches ? (
          <Box className={searchToggle ? "search-box active" : "search-box"}>
            <SearchResults
              data={productsFiltersData || []}
              cartItemsData={cartList}
            />
          </Box>
        ) : (
          ""
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { cartData } = state.home;
  const { cartItems } = state.cartitem;
  const {
    shopCategoryData,
    productCategoryData,
    allProductsData,
    allCategories,
  } = state.allproducts;
  const { allAddress, selectedAddressData } = state.alladdress;
  const { allProductsFiltersData } = state.allproductsfilters;
  return {
    cartData,
    cartItems,
    allAddress,
    selectedAddressData,
    shopCategoryData,
    productCategoryData,
    allProductsData,
    allProductsFiltersData,
    allCategories,
  };
}

const mapDispatchToProps = {
  getAllAddress,
  setShopByCategory,
  allProductsFilters,
  fetchCategories,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(Header));
