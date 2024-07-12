import React, { Component } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { setShopByCategory } from "../../Redux/AllProducts/AllProductSlice";
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
import { allProducts } from "../../Redux/AllProducts/AllProductthunk";
import SearchResults from "./searchResults";

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
    this.props.allProducts();
  }

  componentDidUpdate(prevProps, prevState) {
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
      prevProps.allProductsData.status !== this.props.allProductsData.status &&
      this.props.allProductsData.status === status.SUCCESS &&
      this.props.allProductsData.data
    ) {
      this.setState({
        productsData: this.props.allProductsData.data,
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

  renderCategories = () => (
    <Box className="categories-box">
      <Box className="categories">
        <h2>Vegetables</h2>
        <ul>
          {this.props.productCategoryData.length &&
            this.props.productCategoryData[1]?.length &&
            this.props.productCategoryData[1]?.map((item) => {
              return (
                <li
                  onClick={() =>
                    this.handleFruitsandVeg([
                      "VEGETABLES",
                      `${item.subCategory}`,
                    ])
                  }
                >
                  <Link to={"/category"}>{item.subCategory}</Link>
                </li>
              );
            })}
        </ul>
        <ul></ul>
      </Box>
      <Box className="sub-categories">
        <h3>Fruits</h3>
        <ul>
          {this.props.productCategoryData.length &&
            this.props.productCategoryData[0]?.length &&
            this.props.productCategoryData[0]?.map((item) => {
              return (
                <li
                  onClick={() =>
                    this.handleFruitsandVeg(["FRUITS", `${item.subCategory}`])
                  }
                >
                  <Link to={"/category"}>{item.subCategory}</Link>
                </li>
              );
            })}
        </ul>
      </Box>
    </Box>
  );

  renderBreadcrumb = () => (
    <Box className="breadcrumb">
      <ul>
        <li>
          <Link to="/">
            <HomeOutlinedIcon /> Home
          </Link>
        </li>
        {this.props.shopCategoryData.length ? (
          <>
            <li>/</li>
            <li
              onClick={() => {
                this.props.setShopByCategory([this.props.shopCategoryData[0]]);
              }}
            >
              <Link to="/category">{this.props.shopCategoryData[0]}</Link>
            </li>
            <li>/</li>
            <li className="active">
              <Link to="/category">{this.props.shopCategoryData[1]}</Link>
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>
    </Box>
  );

  render() {
    const { categoriesToggle, matches, searchToggle, productsData, cartList } =
      this.state;
    const { allAddress } = this.props;
    const address = allAddress ? allAddress.address : "";
    let login = loginDetails();

    const path = window.location.pathname;

    // console.log(path);

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
                order={["/", "/signin", "/signup"].includes(path) ? 0 : 1}
              >
                <Box
                  className="categories menu"
                  justifyContent={
                    ["/", "/signin", "/signup"].includes(path) ? "" : "flex-end"
                  }
                >
                  <ul>
                    <li>
                      <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                      <Link to={"#"}>About Us</Link>
                    </li>
                    <li>
                      <Link to={"#"}>Contact Us</Link>
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
                  {["/", "/signin", "/signup"].includes(path) ? (
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
                        data={productsData ? productsData : []}
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
              data={productsData ? productsData : []}
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
  const { shopCategoryData, productCategoryData, allProductsData } =
    state.allproducts;
  const { allAddress, selectedAddressData } = state.alladdress;
  return {
    cartData,
    cartItems,
    allAddress,
    selectedAddressData,
    shopCategoryData,
    productCategoryData,
    allProductsData,
  };
}

const mapDispatchToProps = {
  getAllAddress,
  setShopByCategory,
  allProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
