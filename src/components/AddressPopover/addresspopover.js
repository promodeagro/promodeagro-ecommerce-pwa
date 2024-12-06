import React, { Component } from "react";
import {
  Popover,
  Box,
  TextField,
  Button,
  FormHelperText,
} from "@mui/material";
import { ValidationEngine } from "Views/Utills/helperFunctions"; // Assuming validation engine is imported
import CircularProgress from "@mui/material/CircularProgress";

const addressValidationSchema = {
  street: [
    {
      message: "Please enter street address",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
  city: [
    {
      message: "Please enter city",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
  zip: [
    {
      message: "Please enter zip code",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
};

class AddressPopover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      street: "",
      city: "",
      zip: "",
      isSubmitting: false,
      submitAddress: false,
    };
  }

  validateForm = () => {
    const { street, city, zip } = this.state;
    const error = ValidationEngine.validate(addressValidationSchema, {
      street,
      city,
      zip,
    });
    return error;
  };

  handleAddressSubmit = async (e) => {
    e.preventDefault();
    this.setState({ submitAddress: true });
    const errorData = this.validateForm();

    if (errorData.isValid) {
      this.setState({ isSubmitting: true });
      // Simulate saving address (you can handle actual address saving logic here)
      setTimeout(() => {
        this.setState({ isSubmitting: false });
        this.handlePopoverClose();
      }, 1500); // Simulating async behavior
    }
  };

  handlePopoverClose = () => {
    this.setState({
      street: "",
      city: "",
      zip: "",
      submitAddress: false,
    });
    this.props.handleClose();
  };

  render() {
    const { open, anchorEl } = this.props;
    const { street, city, zip, isSubmitting, submitAddress } = this.state;
    const errorData = this.validateForm();

    return (
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={this.handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box
          className=""
          sx={{
            width: 600,
            padding: 2,
            maxWidth: "100%",
          }}
        >
          <form onSubmit={this.handleAddressSubmit}>
            <Box>
              <Box>Select a Location for Delivery
              <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="common-btn"
                  disabled={isSubmitting}
                  endIcon={
                    isSubmitting ? (
                      <CircularProgress className="common-loader" />
                    ) : (
                      <></>
                    )
                  }
                >
                  {isSubmitting ? "Saving..." : "+ Add Address"}
                </Button>

              </Box>

                <Box className="input-box">
                  <label className="d-block">Street Address</label>
                  <TextField
                    value={street}
                    onChange={(e) => this.setState({ street: e.target.value })}
                    name="street"
                    placeholder="Street Address"
                    className="input-textfield"
                    variant="outlined"
                    fullWidth
                  />
                  {submitAddress && errorData?.street?.message && (
                    <FormHelperText error>
                      {errorData?.street?.message}
                    </FormHelperText>
                  )}
                </Box>
                <Box className="input-box">
                  <label className="d-block">City</label>
                  <TextField
                    value={city}
                    onChange={(e) => this.setState({ city: e.target.value })}
                    name="city"
                    placeholder="City"
                    className="input-textfield"
                    variant="outlined"
                    fullWidth
                  />
                  {submitAddress && errorData?.city?.message && (
                    <FormHelperText error>
                      {errorData?.city?.message}
                    </FormHelperText>
                  )}
                </Box>
                <Box className="input-box">
                  <label className="d-block">Zip Code</label>
                  <TextField
                    value={zip}
                    onChange={(e) => this.setState({ zip: e.target.value })}
                    name="zip"
                    placeholder="Zip Code"
                    className="input-textfield"
                    variant="outlined"
                    fullWidth
                  />
                  {submitAddress && errorData?.zip?.message && (
                    <FormHelperText error>
                      {errorData?.zip?.message}
                    </FormHelperText>
                  )}
                </Box>
              
            </Box>
          </form>
        </Box>
      </Popover>
    );
  }
}

export default AddressPopover;
