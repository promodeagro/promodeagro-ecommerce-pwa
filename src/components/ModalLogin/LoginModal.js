import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  InputAdornment,
  FormHelperText,
  Typography,
  IconButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import logo2 from "../../assets/img/logo2.png";
import loginimage from "../../assets/img/image.png";
import { useMediaQuery } from "@mui/material"; // Import useMediaQuery
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
  // Determine if the screen size is mobile
  const isMobile = useMediaQuery("(max-width:600px)");

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
          if (window.location.hostname === "localhost") {
            document.cookie = `login=${JSON.stringify(
              props?.validateOtpRes?.data?.data
            )}; path=/; max-age=3600`;
          }
          document.cookie = `login=${JSON.stringify(
            props?.validateOtpRes?.data?.data
          )}; path=/; domain=.promodeagro.com; max-age=3600`;
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
  const [isMobileValid, setIsMobileValid] = useState(false); // Step 1

  useEffect(() => {
    // Step 2: Check if the mobile number is valid
    const errorData = validateForm();
    if (errorData.isValid && emailOrNumber !== "") {
      setIsMobileValid(true);
    } else {
      setIsMobileValid(false);
    }
  }, [emailOrNumber]); // Re-run when the mobile number changes
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  // Function to extract OTP from the message using regex
  const extractOtp = (message) => {
    // Regex to match the 6 digits before "is your OTP"
    const regex = /\b(\d{6})\b/;
    const match = message.match(regex);
    return match ? match[0] : null; // If match found, return OTP, otherwise null
  };

  // Placeholder for WebOTP functionality
  useEffect(() => {
    if ("OTPCredential" in window) {
      // Register WebOTP API
      const handleOtpReceived = (event) => {
        const otpFromSms = event.data; // Your OTP message from SMS
        const otp = extractOtp(otpFromSms); // Extract OTP using the function
        if (otp) {
          setOtp(otp.split("")); // Set OTP digits in the state
        }
      };

      window.addEventListener("otpreceived", handleOtpReceived);

      return () => {
        window.removeEventListener("otpreceived", handleOtpReceived);
      };
    }
  }, []);

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (!/^\d?$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setValidateOtp(newOtp.join("")); // Update validation state

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    if (index === 5 && value) {
      handleOtpLogin(event); // Auto-submit when last digit is entered
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const renderForm = () => {
    switch (formType) {
      case "login":
        return (
          <form onSubmit={handleRegisterForm}>
            <Box>
              {!isMobile ? (
                <h2 className="auth_container_title">Login or Sign Up</h2>
              ) : (
                <p style={{ textAlign: "center" }}>Login or Sign Up</p>
              )}
              <Box>
                <Box className="input_box">
                  {!isMobile ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center", // Horizontally center
                          alignItems: "center", // Vertically center
                        }}
                      >
                        <TextField
                          sx={{
                            borderRadius: "16px",
                            marginTop: "10px",
                            width: "280px",
                          }}
                          value={emailOrNumber}
                          onChange={(e) => setEmailOrNumber(e.target.value)}
                          name="emailOrNumber"
                          placeholder="+91"
                          className="input-textfield"
                          id="outlined-basic"
                          variant="outlined"
                          type="tel"
                        />
                      </Box>
                      {isSubmitMobOrEmail && (
                        <div style={{display:'flex',justifyContent:'left', marginLeft:'52px'}}>
                        <FormHelperText error>
                          {errorData?.emailOrNumber?.message}
                        </FormHelperText>
                        </div>
                      )}
                    </>
                  )}
                </Box>
              </Box>
              <Box className="otp_box_bottom">
                {!isMobile ? (
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
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center", // Horizontally center
                      alignItems: "center", // Vertically center
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      sx={{
                        backgroundColor: isMobileValid ? "#1F9151" : "#9BA7B6", 
                        // Step 3: Success color if valid
                        borderRadius: "6px",
                        marginTop: "15px",
                        width: "280px",
                        marginBottom:'10px'
                      }}
                      // fullWidth
                      // className="common-btn login-btns"
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
                )}
              </Box>
            </Box>
          </form>
        );
      case "otp":
        return (
          <form onSubmit={handleOtpLogin}>
            {!isMobile ? (
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
                      type="tel"
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
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  // justifyContent: "center",
                  height: "100vh",
                  padding: "20px",
                }}
              >
                <Typography variant="body2" sx={{ color: "gray" }}>
                  We've sent a verification code to
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  +91 {emailOrNumber}
                </Typography>

                <Box sx={{ display: "flex", gap: "8px", marginTop: "20px" }}>
                  {otp.map((digit, index) => (
                    <TextField
                      key={index}
                      value={digit}
                      onChange={(e) => handleChange(index, e)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      inputRef={(el) => (inputRefs.current[index] = el)}
                      variant="outlined"
                      size="small"
                      type="tel"
                      
                      inputMode="numeric"  // Force numeric keyboard
                      pattern="[0-9]"      // Ensure the input is a number
                      inputProps={{
                        maxLength: 1,
                        style: { textAlign: "center", fontSize: "18px" },
                      }}
                      sx={{ width: "40px", height: "40px" }}
                    />
                  ))}
                </Box>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="text"
                    color="success"
                    onClick={handleRegisterForm}
                    className="input_end_text"
                    disabled={isActive}
                  >
                    {" "}
                    Resend OTP{" "}
                  </Button>
                  {isActive ? (
                    <span>
                      {" "}
                      in{""} {seconds}s
                    </span>
                  ) : (
                    <></>
                  )}
                  {isOtpSubmitted && (
                    <FormHelperText error>
                      {otpScreenErrorData?.validateOtp?.message}
                    </FormHelperText>
                  )}
                </div>

                {/* <Button
        variant="contained"
        color="success"
        fullWidth
        sx={{ marginTop: "20px", padding: "10px" }}
        onClick={handleOtpLogin}
      >
        Continue
      </Button> */}
              </Box>
            )}
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
    <>
      {!isMobile ? (
        <Modal
          sx={{
            borderRadius: isMobile ? "0px" : "8px", // Set border radius to 0 on mobile
          }}
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
      ) : (
        //mobile screen UI
        <Modal sx={{}} open={open} onClose={handleModalClose}>
          <Box
            open={open}
            // className="auth_container"
            sx={{
              width: "100%", // Adjust width for mobile
              margin: "auto",
              // Adjust padding for mobile

              backgroundColor: "white",

              // backgroundColor: "white",
              height: "100vh", // Allow scrolling on mobile if necessary
              overflowY: "auto",
            }}
          >
            {/* Render images only if formType is not 'otp' */}
            {formType !== "otp" ? (
              <>
                <img
                 style={{height:'370px',width:'100%'}} 
                src={loginimage} alt="logo" />

                <div style={{ textAlign: "center" }}>
                  <img
                    src={logo2}
                    alt=""
                    style={{
                      borderRadius: "8px",
                      width: "80px",
                      height: "67.37px",
                      display: "inline-block",
                      backgroundColor: "#D4ECE8",
                    }}
                  />
                  <h2
                    style={{
                      color: "#005F41",
                      margin: "10px",
                      fontSize: "22px",
                      fontFamily: '"IBM Plex Mono", monospace',
                    }}
                  >
                    PROMODE AGRO FARM
                  </h2>
                </div>
              </>
            ) : (
              <>
                <IconButton
                  onClick={() => setFormType("login")}
                  sx={{ alignSelf: "flex-start", marginRight: "5px" }}
                >
                  <ArrowBack />{" "}
                  <Typography sx={{ marginLeft: "5px" }} variant="h6">
                    OTP Verification
                  </Typography>
                </IconButton>
                <hr></hr>
              </>
            )}

            {renderForm()}
           
          </Box>
        </Modal>
      )}
    </>
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

