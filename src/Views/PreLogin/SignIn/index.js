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
import { connect } from "react-redux"
import status from "../../../Redux/Constants";
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
            isSubmit: false

        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.loginData.status !==
            this.props.loginData.status &&
            this.props.loginData.status === status.SUCCESS &&
            this.props.loginData.data
        ) {
            localStorage.setItem('login', JSON.stringify(this.props.loginData.data));
            this.setState({
                mobileNumber: "",
                password: "",
                isSubmit: false
            })

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
        const { mobileNumber, password } = this.state

        const errorData = this.validateForm();
        this.setState({
            isSubmit: true
        })
        if (errorData.isValid) {
            this.props.signIn({
                mobileNumber,
                password
            })
        }

    }

    render() {
        const errorData = this.validateForm();
        const { mobileNumber, password } = this.state
        return (
            <Box className="signin-container">
                <Container>
                    <Box
                        className="signin-form-container d-flex justify-content-center"
                        data-aos="zoom-in-right"
                    >
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
                                        name="mobileNumber"
                                        value={mobileNumber}
                                        onChange={this.handleValueChange}
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
                                        name="password"
                                        value={password}
                                        onChange={this.handleValueChange}

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
                                    onClick={() => this.handleSignIn()}
                                >
                                    Login
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
    return { loginData };
}

const mapDispatchToProps = { signIn };

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
