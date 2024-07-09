import React, { Component } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  HomeOutlined as HomeOutlinedIcon,
} from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
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
import { getAllAddress } from "../../Redux/Address/AddressThunk"
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CategoriesToggle: false,
      matches: window.matchMedia("(max-width: 900px)").matches,
      cartList: [],
      currentAddress: ""
    };
  }
  componentDidMount() {

    window
      .matchMedia("(max-width: 900px)")
      .addEventListener("change", (e) => this.setState({ matches: e.matches }));
    let items = loginDetails();
    if (items?.userId) {
      this.props.getAllAddress({
        userId: items.userId,
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {


    if (
      prevProps.allAddress.status !== this.props.allAddress.status &&
      this.props.allAddress.status === status.SUCCESS &&
      this.props.allAddress.data
    ) {

      this.setState({
        currentAddress: this.props.allAddress.data.addresses[0].address
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
    if (this.props.selectedAddressData?.address && this.state.currentAddress !== this.props.selectedAddressData?.address) {
      this.setState({
        currentAddress: this.props.selectedAddressData.address
      })
    }
  }
  handleClickCategoriesToggle = () => {
    this.setState({
      CategoriesToggle: !this.state.CategoriesToggle,
    });
  };

  render() {
    const { CategoriesToggle, matches } = this.state;
    const { allAddress } = this.props;
    const address = allAddress ? allAddress.address : "";
    let login = loginDetails();

    const path = window.location.pathname;
    const renderCategories = () => (
      <Box className="categories-box">
        <Box className="categories">
          <h2>Vegetables</h2>
          <ul>
            <li>
              <a href="#">Cut & peeled Veggies</a>
            </li>
            <li>
              <a href="#">Leafy Vegetables</a>
            </li>
            <li>
              <a href="#">Fresh Vegetables</a>
            </li>
            <li>
              <a href="#">Herbs and Seasoning</a>
            </li>
          </ul>
        </Box>
        <Box className="sub-categories">
          <h3>Fruits</h3>
          <ul>
            <li>
              <a href="#">Exotic Fruits</a>
            </li>
            <li>
              <a href="#">Seasonal Fruits</a>
            </li>
            <li>
              <a href="#">Juices & Mixes</a>
            </li>
          </ul>
        </Box>
      </Box>
    );

    const renderBreadcrumb = () => (
      <Box className="breadcrumb">
        <ul>
          <li>
            <Link to="/">
              <HomeOutlinedIcon /> Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link to="/category">Vegetables</Link>
          </li>
          <li>/</li>
          <li className="active">
            <Link to="/category">Leafy Vegetables</Link>
          </li>
        </ul>
      </Box>
    );

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

                  {this.state.currentAddress ?
                    <Box className="deliver-box">
                      Deliver to <img src={deliverIcon} alt="Deliver Icon" />
                      <span>{this.state.currentAddress}</span>
                    </Box>
                    : <></>}



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
                  {["/", "/signin", "/signup"].includes(path) ? (
                    <Box className="categories" justifyContent={"flex-end"}>
                      <ul>
                        <li>
                          <Link to="/category">Quick Links</Link>
                        </li>
                        <li>
                          <Link to="/category">Exotic Fruits</Link>
                        </li>
                        <li>
                          <Link to="/category">Leafy Vegetables</Link>
                        </li>
                        <li>
                          <Link to="/category">Fresh fruits</Link>
                        </li>
                        <li>
                          <Link to="/category">Cuts & Sprouts</Link>
                        </li>
                      </ul>
                    </Box>
                  ) : (
                    ![
                      "/myCart",
                      "/myCart/address",
                      "/myCart/address/add-new-address",
                      "/myCart/address/updated-address",
                      "/myCart/address/order-placed",
                      "/my-order",
                    ].includes(path) && renderBreadcrumb()
                  )}
                </Grid>
              )}
            </Grid>
          </Container>
        </Box>
        {![
          "/myCart/address",
          "/myCart/address/add-new-address",
          "/myCart/address/updated-address",
          "/myCart/address/order-placed",
          "/my-order",
        ].includes(path) && (
            <Box className="header-bottom-container">
              <Container>
                <Grid container spacing={2} alignItems={"center"}>
                  <Grid item xs={9} md={3} lg={3}>
                    <Box className="categories-container">
                      <Box
                        className="categories-toggle"
                        onClick={this.handleClickCategoriesToggle}
                      >
                        Shop by Categories
                        <span>
                          {CategoriesToggle ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </span>
                      </Box>
                      {CategoriesToggle && renderCategories()}
                      {CategoriesToggle && (
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
                    <Grid item xs={5} md={6} lg={6}>
                      <Box className="search-box">
                        <TextField
                          id="outlined-search"
                          className="search"
                          variant="outlined"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <img src={searchIcon} alt="" />
                              </InputAdornment>
                            ),
                          }}
                          placeholder="Search Your favorite veggies...  "
                        />
                      </Box>
                    </Grid>
                  )}

                  {login?.userId ? (
                    <Grid item xs={3} md={3} lg={3}>
                      <Box
                        display={"inline-flex"}
                        justifyContent={"flex-end"}
                        width={"100%"}
                      >
                        <Button
                          variant="outlined"
                          className="notification"
                          startIcon={<img src={notificationIcon} alt="" />}
                        >
                          <p></p>
                        </Button>
                        <Link to={"/myCart"}>
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
                      </Box>
                    </Grid>
                  ) : (
                    <></>
                  )}
                </Grid>
              </Container>
            </Box>
          )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { cartData } = state.home;
  const { cartItems } = state.cartitem;

  const { allAddress, selectedAddressData } = state.alladdress;
  return { cartData, cartItems, allAddress, selectedAddressData };
}

const mapDispatchToProps = {
  getAllAddress
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
