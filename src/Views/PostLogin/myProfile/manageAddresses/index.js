import React, { Component } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ProfileSideBar from "../profileSideBar";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  ErrorMessages,
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
  address: [
    {
      message: "Please enter address",
      type: ValidationEngine.type.MANDATORY,
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
  zipCode: [
    {
      message: "Please enter zip code",
      type: ValidationEngine.type.MANDATORY,
    },
    {
      message: "Please valid zip code",
      type: ValidationEngine.type.REGEX,
      regex: ValidationEngine.MOBILE_NUMBER_REGEX,
    },
  ],
};

class ManageAddresses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      mobileNumber: "",
      zipCode: "",
      isSubmit: false,
      addAddress: false,
    };
  }

  validateForm = () => {
    const { name, email, address, mobileNumber, zipCode } = this.state;
    const error = ValidationEngine.validate(validationSchema, {
      name,
      email,
      address,
      mobileNumber,
      zipCode,
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

  handleAddAddress = () => {
    const { addAddress, isSubmit } = this.state;
    this.setState({
      addAddress: !addAddress,
      isSubmit: false,
    });
  };

  render() {
    const errorData = this.validateForm();
    const {
      name,
      email,
      address,
      mobileNumber,
      zipCode,
      isSubmit,
      addAddress,
    } = this.state;
    return (
      <Box className="main-container">
        <Container>
          <Box className="profile-container">
            <Box className="profile-left">
              <ProfileSideBar />
            </Box>
            <Box className="profile-right">
              <Box className="heading">
                <h2>Manage Addresses</h2>
                <Button
                  className={
                    addAddress === true
                      ? "common-btn address-cancel-btn"
                      : "common-btn address-btn"
                  }
                  variant="contained"
                  onClick={() => this.handleAddAddress()}
                >
                  {addAddress === true ? <>Cancel</> : <>Add Address</>}
                </Button>
              </Box>
              {addAddress === true ? (
                <Box className="add-address-container">
                  <Grid container spacing={2} alignItems={"center"}>
                    <Grid item xs={12} lg={6} md={6} sm={6}>
                      <Box className="textfield">
                        <label>Name</label>
                        <TextField
                          className="input"
                          variant="outlined"
                          fullWidth
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
                    </Grid>
                    <Grid item xs={12} lg={6} md={6} sm={6}>
                      <Box className="textfield">
                        <label className="d-block">Email</label>
                        <TextField
                          className="input"
                          variant="outlined"
                          fullWidth
                          name="email"
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
                    </Grid>
                    <Grid item xs={12} lg={12} md={12} sm={12}>
                      <Box className="textfield">
                        <label className="d-block">Address</label>
                        <TextField
                          className="input"
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={4}
                          name="address"
                          value={address}
                          type="text"
                          placeholder="Address"
                          onChange={this.handleValueChange}
                          error={!errorData.address.isValid && isSubmit}
                        />
                        {isSubmit && (
                          <FormHelperText error>
                            {errorData?.address?.message}
                          </FormHelperText>
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={12} lg={6} md={6} sm={6}>
                      <Box className="textfield">
                        <label className="d-block">Contact</label>
                        <TextField
                          className="input"
                          variant="outlined"
                          fullWidth
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
                    </Grid>
                    <Grid item xs={12} lg={6} md={6} sm={6}>
                      <Box className="textfield">
                        <label className="d-block">Zip Code</label>
                        <TextField
                          className="input"
                          variant="outlined"
                          fullWidth
                          name="zipCode"
                          value={zipCode}
                          type="text"
                          placeholder="000000"
                          onChange={this.handleValueChange}
                          error={!errorData.zipCode.isValid && isSubmit}
                        />
                        {isSubmit && (
                          <FormHelperText error>
                            {errorData?.zipCode?.message}
                          </FormHelperText>
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={12} lg={6} md={6} sm={6}>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Make This Default Address"
                      />
                    </Grid>
                    <Grid item xs={12} lg={6} md={6} sm={6}>
                      <Button
                        className="common-btn save-address-btn"
                        variant="contained"
                        onClick={() => this.handleSave()}
                      >
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <Box className="address-container">
                  <Grid container spacing={4} alignItems={"center"}>
                    <Grid item xs={12} lg={4} md={6} sm={6}>
                      <Box className="address-card-container">
                        <Box className="d-flex align-items-center">
                          <IconButton aria-label="edit" className="address-btn">
                            <BorderColorIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            className="address-btn"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                        <h3 className="person-name">
                          Yahiya Ali Khan <span>Default</span>
                        </h3>
                        <address>
                          3 Saint Georges CtTrabuco Canyon, California CA, 92679
                        </address>
                        <Box className="d-block contact-number">
                          <span className="d-block contact-heading">
                            Contact
                          </span>
                          <Box className="d-flex align-items-center">
                            <span className="d-block title">Phone</span>
                            <span className="d-block details">
                              949-713-6462
                            </span>
                          </Box>
                          <Box className="d-flex align-items-center">
                            <span className="d-block title">Email</span>
                            <span className="d-block details">
                              Johndoe@mail.com
                            </span>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} lg={4} md={6} sm={6}>
                      <Box className="address-card-container">
                        <Box className="d-flex align-items-center">
                          <IconButton aria-label="edit" className="address-btn">
                            <BorderColorIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            className="address-btn"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                        <h3 className="person-name">Yahiya Ali Khan</h3>
                        <address>
                          3 Saint Georges CtTrabuco Canyon, California CA, 92679
                        </address>
                        <Box className="d-block contact-number">
                          <span className="d-block contact-heading">
                            Contact
                          </span>
                          <Box className="d-flex align-items-center">
                            <span className="d-block title">Phone</span>
                            <span className="d-block details">
                              949-713-6462
                            </span>
                          </Box>
                          <Box className="d-flex align-items-center">
                            <span className="d-block title">Email</span>
                            <span className="d-block details">
                              Johndoe@mail.com
                            </span>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default ManageAddresses;
