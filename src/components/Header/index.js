import React, { Component } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { setShopByCategory } from "../../Redux/AllProducts/AllProductSlice";
import { fetchCategories } from "../../Redux/AllProducts/AllProductthunk";
import { fetchPersonalDetails } from "../../Redux/Signin/SigninThunk";
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
import shoppingCartIcon from "../../assets/img/shopping-cart.png";
import searchIcon from "../../assets/img/search-icon.png";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import status from "../../Redux/Constants";
import { loginDetails } from "Views/Utills/helperFunctions";
import { getAllAddress } from "../../Redux/Address/AddressThunk";
import SearchResults from "./searchResults";
import _ from "lodash";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import AccountBoxTwoToneIcon from "@mui/icons-material/AccountBoxTwoTone";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { fetchDefaultAddress } from "../../Redux/Address/AddressThunk";
import { fetchCartItems } from "../../Redux/Cart/CartThunk";
import LoginModal from "components/ModalLogin/LoginModal";
import AuthModal from "components/ModalLogin/LoginModal";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesToggle: false,
      matches: window.matchMedia("(max-width: 600px)").matches,
      cartList: [],
      currentAddress: {},
      searchToggle: false,
      productsData: [],
      categories: [],
      profileModal: false,
      currentName: "",
      currentPathName: "",
      pathId: null,
      profileName: "",
      authModalOpen: false,
    };

    this.profileModalRef = React.createRef();
  }

  handleAuthModalOpen = () => {
    this.setState({ isModalOpen: true });
  };
  handleAuthModalClose = () => {
    this.setState({ isModalOpen: false });
  };
  componentDidMount() {
    // document.addEventListener("mousedown", this.handleClickOutside);
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

    // if (this.state.currentName !== this.props.selectedAddressData?.name) {
    //   this.setState({
    //     currentName: this.props.selectedAddressData?.name,
    //   });
    // }
  }

  // componentWillUnmount() {
  //   document.removeEventListener("mousedown", this.handleClickOutside);
  // }

  extractIdFromPath = (path) => {
    // Example: Assuming URL path format is '/mycart/address/updated-address/:id'
    // Splitting the path by '/' and getting the last segment as ID
    const pathSegments = path.split("/");
    const id = pathSegments[pathSegments?.length - 1];
    return id;
  };

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

  // handleClickOutside = (event) => {
  //   if (
  //     this.profileModalRef.current &&
  //     !this.profileModalRef.current.contains(event.target)
  //   ) {
  //     this.setState({
  //       profileModal: false,
  //     });
  //   }
  // };

  renderCategories = () => {
    return (
      <Box className="categories-box">
        <ul>
          {this.state.categories?.length ? (
            this.state.categories?.map((item, index) => {
              return (
                <li style={{}}>
                  <Link>
                    {item?.CategoryName}
                    {item?.Subcategories.length > 0 ? <ChevronRightOutlinedIcon /> : ""}
                  </Link>
                  {item?.Subcategories?.length ? (
                    <ul>
                      {item.Subcategories?.map((subcat) => {
                        return (
                          <li
                          style={{paddingLeft:10}}
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
                            <Link>{subcat} <ChevronRightOutlinedIcon /> </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <></>
                  )}
                </li>
              );
            })
          ) : (
            <></>
          )}
        </ul>
      </Box>
    );
  };

  
  renderBengaliSpecials = () => {
    return (
      <Box className="drop_downs">
      <ul>
              <li>
              <Link to={'/category/BENGALI%20SPECIAL/Bengali%20Vegetables'}>
              Bengali Vegetables
                <ChevronRightOutlinedIcon />
                </Link>  
              </li>
              <li>
                <Link to={'/category/BENGALI%20SPECIAL/Bengali%20Groceries'}>
                Bengali Groceries
                <ChevronRightOutlinedIcon />
                </Link>  
              </li>
              <li>
                <Link to={'/category/BENGALI%20SPECIAL/Bengali%20Home%20Needs'}>
                Bengali Home Needs
                <ChevronRightOutlinedIcon />
                </Link>  
              </li>
         
      </ul>
    </Box>
    )
  }

  renderFruitsandVegetables = () => {
    return (
      <Box className="drop_downs">
      <ul>
              <li>
              <Link to={'/category/FRUITS/Exotic%20Fruits'}>
              Exotic Fruits
                <ChevronRightOutlinedIcon />
                </Link>  
              </li>
              
               <li>
              <Link to={'/category/FRESH%20FRUITS/Daily%20Fruits'}>
Daily Fruits
                <ChevronRightOutlinedIcon />
                </Link>  
              </li>
              <li>
                <Link to={'/category/VEGETABLES/Leafy%20Vegetables'}>
Leafy Vegetables
                <ChevronRightOutlinedIcon />
                </Link>  
              </li>
              <li>
                <Link to={'/category/FRESH%20VEGETABLES/Daily%20Vegetables'}>
                Daily Vegetables
                <ChevronRightOutlinedIcon />
                </Link>  
              </li>
         
      </ul>
    </Box>
    )
  }

  
renderMeatAndFishAndEgg = ()=> {
  return (
    <Box className="drop_downs">
    <ul>
            <li>
            <Link to={'/category/EGGS%20MEAT%20&%20FISH/Mutton'}>    
Mutton
              <ChevronRightOutlinedIcon />
              </Link>  
            </li>
            <li>
              <Link to={'/category/EGGS%20MEAT%20&%20FISH/Fish'}>
            Fish
              <ChevronRightOutlinedIcon />
              </Link>  
            </li>
           
            <li>
              <Link to={'/category/EGGS%20MEAT%20&%20FISH/Eggs'}>
Eggs
              <ChevronRightOutlinedIcon />
              </Link>  
            </li>
            <li>
            <Link to={'/category/EGGS%20MEAT%20&%20FISH/Chicken'}>
            Chicken
              <ChevronRightOutlinedIcon />
              </Link>  
            </li>
       
    </ul>
  </Box>
  )
}

  renderBreadcrumb = () => {
    let path = _.cloneDeep(window.location.pathname);
    let pathArr = path.split("/");
    return (
      <>
        {!window.location.pathname.includes("updated-address") &&
        !window.location.pathname.includes("order-placed") ? (
          <Box className="breadcrumb">
            <ul>
              <li>
                <Link to="/">
                  <HomeOutlinedIcon /> Home
                </Link>
              </li>
              {pathArr.length ? (
                <>
                  <li>/</li>
                  <li
                    onClick={() => {
                      if (
                        !window.location.pathname.includes("/category/offers")
                      ) {
                        this.props.navigate(
                          `/category/${pathArr?.[2]?.toUpperCase()}`
                        );
                      }
                    }}
                  >
                    <Link>{pathArr?.[2]?.toUpperCase().replaceAll("%20" , " ")}</Link>
                  </li>
                  {pathArr?.[3] ? <li>/</li> : <></>}
                  {!window.location.pathname.includes("/category/offers") ? (
                    <li className="active">
                      <Link>{pathArr?.[3]?.replaceAll("%20", " ")} </Link>
                    </li>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
            </ul>
          </Box>
        ) : (
          <></>
        )}
      </>
    );
  };

  handleProfileModal = () => {
    this.setState({
      profileModal: !this.state.profileModal,
    });
  };

  render() {
    const {
      categoriesToggle,
      matches,
      searchToggle,
      productsData,
      cartList,
      profileModal,
      currentAddress,
      currentName,
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
                    <img src={Logo} alt="Promode Agro Farms" />
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={6} sm={8} md={8}>
                <Box className="header-top-right">
                  <Box
                    className="support-box"
                    onClick={() => {
                      this.props.navigate("/contact-us");
                    }}
                  >
                    <img src={supportIcon} alt="Customer Support 24/7" />{" "}
                    Customer Support 24/7
                  </Box>
                  {currentAddress?.name && loginDetails()?.userId && (
                    <Box
                      className="deliver-box"
                      onClick={() =>
                        this.props.navigate("/my-profile/manage-addresses")
                      }
                    >
                      Deliver to <img src={deliverIcon} alt="Deliver" />
                      <span>{currentAddress?.name}</span>
                    </Box>
                  )}
                  {!loginDetails()?.userId ? (
                    <Box
                      className="deliver-box"
                      // onClick={() => this.props.navigate("/signin")}
                      onClick={() => this.setState({ authModalOpen: true })}
                    >
                      Login
                      <span>
                        {loginDetails()?.userId && currentAddress?.name ? (
                          currentAddress?.name
                        ) : (
                          <></>
                        )}
                      </span>
                    </Box>
                  ) : (
                    <></>
                  )}
                  {matches && (
                    <Link to={"/mycart"} style={{ display: "inline-flex" }}>
                      <Button
                        variant="outlined"
                        className="card"
                        startIcon={
                          <img src={shoppingCartIcon} alt="Shopping" />
                        }
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
                  )}
                  {this.state.profileName ? (
                    <Box className="profile-box">
                      <Box
                        className="profile"
                        onClick={() => this.handleProfileModal()}
                      >
                        <AccountBoxTwoToneIcon />
                        {!matches && (
                          <>
                            <span>{this.state.profileName}</span>
                            <KeyboardArrowDownOutlinedIcon />
                          </>
                        )}
                      </Box>
                      {profileModal && (
                        <>
                          <Box
                            className="profile-modal"
                            ref={this.profileModalRef}
                          >
                            <ul>
                              <li onClick={() => this.handleProfileModal()}>
                                <Link to="/my-profile/personal-information">
                                  <PermIdentityOutlinedIcon /> My Profile
                                </Link>
                              </li>
                              <li onClick={() => this.handleProfileModal()}>
                                <Link to="/my-order">
                                  <PermIdentityOutlinedIcon /> Orders
                                </Link>
                              </li>
                              <li onClick={() => this.handleProfileModal()}>
                                <Link to="/my-profile/wish-list">
                                  <PermIdentityOutlinedIcon /> Wish list
                                </Link>
                              </li>
                              <li onClick={() => this.handleProfileModal()}>
                                <Link to="/contact-us">
                                  <PermIdentityOutlinedIcon /> Contact Us
                                </Link>
                              </li>
                              <li onClick={() => this.handleProfileModal()}>
                                <Link to="/my-profile/notification">
                                  <PermIdentityOutlinedIcon /> Notification
                                </Link>
                              </li>
                              <li
                                onClick={() => {
                                  this.handleProfileModal();
                                  localStorage.removeItem("login");
                                  this.props.navigate("/");
                                }}
                              >
                                <Link>
                                  <PermIdentityOutlinedIcon /> Logout
                                </Link>
                              </li>
                            </ul>
                          </Box>
                          <Box
                            className="profile-modal-bg"
                            onClick={() => this.handleProfileModal()}
                          ></Box>
                        </>
                      )}
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
        {currentAddress?.address && loginDetails()?.userId && (
          <Container>
            <Box
              className="mobile-deliver-box"
              onClick={() =>
                this.props.navigate("/my-profile/manage-addresses")
              }
            >
              <span>{currentAddress?.address}</span>
              <KeyboardArrowDownOutlinedIcon />
            </Box>
          </Container>
        )}
        <Box className="header-categories-container">
          <Container>
            <Grid container spacing={2} alignItems={"center"}>
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                lg={4}
                order={
                  [
                    "/",
                    "/signin",
                    "/signup",
                    "/about-us",
                    "/contact-us",
                    "/terms-condition",
                    "/privacy-policy",
                    "/return-refund",
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
                      "/privacy-policy",
                      "/return-refund",
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
                <Grid item xs={12} sm={8} md={8} lg={8}>
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
                    "/privacy-policy",
                    "/return-refund",
                  ].includes(path) ? (
                    <Box className="categories" justifyContent={"flex-end"}>
                      <ul>
                        <li className="quick">
                          <Link to="/category">Quick Links</Link>
                        </li>
                        <li className="drop_down_parent">
                        <Link >Bengali Special</Link>
                        <this.renderBengaliSpecials/>
                        </li>
                       

 <li className="drop_down_parent">
  <Link>
 Fruits And Vegetables
  </Link>
  <this.renderFruitsandVegetables/>
 </li>

 <li className="drop_down_parent last_child">
  <Link>
  Meat Fish & Egg
  </Link>
  <this.renderMeatAndFishAndEgg/>
 </li>

 

{/*                         
                        <li
                          onClick={() => {
                            this.handleFruitsandVeg([
                              "FRUITS",
                              "Exotic Fruits",
                            ]);
                            this.props.navigate(
                              `/category/FRUITS/Exotic Fruits`
                            );
                          }}
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
                          <Link to="/category/VEGETABLES/Leafy Vegetables">
                            Leafy Vegetables
                          </Link>
                        </li>
                        <li
                          onClick={() =>
                            this.handleFruitsandVeg(["FRUITS", "Fresh fruits"])
                          }
                        >
                          <Link to="/category/FRUITS/Fresh fruits">
                            Fresh fruits
                          </Link>
                        </li>
                        <li
                          onClick={() =>
                            this.handleFruitsandVeg([
                              "VEGETABLES",
                              "Cuts & Sprouts",
                            ])
                          }
                        >
                          <Link to="/category/VEGETABLES/Cuts & Sprouts">
                            Cuts & Sprouts
                          </Link>
                        </li> */}
                      </ul>
                    </Box>
                  ) : (
                    ![
                      "/mycart",
                      "/mycart/address/order-details",
                      "/mycart/address",
                      "/mycart/address/add-new-address",
                      "/my-profile/manage-addresses/add-new-address",
                      `/mycart/address/updated-address/${this.state?.pathId}`,
                      "/my-order",
                      `/mycart/address/order-placed/${this.state?.pathId}`,
                      "/my-profile/change-password",
                      "/my-profile/manage-addresses",
                      "/my-profile/personal-information",
                      "/my-profile/wish-list",
                      "/my-profile/notification",
                      "/my-profile/account-privacy",
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
          "/my-profile/manage-addresses/add-new-address",
          `/mycart/address/updated-address/${this.state?.pathId}`,
          "/my-order",
          "/myCart/address/order-details",
          `/mycart/address/order-placed/${this.state?.pathId}`,
          "/my-profile/personal-information",
          "/my-profile/manage-addresses",
          "/my-profile/change-password",
          "/my-profile/wish-list",
          "/my-profile/notification",
          "/my-profile/account-privacy",
          "/about-us",
          "/contact-us",
          "/terms-condition",
          "/privacy-policy",
          "/return-refund",
          `/mycart/address/updated-address/${this.state?.pathId}`,
        ].includes(path) && (
          <Box className="header-bottom-container">
            <Container>
              <Grid container spacing={2} alignItems={"center"}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  order={{ sm: 1, xs: 0 }}
                >
                  <Box className="search-box">
                    <SearchResults cartItemsData={cartList} />
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={3}
                  lg={4}
                  order={{ sm: 0, xs: 1 }}
                >
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
                <Grid
                  item
                  xs={5}
                  sm={2}
                  md={3}
                  lg={2}
                  order={{ sm: 2, xs: 2 }}
                  className="notification-and-card"
                >
                  <Box
                    display={"inline-flex"}
                    justifyContent={"flex-end"}
                    width={"100%"}
                  >
                    {login?.userId ? (
                      <>
                        <Button
                          variant="outlined"
                          className="notification"
                          startIcon={
                            <img src={notificationIcon} alt="Notification" />
                          }
                          onClick={() =>
                            this.props.navigate("/my-profile/notification")
                          }
                        >
                          <p></p>
                        </Button>

                        <Link to={"/mycart"}>
                          <Button
                            variant="outlined"
                            className="card"
                            startIcon={<img src={cardIcon} alt="Shopping" />}
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
      </div>
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
