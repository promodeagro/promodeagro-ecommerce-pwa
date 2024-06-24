import React, { Component } from "react";
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import instagramIcon from "../../assets/img/instagram-icon.svg";
import whatsappIcon from "../../assets/img/whatsapp-icon.svg";
import linkedinIcon from "../../assets/img/linkedin-icon.svg";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }



  render() {
    return (
      <div className="footer">
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6} md={4}>
              <Box className="footer-about-text">
                <h3>About Promode Agro farms </h3>
                <p>Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis dui, eget bibendum magna congue nec.</p>
              </Box>
            </Grid>
            <Grid item xs={6} sm={6} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={3}>
                  <Box className="footer-links">
                    <h3>My Account</h3>
                    <ul>
                      <li>
                        <a href="#">My Account</a>
                      </li>
                      <li>
                        <a href="#">Order History</a>
                      </li>
                      <li>
                        <a href="#">Shoping Cart</a>
                      </li>
                      <li>
                        <a href="#">Wishlist</a>
                      </li>
                      <li>
                        <a href="#">Settings</a>
                      </li>
                    </ul>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                  <Box className="footer-links">
                    <h3>Helps</h3>
                    <ul>
                      <li>
                        <a href="#">Contact</a>
                      </li>
                      <li>
                        <a href="#">Faqs</a>
                      </li>
                      <li>
                        <a href="#">Terms & Condition</a>
                      </li>
                      <li>
                        <a href="#">Privacy Policy</a>
                      </li>
                    </ul>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                  <Box className="footer-links">
                    <h3>Proxy</h3>
                    <ul>
                      <li>
                        <a href="#">About</a>
                      </li>
                      <li>
                        <a href="#">Product</a>
                      </li>
                      <li>
                        <a href="#">Track Order</a>
                      </li>
                    </ul>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                  <Box className="footer-social">
                    <h3>Social</h3>
                    <ul>
                      <li>
                        <a href="#"><img src={instagramIcon} alt="" /> Promode agro farms</a>
                      </li>
                      <li>
                        <a href="#"><img src={whatsappIcon} alt="" /> +91 9929929292</a>
                      </li>
                      <li>
                        <a href="#"><img src={linkedinIcon} alt="" /> Promode agro farms</a>
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
  }
}


export default Footer;
