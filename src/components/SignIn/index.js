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
  Typography,
} from "@mui/material";
import addSymbol from "../../assets/img/add-symbol.svg";
import googleIcon from "../../assets/img/google.svg";
import ScrollAnimation from "react-animate-on-scroll";
import { Link } from "react-router-dom";
import otpSentIcon from "../../assets/img/otp-sent.png";
import { MuiOtpInput } from "mui-one-time-password-input";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      otp: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange(newValue) {
    this.setState({ otp: newValue });
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
                  <Box className="common-symbol d-flex justify-content-center">
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
                    <Divider />
                    <span> OR</span>
                    <Divider />
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
                  <Button
                    variant="contained"
                    fullWidth
                    className="common-btn"
                    onClick={this.handleOpen}
                  >
                    Get OTP
                  </Button>
                </Box>
              </Box>
            </Box>
          </ScrollAnimation>
        </Container>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="otp-modal-container">
            <Box className="common-symbol d-flex justify-content-center">
              <Box className="outer-symbol">
                <Box className="inner-box">
                  <img src={otpSentIcon} alt="add-symbol" />
                </Box>
              </Box>
            </Box>
            <Box className="text-center">
              <h3 className="title">Enter Verification Code</h3>
              <span className="code-send-number">
                We’ve sent a code to <strong>+91 922011122</strong>
              </span>
            </Box>
            <Divider />
            <MuiOtpInput
              value={this.state.otp}
              onChange={this.handleChange}
              className="otp-input-container"
            />
            <Button
              variant="contained"
              fullWidth
              className="common-btn"
              onClick={this.handleOpen}
            >
              Verify
            </Button>
            <Box className="resend-code-container text-center d-block">
              <span className="code-issue d-block">
                Experiencing issues receiving the code?
              </span>
              <Link>Resend code</Link>
            </Box>
          </Box>
        </Modal>
      </Box>
    );
  }
}

export default Signin;
