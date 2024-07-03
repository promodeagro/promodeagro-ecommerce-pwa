import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../../Redux/Signup/SignupThunk';
import { ErrorMessages, ValidationEngine } from '../../Utills/helperFunctions';
import status from '../../../Redux/Constants';
import {
  Box,
  Container,
  Button,
  TextField,
  InputAdornment,
  FormHelperText
} from '@mui/material';
import addSymbol from '../../../assets/img/add-symbol.svg';

const validationSchema = {
  mobileNumber: [
    {
      message: 'Please enter Mobile number',
      type: ValidationEngine.type.MANDATORY,
    },
    {
      message: 'Please valid Mobile Number',
      type: ValidationEngine.type.REGEX,
      regex: ValidationEngine.MOBILE_NUMBER_REGEX,
    },
  ],
  password: [
    {
      message: 'Please enter Password',
      type: ValidationEngine.type.MANDATORY,
    },
  ],
  cnfPassword: [
    {
      message: 'Please enter Password',
      type: ValidationEngine.type.MANDATORY,
    },
  ],
  name: [
    {
      message: 'Please enter Name',
      type: ValidationEngine.type.MANDATORY,
    },
  ],
};

const SignUp = ({ signUp, signupData }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    cnfPassword: '',
    mobileNumber: '',
    isSubmit: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (
      signupData.status === status.SUCCESS &&
      signupData.data && formData.isSubmit
    ) {
      setFormData({
        ...formData,
        mobileNumber: '',
        password: '',
        isSubmit: false,
        cnfPassword: '',
        name: '',
      });
      navigate('/signin');
      ErrorMessages.success('Signup Successfully');
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

    if (
      error.password.isValid &&
      error.cnfPassword.isValid &&
      password !== cnfPassword
    ) {
      error.isValid = false;
      error.cnfPassword.isValid = false;
      error.cnfPassword.message = 'Confirm password does not match';
    }
    return error;
  };

  const handleSignUp = () => {
    const { mobileNumber, password, name } = formData;

    const errorData = validateForm();

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
    const val = type === 'checkbox' ? checked : value;
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
                {isSubmit && (
                  <FormHelperText error>
                    {errorData?.name?.message}
                  </FormHelperText>
                )}
                <p>{isSubmit && errorData.name.message}</p>
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
                  value={mobileNumber}
                  onChange={handleValueChange}
                  error={!errorData.mobileNumber.isValid && isSubmit}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+91</InputAdornment>
                    ),
                  }}
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
                  type="password"
                  name="password"
                  value={password}
                  error={!errorData.password.isValid && isSubmit}
                  onChange={handleValueChange}
                />
                {isSubmit && (
                  <FormHelperText error>
                    {errorData?.password?.message}
                  </FormHelperText>
                )}
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
                  name="cnfPassword"
                  value={cnfPassword}
                  onChange={handleValueChange}
                  error={!errorData.cnfPassword.isValid && isSubmit}
                  type="password"
                />
                {isSubmit && (
                  <FormHelperText error>
                    {errorData?.cnfPassword?.message}
                  </FormHelperText>
                )}

              </Box>
              <Button
                variant="contained"
                fullWidth
                className="common-btn sign-up-btn"
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
