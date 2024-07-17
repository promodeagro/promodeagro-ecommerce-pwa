import React, { Component } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  FormHelperText,
} from "@mui/material";
import ProfileSideBar from "../profileSideBar";
import {
  ErrorMessages,
  ValidationEngine,
} from "../../../Utills/helperFunctions";

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
                  onClick={() => this.handleChangePassword()}
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

export default ChangePassword;
