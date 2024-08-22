import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../../Redux/Signup/SignupThunk";
import { ErrorMessages, ValidationEngine } from "../../Utills/helperFunctions";
import status from "../../../Redux/Constants";
import {
  Box,
  Container,
  Button,
  TextField,
  InputAdornment,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import addSymbol from "../../../assets/img/add-symbol.svg";
import { Link } from "react-router-dom";

const validationSchema = {
  mobileNumber: [
    {
      message: "Please Enter Mobile number",
      type: ValidationEngine.type.MANDATORY,
    },
    {
      message: "Please Enter Valid Mobile Number",
      type: ValidationEngine.type.REGEX,
      regex: ValidationEngine.MOBILE_NUMBER_REGEX,
    },
  ],
  password: [
    {
      message: "Please Enter Password",
      type: ValidationEngine.type.MANDATORY,
    },
    {
      message: "Please Enter Strong Password",
      type: ValidationEngine.type.REGEX,
      regex: ValidationEngine.PASSWORD_REGEX,
    },
  ],
  cnfPassword: [
    {
      message: "Please Enter Password",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
  name: [
    {
      message: "Please Enter Name",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
};

const SignUp = ({ signUp, signupData }) => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    cnfPassword: "",
    mobileNumber: "",
    isSubmit: false,
  });
  const [apiLoader, setApiLoader] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (signupData.status === status.SUCCESS && signupData.data && apiLoader) {
      setApiLoader(false);
      if (signupData.data.statusCode == 401) {
        ErrorMessages.error(signupData.data.message);
        return;
      } else if (signupData.data.statusCode == 201) {
        ErrorMessages.success(signupData.data.message);
        setFormData({
          ...formData,
          mobileNumber: "",
          password: "",
          isSubmit: false,
          cnfPassword: "",
          name: "",
        });
        navigate("/signin");
      }
    }
  }, [signupData.status]); // eslint-disable-line react-hooks/exhaustive-deps

  const validateForm = () => {
    const { mobileNumber, password, name, cnfPassword } = formData;
    const error = ValidationEngine.validate(validationSchema, {
      mobileNumber,
      password,
      name,
      cnfPassword,
    });

    const TEXT_NO_SPCKEY_NUM = /^[a-zA-Z_]+$/;
    if (error.name.isValid && !TEXT_NO_SPCKEY_NUM.test(name)) {
      error.isValid = false;
      error.name.isValid = false;
      error.name.message =
        "Name Should Not Contain Any Special Character And Numbers";
    }

    if (
      error.password.isValid &&
      error.cnfPassword.isValid &&
      password !== cnfPassword
    ) {
      error.isValid = false;
      error.cnfPassword.isValid = false;
      error.cnfPassword.message = "Confirm password does not match";
    }
    return error;
  };

  const handleSignUp = () => {
    const { mobileNumber, password, name } = formData;

    const errorData = validateForm();
    setApiLoader(true);
    setFormData({
      ...formData,
      isSubmit: true,
    });

    if (errorData.isValid) {
      signUp({
        mobileNumber,
        password,
        name,
      });
    }
  };

  const handleValueChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: val,
    });
  };

  const { name, password, mobileNumber, cnfPassword, isSubmit } = formData;
  const errorData = validateForm();

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
                  value={name}
                  onChange={handleValueChange}
                  name="name"
                  error={!errorData.name.isValid && isSubmit}
                />
              </Box>
              {isSubmit && (
                <FormHelperText error>
                  {errorData?.name?.message}
                </FormHelperText>
              )}
              <Box className="number-input">
                <label className="d-block">
                  Mobile Number <span className="validate-icon">*</span>
                </label>
                <TextField
                  type="number"
                  className="number-textfield"
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  name="mobileNumber"
                  value={mobileNumber}
                  onChange={handleValueChange}
                  error={!errorData.mobileNumber.isValid && isSubmit}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+91</InputAdornment>
                    ),
                  }}
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
                  type="password"
                  name="password"
                  value={password}
                  error={!errorData.password.isValid && isSubmit}
                  onChange={handleValueChange}
                />
              </Box>
              {isSubmit && (
                <FormHelperText error>
                  {errorData?.password?.message}
                </FormHelperText>
              )}
              <Box className="number-input">
                <label className="d-block">
                  Confirm Password <span className="validate-icon">*</span>
                </label>
                <TextField
                  className="number-textfield"
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  name="cnfPassword"
                  value={cnfPassword}
                  onChange={handleValueChange}
                  error={!errorData.cnfPassword.isValid && isSubmit}
                  type="password"
                />
              </Box>
              {isSubmit && (
                <FormHelperText error>
                  {errorData?.cnfPassword?.message}
                </FormHelperText>
              )}
              <Button
                variant="contained"
                fullWidth
                className="common-btn sign-up-btn"
                onClick={handleSignUp}
                disabled={signupData.status === status.IN_PROGRESS}
                endIcon={
                  signupData.status === status.IN_PROGRESS ? (
                    <CircularProgress className="common-loader" />
                  ) : (
                    <></>
                  )
                }
              >
                Sign Up
              </Button>
              <Box marginTop={"15px"}>
                <Link to={"/signin"}>
                  <Button
                    variant="outlined"
                    fullWidth
                    className="outline-common-btn"
                  >
                    Back to Login
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

function mapStateToProps(state) {
  const { signupData } = state.signup;
  return { signupData };
}

const mapDispatchToProps = { signUp };

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
