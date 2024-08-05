import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import instagramIcon from "../../assets/img/instagram-icon.svg";
import whatsappIcon from "../../assets/img/whatsapp-icon.svg";
import linkedinIcon from "../../assets/img/linkedin-icon.svg";
import facebookIcon from "../../assets/img/facebook-icon.png";
import { useLocation } from "react-router-dom"; // Import useLocation hook
import { loginDetails } from "Views/Utills/helperFunctions";
import { Link } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const login = loginDetails();

  useEffect(() => {}, [location.pathname]);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="footer">
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4}>
            <Box className="footer-about-text">
              <h3>About Promode Agro farms </h3>
              <p>
                We are growing vegetables, fruits in most natural way and
                delivering at optimal price. We make regional
                (Bengali/Odisha/North Indian) fruit and vegetables items
                available to Hyderabad customers.
              </p>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Grid container spacing={2}>
              {login?.userId && (
                <Grid item xs={4} sm={3} md={3}>
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
                        <Link to="/my-profile/wish-list" onClick={scrollToTop}>
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

              <Grid item xs={4} sm={3} md={3}>
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
              <Grid item xs={4} sm={3} md={3}>
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
                    <li>
                      <Link to="/my-order" onClick={scrollToTop}>
                        Track Order
                      </Link>
                    </li>
                  </ul>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <Box className="footer-social">
                  <h3>Social</h3>
                  <ul>
                    <li>
                      <a
                        href={
                          "https://www.instagram.com/promodeagrofarms?igsh=YzYzYTVhMmQ3Z2M5"
                        }
                        target="_blank"
                      >
                        <img src={instagramIcon} alt="" /> Promode agro farms
                      </a>
                    </li>
                    <li>
                      <Link>
                        <img src={whatsappIcon} alt="" /> +91 9929929292
                      </Link>
                    </li>
                    <li>
                      <Link>
                        <img src={linkedinIcon} alt="" /> Promode agro farms
                      </Link>
                    </li>

                    <li>
                      <a
                        href={
                          "https://www.facebook.com/profile.php?id=61559714217010&mibextid=ZbWKwL"
                        }
                        target="_blank"
                      >
                        <img src={facebookIcon} alt="" /> Promode agro facebook
                      </a>
                    </li>
                  </ul>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Footer;
