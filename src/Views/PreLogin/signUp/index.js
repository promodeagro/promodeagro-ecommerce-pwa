import React, { Component } from "react";
import {
  Box,
  Container,
  Button,
  TextField,
  InputAdornment,
  Checkbox,
  Divider,
  Modal,
} from "@mui/material";

import { ValidationEngine } from "../../Utills/helperFunctions";
import { signIn } from "../../../Redux/Signin/SigninThunk";
import addSymbol from "../../../assets/img/add-symbol.svg";
import googleIcon from "../../../assets/img/google.svg";
import { Link } from "react-router-dom";
import otpSentIcon from "../../../assets/img/otp-sent.png";
import { MuiOtpInput } from "mui-one-time-password-input";
import { connect } from "react-redux";
import status from "../../../Redux/Constants";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Box className="signin-container">
        <Container>
          <Box
            className="signin-form-container d-flex justify-content-center"
            data-aos="zoom-in-right"
          >
            <Box className="signin-form-details d-flex justify-content-center">
              <Box className="d-block w-100">
                <h2 className="title">Sign Up Your Account</h2>
                <Box className="common-symbol d-flex justify-content-center">
                  <Box className="outer-symbol">
                    <Box className="inner-box">
                      <img src={addSymbol} alt="add-symbol" />
                    </Box>
                  </Box>
                </Box>
                <Box className="number-input">
                  <label className="d-block">
                    Name <span className="validate-icon">*</span>
                  </label>
                  <TextField
                    className="number-textfield"
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    name="name"
                  />
                </Box>
                <Box className="number-input">
                  <label className="d-block">
                    Mobile Number <span className="validate-icon">*</span>
                  </label>
                  <TextField
                    className="number-textfield"
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    name="mobileNumber"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+91</InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box className="number-input">
                  <label className="d-block">
                    Password <span className="validate-icon">*</span>
                  </label>
                  <TextField
                    className="number-textfield"
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    type="password"
                  />
                </Box>
                <Box className="number-input">
                  <label className="d-block">
                    Confirm Password <span className="validate-icon">*</span>
                  </label>
                  <TextField
                    className="number-textfield"
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    type="confirmPassword"
                  />
                </Box>
                <Button variant="contained" fullWidth className="common-btn sign-up-btn">
                  Sign Up
                </Button>
                {/* <Button
                                    variant="contained"
                                    fullWidth
                                    className="common-btn"
                                    onClick={this.handleOpen}
                                >
                                    Get OTP
                                </Button> */}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default SignUp;
