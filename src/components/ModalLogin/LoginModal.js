import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import closeModalIcon from "../../assets/img/closeModalIcon.svg";
import { Link, useNavigate } from "react-router-dom";
import { ValidationEngine, ErrorMessages } from "Views/Utills/helperFunctions";
import { signIn, validateOtp } from "../../Redux/Signin/SigninThunk";
import status from "../../Redux/Constants";
import { connect } from "react-redux";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import CircularProgress from "@mui/material/CircularProgress";
const mobileValidationSchema = {
  emailOrNumber: [
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
};

const otpScreenValidationSchema = {
  validateOtp: [
    {
      message: "Please enter otp",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
};

const AuthModal = (props) => {
  const { open, handleClose } = props;
  const navigate = useNavigate();
  const [formType, setFormType] = useState("login");
  const [emailOrNumber, setEmailOrNumber] = useState("");
  const [isSubmitMobOrEmail, setSubmitMobOrEmail] = useState(false);
  const [isOtpSubmitted, setOtpSubmitted] = useState(false);
  const [validateOtp, setValidateOtp] = useState("");

  const [seconds, setSeconds] = useState(30);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    if (props.loginData.status === status.SUCCESS && isSubmitMobOrEmail) {
      setSubmitMobOrEmail(false);
      if (props.loginData.data) {
        if (props.loginData.data.statusCode == 200) {
          resetTimer();
          setFormType("otp");
        } else {
          ErrorMessages.error(props.loginData.data.message);
        }
      }
    }
  }, [props.loginData.status]);

  useEffect(() => {
    if (props.validateOtpRes.status === status.SUCCESS && setSubmitMobOrEmail) {
      setSubmitMobOrEmail(false);
      if (props.validateOtpRes?.data) {
        if (props.validateOtpRes?.data?.statusCode == 200) {
          handleModalClose();
          // localStorage.setItem(
          //   "login",
          //   JSON.stringify(props?.validateOtpRes?.data?.data)
          // );

          // document.cookie = `login=${JSON.stringify(props?.validateOtpRes?.data?.data)}; path=/; max-age=3600`;
           sessionStorage.setItem(
            "login",
            JSON.stringify(props?.validateOtpRes?.data?.data)
          );
          props.handleDefaultAddress();

          props.handleClose();
        } else {
          ErrorMessages.error(props.validateOtpRes?.data?.message);
        }
      }
    }
  }, [props.validateOtpRes.status]);

  const resetTimer = () => {
    setSeconds(30);
    setIsActive(true);
  };
  const validateOtpForm = () => {
    const error = ValidationEngine.validate(otpScreenValidationSchema, {
      validateOtp,
    });
    return error;
  };

  const validateForm = () => {
    const error = ValidationEngine.validate(mobileValidationSchema, {
      emailOrNumber,
    });
    return error;
  };

  const handleRegisterForm = async (e) => {
    e.preventDefault();
    setSubmitMobOrEmail(true);
    const errorData = validateForm();
    if (errorData.isValid) {
      props.signIn({ mobileNumber: emailOrNumber });
    }
  };

  const handleOtpLogin = async (e) => {
    e.preventDefault();
    const otpScreenErrorData = validateOtpForm();
    setOtpSubmitted(true);
    if (otpScreenErrorData.isValid) {
      props.validateOtp({
        mobileNumber: emailOrNumber,
        otp: validateOtp,
      });
    }
  };
  const errorData = validateForm();
  const otpScreenErrorData = validateOtpForm();
  const renderForm = () => {
    switch (formType) {
      case "login":
        return (
          <form onSubmit={handleRegisterForm}>
            <Box>
              <h2 className="auth_container_title">Login or Sign Up</h2>
              <Box>
                <Box className="input_box">
                  <label className="d-block">Login With Phone</label>
                  <TextField
                    value={emailOrNumber}
                    onChange={(e) => setEmailOrNumber(e.target.value)}
                    name="emailOrNumber"
                    placeholder=" Number"
                    className="input-textfield"
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    type="text"
                  />
                  {isSubmitMobOrEmail && (
                    <FormHelperText error>
                      {errorData?.emailOrNumber?.message}
                    </FormHelperText>
                  )}
                </Box>
              </Box>
              <Box className="otp_box_bottom">
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="common-btn login-btns"
                  disabled={
                    props.loginData.status === status.IN_PROGRESS &&
                    setSubmitMobOrEmail
                  }
                  endIcon={
                    props.loginData.status === status.IN_PROGRESS &&
                    setSubmitMobOrEmail ? (
                      <CircularProgress className="common-loader" />
                    ) : (
                      <></>
                    )
                  }
                >
                  Continue
                </Button>
              </Box>
            </Box>
          </form>
        );
      case "otp":
        return (
          <form onSubmit={handleOtpLogin}>
            <Box>
              <h2 className="auth_container_title">Login</h2>
              <Box>
                <Box className="input_box">
                  <label className="d-block otp_labels">
                    +91 {emailOrNumber}{" "}
                    <span onClick={() => setFormType("login")}>Change</span>
                  </label>

                  <TextField
                    value={validateOtp}
                    onChange={(e) => setValidateOtp(e.target.value)}
                    name="otp"
                    placeholder="Enter OTP"
                    className="input-textfield"
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {isActive ? <span>{seconds}s</span> : <></>}

                          <Button
                            onClick={handleRegisterForm}
                            className="input_end_text"
                            disabled={isActive}
                          >
                            {" "}
                            Resend OTP{" "}
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {isOtpSubmitted && (
                    <FormHelperText error>
                      {otpScreenErrorData?.validateOtp?.message}
                    </FormHelperText>
                  )}
                </Box>
              </Box>
              <Box className="otp_box_bottom">
                <Button
                  variant="contained"
                  fullWidth
                  className="common-btn login-btns"
                  type="submit"
                  disabled={
                    props.validateOtpRes.status === status.IN_PROGRESS &&
                    isOtpSubmitted
                  }
                  endIcon={
                    props.validateOtpRes.status === status.IN_PROGRESS &&
                    isOtpSubmitted ? (
                      <CircularProgress className="common-loader" />
                    ) : (
                      <></>
                    )
                  }
                >
                  Login
                </Button>
              </Box>
            </Box>
          </form>
        );
      default:
        return null;
    }
  };

  const handleModalClose = () => {
    setFormType("login");
    setEmailOrNumber("");
    setSubmitMobOrEmail(false);
    setOtpSubmitted(false);
    setValidateOtp("");
    props.handleClose();
  };
  return (
    <Modal
      open={open}
      onClose={() => handleModalClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      data-aos="flip-left"
    >
      <Box className="common-modal auth_container">
        <img
          className="close_modal"
          onClick={() => handleModalClose()}
          src={closeModalIcon}
          alt="Close"
        />
        {renderForm()}
      </Box>
    </Modal>
  );
};

function mapStateToProps(state) {
  const { loginData, validateOtpRes } = state.login;
  return { loginData, validateOtpRes };
}

const mapDispatchToProps = { signIn, validateOtp };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(AuthModal));
