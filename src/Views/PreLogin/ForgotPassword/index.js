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

import { ErrorMessages, ValidationEngine } from "../../Utills/helperFunctions";
import { forgotPassword } from "../../../Redux/ForgotPassword/ForgotPasswordThunk";
import addSymbol from "../../../assets/img/add-symbol.svg";

import { Link } from "react-router-dom";

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
    newPassword: [
        {
            message: "Please enter new password",
            type: ValidationEngine.type.MANDATORY,
        },
    ],
};

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: "",
            mobileNumber: "",
            password: "",
            isSubmit: false,
            newPassword: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.forgotPassData.status !== this.props.forgotPassData.status &&
            this.props.forgotPassData.status === status.SUCCESS &&
            this.props.forgotPassData.data

        ) {

            if (this.props.forgotPassData.data.response?.status === 400) {
                ErrorMessages.error(this.props.forgotPassData.data.response?.data?.message);
            }
            else
                if (this.props.forgotPassData.data) {
                    this.setState({
                        mobileNumber: "",
                        password: "",
                        newPassword: "",
                        isSubmit: false,
                    });

                    ErrorMessages.success(this.props.forgotPassData.data?.message);
                    this.props.navigate("/signin");
                }


        }


    }

    validateForm = () => {
        const { mobileNumber, password, newPassword } = this.state;
        const error = ValidationEngine.validate(validationSchema, {
            mobileNumber,
            password,
            newPassword,
        });
        return error;
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
        const { mobileNumber, password, newPassword } = this.state;

        const errorData = this.validateForm();
        this.setState({
            isSubmit: true,
        });
        if (errorData.isValid) {

            this.props.forgotPassword({
                mobileNumber: mobileNumber,
                oldPassword: password,
                newPassword: newPassword
            });
        }
    };

    render() {
        const errorData = this.validateForm();
        const { mobileNumber, password, isSubmit, newPasswords } = this.state;
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

                                <Box className="number-input">
                                    <label className="d-block">
                                        New Password <span className="validate-icon">*</span>
                                    </label>
                                    <TextField
                                        className="number-textfield"
                                        id="outlined-basic"
                                        variant="outlined"
                                        fullWidth
                                        name="newPassword"
                                        value={this.state.newPassword}
                                        type="password"
                                        onChange={this.handleValueChange}
                                        error={!errorData.newPassword.isValid && isSubmit}
                                    />
                                </Box>
                                {isSubmit && (
                                    <FormHelperText error>
                                        {errorData?.newPassword?.message}
                                    </FormHelperText>
                                )}

                                <Button
                                    variant="contained"
                                    fullWidth
                                    className="common-btn sign-up-btn"
                                    onClick={() => this.handleSignIn()}
                                    disabled={this.props.forgotPassData.status === status.IN_PROGRESS}
                                    endIcon={
                                        this.props.forgotPassData.status === status.IN_PROGRESS ? (
                                            <CircularProgress className="common-loader" />
                                        ) : (
                                            <></>
                                        )
                                    }
                                >
                                    Change Password
                                </Button>

                                <Box marginTop={"15px"}>
                                    <Link to={"/signin"}>Sign In</Link>
                                </Box>

                            </Box>
                        </Box>
                    </Box>
                </Container>

            </Box>
        );
    }
}

function mapStateToProps(state) {
    const { forgotPassData } = state.forgotpassword;

    return { forgotPassData, };
}

const mapDispatchToProps = { forgotPassword };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(navigateRouter(ForgotPassword));
