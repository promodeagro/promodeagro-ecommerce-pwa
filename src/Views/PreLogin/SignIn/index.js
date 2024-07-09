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
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { ErrorMessages, ValidationEngine } from "../../Utills/helperFunctions";
import { signIn } from "../../../Redux/Signin/SigninThunk";
import addSymbol from "../../../assets/img/add-symbol.svg";
import googleIcon from "../../../assets/img/google.svg";
import { Link } from "react-router-dom";
import otpSentIcon from "../../../assets/img/otp-sent.png";
import {
  setSelectedAdd
} from "../../../Redux/Address/AddressSlice";
import {
  getAllAddress
} from "../../../Redux/Address/AddressThunk";

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
  isPolicyAccepted:
    [
      {
        message: "Please accept privacy policy",
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
      isPolicyAccepted: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.loginData.status !== this.props.loginData.status &&
      this.props.loginData.status === status.SUCCESS &&
      this.props.loginData.data &&
      this.props.loginData.data.token
    ) {
      localStorage.setItem("login", JSON.stringify(this.props.loginData.data));
      this.setState({
        mobileNumber: "",
        password: "",
        isSubmit: false,
      });
      ErrorMessages.success("Logged In Successfully");
      this.props.getAllAddress({
        userId: this.props.loginData.data.userId,
      })

    } else if (this.props.loginData.data && !this.props.loginData.data.token) {
      this.setState({
        isSubmit: false,
      });
      ErrorMessages.error(this.props.loginData.data.response?.data?.message);
    }



    if (
      prevProps.allAddress.status !== this.props.allAddress.status &&
      this.props.allAddress.status === status.SUCCESS &&
      this.props.allAddress.data
    ) {
      this.props.setSelectedAdd(this.props.allAddress.data.addresses[0])
      this.props.navigate("/")
    }

  }

  validateForm = () => {
    const { mobileNumber, password, isPolicyAccepted } = this.state;
    const error = ValidationEngine.validate(validationSchema, {
      mobileNumber,
      password,
      isPolicyAccepted
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
                {/* <Button
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
                </Box> */}
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
                  {isSubmit && (
                    <FormHelperText error>
                      {errorData?.mobileNumber?.message}
                    </FormHelperText>
                  )}
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
                    name="password"
                    value={password}
                    type="password"
                    onChange={this.handleValueChange}
                    error={!errorData.password.isValid && isSubmit}
                  />
                  {isSubmit && (
                    <FormHelperText error>
                      {errorData?.password?.message}
                    </FormHelperText>
                  )}
                </Box>
                <Box className="term-condition-container d-flex align-items-center">
                  <Checkbox {...label}
                    checked={this.state.isPolicyAccepted} size="small"
                    onChange={this.handleValueChange}
                    name="isPolicyAccepted"
                  />
                  <span className="agree-text">
                    I agree to the <Link to="">Terms & Conditions</Link> and{" "}
                    <Link to="">Privacy Policy.</Link>
                  </span>
                  {isSubmit && (
                    <FormHelperText error>
                      {errorData?.isPolicyAccepted?.message}
                    </FormHelperText>
                  )}
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  className="common-btn"
                  onClick={() => this.handleSignIn()}
                  disabled={this.props.loginData.status === status.IN_PROGRESS}
                  endIcon={
                    this.props.loginData.status === status.IN_PROGRESS ? (
                      <CircularProgress />
                    ) : (
                      <></>
                    )
                  }
                >
                  Login
                </Button>

                <Box marginTop={"15px"}>
                  New User? <Link to={"/signup"}>Sign up</Link>
                </Box>
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
            <Link to={"/myCart"}>
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
