import React, { useState } from 'react';
import { Modal, Box, TextField, Button, InputAdornment, FormHelperText } from '@mui/material';
import closeModalIcon from "../../assets/img/closeModalIcon.svg";
import { Link, useNavigate } from 'react-router-dom';
import { ValidationEngine } from 'Views/Utills/helperFunctions';



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

};

const AuthModal = ({ open, handleClose }) => {
  const navigate = useNavigate()
  const [formType, setFormType] = useState('login'); // login, otp

const [emailOrNumber,setEmailOrNumber] = useState('')


// handle LOGIN form
const handleRegisterForm = (e) => {
  e.preventDefault();  // Prevent form from reloading the page

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "mobileNumber": emailOrNumber
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("https://09ubwkjphb.execute-api.us-east-1.amazonaws.com/login", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))  // This will now properly log
    .catch((error) => console.error(error));
    setFormType('otp')
};

// handle log with otp 000
const handleOtpLogin = (e) => {
  e.preventDefault();  // Prevent form from reloading the page

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "mobileNumber": emailOrNumber
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("https://09ubwkjphb.execute-api.us-east-1.amazonaws.com/login", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))  // This will now properly log
    .catch((error) => console.error(error));
    setFormType('otp')
};

  // This function will choose which form to submit
  const onSubmits = (e) => {
    if (formType === 'login') {
      handleRegisterForm(e); // Handle registration
    } else if (formType === 'otp') {
      handleOtpLogin(e); // Handle OTP login
    }
  };


  
// use states for temperery

const [validateNumber , setValidateNumber] = useState(emailOrNumber)
const [validateOtp , setValidateOtp] = useState("")


  // FETCHING TOKOn  form

  const validateOtpForm = (e) => {
    e.preventDefault();
  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const raw = JSON.stringify({
      mobileNumber: emailOrNumber,
      otp: validateOtp
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  
    fetch("https://09ubwkjphb.execute-api.us-east-1.amazonaws.com/login/validate-otp", requestOptions)
      .then((response) => response.json()) // Change this to .json() to properly parse the JSON response
      .then((result) => {
        console.log(result); // Now logs the result correctly
        // Save token to localStorage
        localStorage.setItem('token', result.token); // 'result.token' will be the correct token from the response
        console.log("Token saved to localStorage:", result.token);
      })
      .catch((error) => console.error('Error:', error));
      navigate('/mycart')
    
  };
  

  // FETCHING TOKOn  form

  const renderForm = () => {
    switch (formType) {
      case 'login':
        return (
          <form onSubmit={onSubmits}>
          <Box>
            <h2 className='auth_container_title'>Login or Sign Up</h2>
            <Box>
              <Box className="input_box">
                <label className="d-block">
                  Login With Email/Phone
                </label>
                <TextField
                value={emailOrNumber}
                onChange={(e)=> setEmailOrNumber(e.target.value)}
                  name="emailOrNumber"
                  placeholder='Email or Number'
                  className="input-textfield"
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  type="text"
                />
                <FormHelperText error>
                  {/* Add any validation error messages here */}
                </FormHelperText>
              </Box>
            </Box>

            <Box className="otp_box_bottom">
              <Button
              type='submit'
                variant="contained"
                fullWidth
                className="common-btn login-btns"
              >
                Continue
              </Button>
            </Box>
          </Box>
          </form>
        );
      case 'otp':
        return (
<form onSubmit={validateOtpForm}>
          <Box>
            <h2 className='auth_container_title'>Login</h2>
            <Box>
              <Box className="input_box">
                <label className="d-block otp_labels">
                  +91 {emailOrNumber} <span onClick={()=> setFormType('login')}>Change</span>
                </label>
                <TextField
                value={validateOtp}
                onChange={(e)=> setValidateOtp(e.target.value)}
                  name="otp"
                  placeholder='Enter OTP'
                  className="input-textfield"
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <span onClick={onSubmits} className='input_end_text'> Resend OTP </span>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormHelperText error>
                  {/* Add any validation error messages here */}
                </FormHelperText>
              </Box>
            </Box>

            <Box className="otp_box_bottom">
              <Button
                variant="contained"
                fullWidth
                className="common-btn login-btns"
                type='submit'
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

  return (
    <Modal  open={open} onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    data-aos="flip-left"
    >
      <Box className="common-modal auth_container">
        <img className='close_modal'onClick={handleClose} src={closeModalIcon} alt="" />
        {renderForm()}
      </Box>
    </Modal>
  );
};

export default AuthModal;


