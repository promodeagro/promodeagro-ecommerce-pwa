import React, { Component } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import ProfileSideBar from "../profileSideBar";
import {
  ErrorMessages,
  ValidationEngine,
} from "../../../Utills/helperFunctions";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import { connect } from "react-redux";
import { forgotPassword } from "../../../../Redux/ForgotPassword/ForgotPasswordThunk";
import status from "../../../../Redux/Constants";
const validationSchema = {
  currentPassword: [
    {
      message: "Please enter current password",
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

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      isSubmit: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.forgotPassData.status !== this.props.forgotPassData.status &&
      this.props.forgotPassData.status === status.SUCCESS &&
      this.props.forgotPassData.data
    ) {
      if (this.props.forgotPassData.data.statusCode == 401) {
        ErrorMessages.error(this.props.forgotPassData.data.message);
        return;
      } else if (this.props.forgotPassData.data.statusCode == 200) {
        ErrorMessages.success(this.props.forgotPassData.data?.message);
        this.props.navigate("/signin");
      }
    }
  }

  validateForm = () => {
    const { currentPassword, newPassword } = this.state;
    const error = ValidationEngine.validate(validationSchema, {
      currentPassword,
      newPassword,
    });

    return error;
  };

  handleValueChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;
    this.setState({ [name]: val });
  };

  handleChangePassword = () => {
    const errorData = this.validateForm();
    this.setState({
      isSubmit: true,
    });
    if (errorData.isValid) {
      let mobileNumber = localStorage.getItem("curr_mobile");

      this.props.forgotPassword({
        mobileNumber: mobileNumber ? mobileNumber : "",
        oldPassword: this.state.currentPassword,
        newPassword: this.state.newPassword,
      });
    }
  };

  render() {
    const errorData = this.validateForm();
    const { currentPassword, newPassword, isSubmit } = this.state;
    return (
      <Box className="main-container">
        <Container>
          <Box className="profile-container">
            <Box className="profile-left">
              <ProfileSideBar />
            </Box>
            <Box className="profile-right">
              <Box className="heading">
                <h2>Change Password</h2>
              </Box>
              <Box className="profile-forms">
                <Box className="textfield">
                  <label>Current Password</label>
                  <TextField
                    className="input outlined"
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    name="currentPassword"
                    value={currentPassword}
                    type="password"
                    placeholder="enter current password"
                    onChange={this.handleValueChange}
                    error={!errorData.currentPassword.isValid && isSubmit}
                  />
                  {isSubmit && (
                    <FormHelperText error>
                      {errorData?.currentPassword?.message}
                    </FormHelperText>
                  )}
                </Box>

                <Box className="textfield">
                  <label>New Password</label>
                  <TextField
                    className="input outlined"
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    name="newPassword"
                    value={newPassword}
                    type="password"
                    placeholder="enter current password"
                    onChange={this.handleValueChange}
                    error={!errorData.newPassword.isValid && isSubmit}
                  />
                  {isSubmit && (
                    <FormHelperText error>
                      {errorData?.newPassword?.message}
                    </FormHelperText>
                  )}
                </Box>

                <Button
                  className="common-btn change-password-btn"
                  variant="contained"
                  disabled={this.props.forgotPassData.status === status.IN_PROGRESS}
                  onClick={() => this.handleChangePassword()}
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

  return { forgotPassData };
}

const mapDispatchToProps = { forgotPassword };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(ChangePassword));
