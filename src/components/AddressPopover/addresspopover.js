import React, { Component } from "react";
import { Popover, Box, Button } from "@mui/material";
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
    const { open, anchorEl, currentAddress } = this.props; // Destructure currentAddress from props
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
        <Box sx={{ width: 500, padding: 2, maxWidth: "100%" }}>
          <form onSubmit={this.handleAddressSubmit}>
            <Box>
              <Box className="header-box">
                <Box className="address-text">
                  Select a Location for Delivery
                  <Box className="address-subtext">
                    Choose your address location to see delivery options
                  </Box>
                </Box>
                <Box className="button-container">
                  <button
                    variant="contained"
                    className="smallbutton"              
                  >
                    + Add Address
                  </button>
                </Box>
              </Box>
            </Box>
          </form>
          <Box className="addressmainbox">
            <Box className="addressbox" variant="contained" fullWidth>
            {currentAddress?.address || "No Address Set"} {/* Display the current address */}
            </Box>
            <Box className="addressbox" variant="contained" fullWidth>
              hjhjhj
            </Box>
          </Box>
        </Box>
      </Popover>
    );
  }
}

export default AddressPopover;
