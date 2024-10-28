import React, { useEffect } from "react";
import { Box, TextField, Container, Grid, Button } from "@mui/material";
import footerLogo from "../../assets/img/footer-logo.png";
import methodVisa from "../../assets/img/MethodVisa.png";
import methodMastercard from "../../assets/img/MethodMastercard.png";
import methodDiscover from "../../assets/img/MethodDiscover.png";
import paymentSecure from "../../assets/img/PaymentSecure.png";
import { useLocation } from "react-router-dom";
import { loginDetails } from "Views/Utills/helperFunctions";
import { Link } from "react-router-dom";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  const location = useLocation();
  const login = loginDetails();

  useEffect(() => {}, [location.pathname]);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <Box className="newsletter-container">
        <Container>
          <Grid container spacing={2} alignItems={"center"}>
            <Grid item xs={12} sm={6} md={6} lg={5}>
              <Box className="contents">
                <h4>Subcribe our Newsletter</h4>
                <p>
                  Pellentesque eu nibh eget mauris congue mattis mattis nec
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
      <Box className="footer">
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4}>
              <Box className="footer-about-text">
                <span>
                  <img src={footerLogo} alt="" />
                </span>
                <p>
                  We are growing vegetables, fruits in most natural way and
                  delivering at optimal price. We make regional
                  (Bengali/Odisha/North Indian) fruit and vegetables items
                  available to Hyderabad customers
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
                            onClick={scrollToTop}
                          >
                            My Account
                          </Link>
                        </li>
                        <li>
                          <Link to="/my-order" onClick={scrollToTop}>
                            Order History
                          </Link>
                        </li>
                        <li>
                          <Link to="/mycart" onClick={scrollToTop}>
                            Shoping Cart
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/my-profile/wish-list"
                            onClick={scrollToTop}
                          >
                            Wishlist
                          </Link>
                        </li>
                        {/* <li>
                        <Link>Settings</Link>
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
                        <Link to={"/contact-us"} onClick={scrollToTop}>
                          Contact Us
                        </Link>
                      </li>
                      <li>
                        <Link to="/return-refund" onClick={scrollToTop}>
                          Faqs
                        </Link>
                      </li>
                      <li>
                        <Link to="/terms-condition" onClick={scrollToTop}>
                          Terms & Condition
                        </Link>
                      </li>
                      <li>
                        <Link to="/privacy-policy" onClick={scrollToTop}>
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
                        <Link to={"/about-us"} onClick={scrollToTop}>
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link to="/category" onClick={scrollToTop}>
                          Product
                        </Link>
                      </li>
                      {loginDetails()?.userId ? (
                        <li>
                          <Link to="/my-order" onClick={scrollToTop}>
                            Track Order
                          </Link>
                        </li>
                      ) : (
                        <></>
                      )}
                    </ul>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                  <Box className="footer-links">
                    <h3>Categories</h3>
                    <ul>
                      <li>
                        <Link to="#" onClick={scrollToTop}>
                          Bengali Special
                        </Link>
                      </li>
                      <li>
                        <Link to="#" onClick={scrollToTop}>
                          Fresh Vegetables
                        </Link>
                      </li>
                      <li>
                        <Link to="#" onClick={scrollToTop}>
                          Fresh Fruits
                        </Link>
                      </li>
                      <li>
                        <Link to="#" onClick={scrollToTop}>
                          Groceries
                        </Link>
                      </li>
                      <li>
                        <Link to="#" onClick={scrollToTop}>
                          Dairy
                        </Link>
                      </li>
                      <li>
                        <Link to="#" onClick={scrollToTop}>
                          Egg Meat & Fish
                        </Link>
                      </li>
                    </ul>
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
                    <img src={methodVisa} alt="" />
                  </span>
                  <span>
                    <img src={methodMastercard} alt="" />
                  </span>
                  <span>
                    <img src={methodDiscover} alt="" />
                  </span>
                  <span>
                    <img src={paymentSecure} alt="" />
                  </span>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
