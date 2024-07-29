import React, { Component } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  FormHelperText,
} from "@mui/material";
import ProfileSideBar from "../profileSideBar";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  ErrorMessages,
  loginDetails,
  ValidationEngine,
} from "../../../Utills/helperFunctions";

const validationSchema = {
  name: [
    {
      message: "Please enter name",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
  email: [
    {
      message: "Please enter email",
      type: ValidationEngine.type.MANDATORY,
    },
    {
      message: "Please enter valid email",
      type: ValidationEngine.type.REGEX,
      regex: ValidationEngine.EMAIL_REGEX,
    },
  ],
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

class PersonalInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      mobileNumber: "",
      isSubmit: false,
      editInformation: false,
    };
  }
  componentDidMount() {
    let items = loginDetails();
    this.setState({
      name: items?.name,
    });
    debugger;
  }

  validateForm = () => {
    const { name, email, mobileNumber } = this.state;
    const error = ValidationEngine.validate(validationSchema, {
      name,
      email,
      mobileNumber,
    });
    return error;
  };

  handleValueChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;
    this.setState({ [name]: val });
  };

  handleSave = () => {
    const errorData = this.validateForm();
    this.setState({
      isSubmit: true,
    });
    if (errorData.isValid) {
    }
  };

  handleEditInformation = () => {
    const { editInformation, isSubmit } = this.state;
    this.setState({
      editInformation: !editInformation,
      isSubmit: false,
      name: loginDetails()?.name,
      email: loginDetails()?.email,
      mobileNumber: loginDetails()?.mobileNumber,
    });
  };

  render() {
    const errorData = this.validateForm();
    const { name, email, mobileNumber, isSubmit, editInformation } = this.state;
    return (
      <Box className="main-container">
        <Container>
          <Box className="profile-container">
            <Box className="profile-left">
              <ProfileSideBar />
            </Box>
            <Box className="profile-right">
              <Box className="heading">
                <h2>Personal Information</h2>
                <Button
                  className="edit-btn"
                  onClick={() => this.handleEditInformation()}
                >
                  {editInformation === true ? (
                    <>Cancel</>
                  ) : (
                    <>
                      <EditOutlinedIcon /> edit
                    </>
                  )}
                </Button>
              </Box>
              <Box className="profile-forms">
                <Box className="textfield">
                  <label>Name</label>
                  <TextField
                    className="input"
                    variant="standard"
                    fullWidth
                    disabled={!editInformation}
                    name="name"
                    value={name}
                    type="text"
                    placeholder="Yahiya Ali Khan"
                    onChange={this.handleValueChange}
                    error={!errorData.name.isValid && isSubmit}
                  />
                  {isSubmit && (
                    <FormHelperText error>
                      {errorData?.name?.message}
                    </FormHelperText>
                  )}
                </Box>
                <Box className="textfield">
                  <label className="d-block">Email</label>
                  <TextField
                    className="input"
                    variant="standard"
                    fullWidth
                    name="email"
                    disabled={!editInformation}
                    value={email}
                    type="text"
                    placeholder="Yahiyaalikhan@example.com"
                    onChange={this.handleValueChange}
                    error={!errorData.email.isValid && isSubmit}
                  />
                  {isSubmit && (
                    <FormHelperText error>
                      {errorData?.email?.message}
                    </FormHelperText>
                  )}
                </Box>
                <Box className="textfield">
                  <label className="d-block">Contact</label>
                  <TextField
                    className="input"
                    variant="standard"
                    fullWidth
                    disabled={!editInformation}
                    name="mobileNumber"
                    value={mobileNumber}
                    type="text"
                    placeholder="+919090541111"
                    onChange={this.handleValueChange}
                    error={!errorData.mobileNumber.isValid && isSubmit}
                  />
                  {isSubmit && (
                    <FormHelperText error>
                      {errorData?.mobileNumber?.message}
                    </FormHelperText>
                  )}
                </Box>
                {editInformation === true && (
                  <Button
                    className="common-btn change-password-btn"
                    variant="contained"
                    onClick={() => this.handleSave()}
                  >
                    Save
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default PersonalInformation;
