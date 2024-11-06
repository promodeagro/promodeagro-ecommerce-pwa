import React, { Component } from "react";
import { Box, TextField, Container, Grid, Button } from "@mui/material";
import footerLogo from "../../assets/img/footer-logo.png";
import methodVisa from "../../assets/img/MethodVisa.png";
import methodMastercard from "../../assets/img/MethodMastercard.png";
import methodDiscover from "../../assets/img/MethodDiscover.png";
import paymentSecure from "../../assets/img/PaymentSecure.png";
import madeInImg from "../../assets/img/made-in.png";
import { Link } from "react-router-dom";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import InstagramIcon from "@mui/icons-material/Instagram";
import { loginDetails } from "Views/Utills/helperFunctions";
import { fetchCategories } from "../../Redux/AllProducts/AllProductthunk";
import { fetchPersonalDetails } from "../../Redux/Signin/SigninThunk";
import { fetchDefaultAddress } from "../../Redux/Address/AddressThunk";
import status from "../../Redux/Constants";
import { connect } from "react-redux";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      pathId: null,
      currentPathName: "",
      profileName: "",
      matches: window.matchMedia("(max-width: 600px)").matches,
    };
  }

  componentDidMount() {
    window
      .matchMedia("(max-width: 600px)")
      .addEventListener("change", (e) => this.setState({ matches: e.matches }));
    this.props.fetchCategories();
    let items = loginDetails();

    if (items?.userId) {
      this.props.fetchDefaultAddress(items?.userId);
    }
    if (loginDetails()?.userId) {
      this.props.fetchPersonalDetails({
        userId: loginDetails()?.userId,
      });
    }
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
      prevProps.allCategories.status !== this.props.allCategories.status &&
      this.props.allCategories.status === status.SUCCESS &&
      this.props.allCategories.data
    ) {
      this.setState({
        categories: this.props.allCategories.data.data,
      });
    }
  }

  scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  renderCategories = () => {
    const { categories } = this.state;
    return (
      <ul>
        {categories.length ? (
          categories.map((item, index) => {
            let c = item.CategoryName.replaceAll(" ", "%20");
            const isActive = window.location.pathname.split("/").includes(c);

            return (
              <li key={index}>
                <Link
                  to={`/category/${item.CategoryName}/${item.Subcategories[0]?.name}`}
                  className={isActive ? "active" : ""}
                  onClick={this.scrollToTop}
                >
                  {item.CategoryName}
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
    const login = loginDetails();
    const { currentPathName, matches } = this.state;
    return (
      <>
        {currentPathName.includes("category/") && matches ? (
          ""
        ) : (
          <>
            {matches ? (
              <Box className="made-container">
                <h2>Made In India Product</h2>
                <span>
                  <img src={madeInImg} alt="" />
                </span>
                <p>
                  From <br />
                  Promode agrp farms
                </p>
              </Box>
            ) : (
              <Box className="newsletter-container">
                <Container>
                  <Grid container spacing={2} alignItems={"center"}>
                    <Grid item xs={12} sm={6} md={6} lg={5}>
                      <Box className="contents">
                        <h4>Subscribe to our Newsletter</h4>
                        <p>
                          Pellentesque eu nibh eget mauris congue mattis nec
                          tellus. Phasellus imperdiet elit eu magna.
                        </p>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={5}>
                      <Box className="newsletter-box">
                        <TextField
                          id="outlined-search"
                          className="newsletter"
                          variant="outlined"
                          placeholder="Your email address"
                        />
                        <Button variant="contained" className="common-btn">
                          Subscribe
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={2}>
                      <Box className="socials-links">
                        <a href="#">
                          <FacebookOutlinedIcon />
                        </a>
                        <a href="#">
                          <TwitterIcon />
                        </a>
                        <a href="#">
                          <PinterestIcon />
                        </a>
                        <a href="#">
                          <InstagramIcon />
                        </a>
                      </Box>
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            )}
            <Box className="footer">
              <Container>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Box className="footer-about-text">
                      <span>
                        <img src={footerLogo} alt="" />
                      </span>
                      <p>
                        We are growing vegetables, fruits in the most natural
                        way and delivering at optimal price. We make regional
                        (Bengali/Odisha/North Indian) fruit and vegetable items
                        available to Hyderabad customers.
                      </p>
                      <Box className="text">
                        <a href="tel:+91 9701610033">+91 9701610033</a>
                        <span>or</span>
                        <a href="mailto:support@promodeagro.com">
                          support@promodeagro.com
                        </a>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <Grid container spacing={2}>
                      {login?.userId && (
                        <Grid item xs={6} sm={3} md={3}>
                          <Box className="footer-links">
                            <h3>My Account</h3>
                            <ul>
                              <li>
                                <Link
                                  to="/my-profile/personal-information"
                                  onClick={this.scrollToTop}
                                >
                                  My Account
                                </Link>
                              </li>
                              <li>
                                <Link to="/my-order" onClick={this.scrollToTop}>
                                  Order History
                                </Link>
                              </li>
                              <li>
                                <Link to="/mycart" onClick={this.scrollToTop}>
                                  Shopping Cart
                                </Link>
                              </li>
                              {/* <li>
                            <Link
                              to="/my-profile/wish-list"
                              onClick={this.scrollToTop}
                            >
                              Wishlist
                            </Link>
                          </li> */}
                            </ul>
                          </Box>
                        </Grid>
                      )}
                      <Grid item xs={6} sm={3} md={3}>
                        <Box className="footer-links">
                          <h3>Helps</h3>
                          <ul>
                            <li>
                              <Link to="/contact-us" onClick={this.scrollToTop}>
                                Contact Us
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/return-refund"
                                onClick={this.scrollToTop}
                              >
                                FAQs
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/terms-condition"
                                onClick={this.scrollToTop}
                              >
                                Terms & Conditions
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/privacy-policy"
                                onClick={this.scrollToTop}
                              >
                                Privacy Policy
                              </Link>
                            </li>
                          </ul>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={3} md={3}>
                        <Box className="footer-links">
                          <h3>Proxy</h3>
                          <ul>
                            <li>
                              <Link to="/about-us" onClick={this.scrollToTop}>
                                About Us
                              </Link>
                            </li>
                            <li>
                              <Link to="/category" onClick={this.scrollToTop}>
                                Product
                              </Link>
                            </li>
                            {loginDetails()?.userId && (
                              <li>
                                <Link to="/my-order" onClick={this.scrollToTop}>
                                  Track Order
                                </Link>
                              </li>
                            )}
                          </ul>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={3} md={3}>
                        <Box className="footer-links">
                          <h3>Categories</h3>
                          {this.renderCategories()}
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Box className="footer-bottom">
                  <Grid container spacing={2} alignItems={"center"}>
                    <Grid item xs={12} sm={12} md={8}>
                      <Box className="copyright">
                        PROMODE AGRO FARMS eCommerce © 2024. All Rights Reserved
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Box className="cards">
                        <span>
                          <img src={methodVisa} alt="Visa" />
                        </span>
                        <span>
                          <img src={methodMastercard} alt="Mastercard" />
                        </span>
                        <span>
                          <img src={methodDiscover} alt="Discover" />
                        </span>
                        <span>
                          <img src={paymentSecure} alt="Secure Payment" />
                        </span>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </Box>
          </>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  const { allCategories } = state.allproducts;
  return {
    allCategories,
  };
}
const mapDispatchToProps = {
  fetchCategories,
  fetchPersonalDetails,
  fetchDefaultAddress,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(Footer));
