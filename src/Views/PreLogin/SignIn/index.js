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
  FormHelperText,
  Grid,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { ErrorMessages, ValidationEngine } from "../../Utills/helperFunctions";
import { signIn } from "../../../Redux/Signin/SigninThunk";
import addSymbol from "../../../assets/img/add-symbol.svg";
import googleIcon from "../../../assets/img/google.svg";
import { Link } from "react-router-dom";
import otpSentIcon from "../../../assets/img/otp-sent.png";
import { setSelectedAdd } from "../../../Redux/Address/AddressSlice";
import { getAllAddress } from "../../../Redux/Address/AddressThunk";

import { MuiOtpInput } from "mui-one-time-password-input";
import { connect } from "react-redux";
import status from "../../../Redux/Constants";
import CircularProgress from "@mui/material/CircularProgress";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const validationSchema = {
  mobileNumber: [
    {
      message: "Please enter Mobile number",
      type: ValidationEngine.type.MANDATORY,
    },
    {
      message: "Please valid Mobile Number",
      type: ValidationEngine.type.REGEX,
      regex: ValidationEngine.MOBILE_NUMBER_REGEX,
    },
  ],
  password: [
    {
      message: "Please enter Password",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
};

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      otp: "",
      mobileNumber: "",
      password: "",
      isSubmit: false,
      isPolicyAccepted: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.loginData.status !== this.props.loginData.status &&
      this.props.loginData.status === status.SUCCESS &&
      this.props.loginData.data
    ) {
      if (this.props.loginData.data.statusCode == 401) {
        ErrorMessages.error(this.props.loginData.data.message);
        return;
      } else if (
        this.props.loginData.data.statusCode == 200 &&
        this.props.loginData.data.token
      ) {
        this.setState({
          mobileNumber: "",
          password: "",
          isSubmit: false,
        });
        localStorage.setItem(
          "login",
          JSON.stringify(this.props.loginData.data)
        );
        this.props.navigate(-1);
      }
    }
  }

  validateForm = () => {
    const { mobileNumber, password } = this.state;
    const error = ValidationEngine.validate(validationSchema, {
      mobileNumber,
      password,
    });
    return error;
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange(newValue) {
    this.setState({ otp: newValue });
  }

  handleValueChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;
    this.setState({ [name]: val });
  };

  handleSignIn = () => {
    const { mobileNumber, password } = this.state;

    const errorData = this.validateForm();
    this.setState({
      isSubmit: true,
    });
    if (errorData.isValid) {
      this.props.signIn({
        mobileNumber,
        password,
      });
    }
  };

  render() {
    const errorData = this.validateForm();
    const { mobileNumber, password, isSubmit } = this.state;
    return (
      <Box className="signin-container">
        <Container>
          <Box
            className="signin-form-container d-flex justify-content-center"
            data-aos="zoom-in-right"
          >
            <Box className="signin-form-details d-flex justify-content-center">
              <Box className="d-block w-100">
                <h2 className="title">Register or Sign-in to My Account</h2>
                <Box className="common-symbol d-flex justify-content-center">
                  <Box className="outer-symbol">
                    <Box className="inner-box">
                      <img src={addSymbol} alt="add-symbol" />
                    </Box>
                  </Box>
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
                    name="mobileNumber"
                    value={mobileNumber}
                    onChange={this.handleValueChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+91</InputAdornment>
                      ),
                    }}
                    error={!errorData.mobileNumber.isValid && isSubmit}
                  />
                </Box>
                {isSubmit && (
                  <FormHelperText error>
                    {errorData?.mobileNumber?.message}
                  </FormHelperText>
                )}
                <Box className="number-input">
                  <label className="d-block">
                    Password <span className="validate-icon">*</span>
                  </label>
                  <TextField
                    className="number-textfield"
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    name="password"
                    value={password}
                    type="password"
                    onChange={this.handleValueChange}
                    error={!errorData.password.isValid && isSubmit}
                  />
                </Box>
                {isSubmit && (
                  <FormHelperText error>
                    {errorData?.password?.message}
                  </FormHelperText>
                )}
                <Button
                  variant="contained"
                  fullWidth
                  className="common-btn sign-up-btn"
                  onClick={() => this.handleSignIn()}
                  disabled={this.props.loginData.status === status.IN_PROGRESS}
                  endIcon={
                    this.props.loginData.status === status.IN_PROGRESS ? (
                      <CircularProgress className="common-loader" />
                    ) : (
                      <></>
                    )
                  }
                >
                  Login
                </Button>
                <Grid container spacing={2} alignItems={"flex-start"}>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Box marginTop={"15px"}>
                      New User? <Link to={"/signup"}>Sign up</Link>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Box marginTop={"15px"} textAlign={"end"}>
                      <Link to={"/forgot-password"}>Forgot Password</Link>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Container>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          data-aos="flip-left"
        >
          <Box className="common-modal otp-modal-container">
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
            <Link to={"/mycart"}>
              <Button
                variant="contained"
                fullWidth
                className="common-btn"
                onClick={this.handleOpen}
              >
                Verify
              </Button>
            </Link>
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

function mapStateToProps(state) {
  const { loginData } = state.login;
  const { allAddress, selectedAddressData } = state.alladdress;
  return { loginData, allAddress };
}

const mapDispatchToProps = { signIn, setSelectedAdd, getAllAddress };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(Signin));
