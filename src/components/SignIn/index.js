import React, { Component } from "react";
import {
  Box,
  Container,
  Button,
  TextField,
  InputAdornment,
  Checkbox,
  Divider,
} from "@mui/material";
import addSymbol from "../../assets/img/add-symbol.svg";
import googleIcon from "../../assets/img/google.svg";
import ScrollAnimation from "react-animate-on-scroll";
import { Link } from "react-router-dom";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Box className="signin-container">
        <Container>
          <ScrollAnimation animateIn="bounceInRight" animateOut="bounceOutLeft">
            <Box className="signin-form-container d-flex justify-content-center">
              <Box className="signin-form-details d-flex justify-content-center">
                <Box className="d-block">
                  <h2 className="title">Register or Sign-in to My Account</h2>
                  <Box className="add-account-symbol d-flex justify-content-center">
                    <Box className="outer-symbol">
                      <Box className="inner-box">
                        <img src={addSymbol} alt="add-symbol" />
                      </Box>
                    </Box>
                  </Box>
                  <Button
                    variant="outlined"
                    className="google-login-box"
                    fullWidth
                  >
                    <img src={googleIcon} alt="google-icon" />
                  </Button>
                  <Box className="d-flex w-100 align-items-center more-option">
                    <Divider/>
                   <span> OR</span>
                    <Divider/>
                  </Box>
                  <Box className="number-input">
                    <label className="d-block">
                      Number <span className="validate-icon">*</span>
                    </label>
                    <TextField
                      className="number-textfield"
                      id="outlined-basic"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">+91</InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <Box className="term-condition-container d-flex align-items-center">
                    <Checkbox {...label} defaultChecked size="small" />
                    <span className="agree-text">
                      I agree to the <Link to="">Terms & Conditions</Link> and{" "}
                      <Link to="">Privacy Policy.</Link>
                    </span>
                  </Box>
                  <Button variant="contained" fullWidth className="common-btn">
                    Get OTP
                  </Button>
                </Box>
              </Box>
            </Box>
          </ScrollAnimation>
        </Container>
      </Box>
    );
  }
}

export default Signin;
