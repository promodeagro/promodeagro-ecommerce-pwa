import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Box, Grid, TextField, CircularProgress } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { ValidationEngine } from "Views/Utills/helperFunctions";
import Homeicon from "../../assets/img/homeicon.png";
import Workicon from "../../assets/img/workicon.png";
import Othericon from "../../assets/img/othericon.png";
import { updateAddress, postAddress } from "../../Redux/Address/AddressThunk";
import { loginDetails } from "Views/Utills/helperFunctions";
import closeModalIcon from "../../assets/img/closeModalIcon.svg"

const addressValidationSchema = {
  fullName: [
    {
      message: "Please enter your full name",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
  flatNumber: [
    {
      message: "Please enter your flat/house/building number",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
  landmark: [
    {
      message: "Please enter a landmark",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
  phone: [
    {
      message: "Please enter a phone number",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
  area: [
    {
      message: "Please enter your area/locality",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
  pincode: [
    {
      message: "Please enter your pincode",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
};

class AddAddressModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      flatNumber: "",
      landmark: "",
      phone: "",
      area: "",
      pincode: "",
      isSubmitting: false,
      selectedAddressType: "",
      addressId: "",
      initialLoad: true, // Ensures props are loaded only once
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.addressData &&
      prevState.initialLoad // Ensures this runs only on initial load
    ) {
      return {
        fullName: nextProps.addressData.name || "",
        flatNumber: nextProps.addressData.house_number || "",
        landmark: nextProps.addressData.landmark_area || "",
        phone: nextProps.addressData.phoneNumber || "",
        area: nextProps.addressData.address || "",
        pincode: nextProps.addressData.zipCode || "",
        selectedAddressType: nextProps.addressData.address_type || "",
        addressId: nextProps.addressData.addressId || "",
        initialLoad: false, // Disable further updates from props
      };
    }
    return null;
  }

  validateForm = () => {
    const { fullName, flatNumber, landmark, phone, area, pincode } = this.state;
    const error = ValidationEngine.validate(addressValidationSchema, {
      fullName,
      flatNumber,
      landmark,
      phone,
      area,
      pincode,
    });
    return error;
  };

  handleAddressSubmit = async (e) => {
    e.preventDefault();
    const errorData = this.validateForm();

    if (errorData.isValid) {
      const {
        fullName,
        flatNumber,
        landmark,
        phone,
        area,
        pincode,
        selectedAddressType,
        addressId,
      } = this.state;

      const loginData = loginDetails();
      const userId = loginData ? loginData.userId : null;

      if (!userId) {
        console.error("User ID is missing.");
        return;
      }

      const requestBody = {
        userId: userId,
        address: {
          name: fullName,
          address: area,
          phoneNumber: phone,
          landmark_area: landmark,
          zipCode: pincode,
          house_number: flatNumber,
          address_type: selectedAddressType,
        },
      };

      this.setState({ isSubmitting: true });

      try {
        if (addressId) {
          // Update existing address
          requestBody.addressId = addressId;
          await this.props.updateAddress(requestBody);
        } else {
          // Add new address
          await this.props.postAddress(requestBody);
        }
        this.setState({ isSubmitting: false });
        this.props.handleClose();
      } catch (error) {
        this.setState({ isSubmitting: false });
        console.error("Error submitting address:", error);
      }
    }
  };

  handleAddressTypeSelection = (type) => {
    this.setState({ selectedAddressType: type });
  };

  render() {
    const { open, handleClose } = this.props;
    const {
      fullName,
      flatNumber,
      landmark,
      phone,
      area,
      pincode,
      isSubmitting,
      selectedAddressType,
    } = this.state;

    return (
      <Modal open={open} onClose={handleClose}>
        <Box className="common-modal newaddressmodal">
          <div className='modalheader'>
          <h2>Add Address</h2>
      <img src={closeModalIcon} alt="Close Modal" onClick={handleClose} />
      </div>
          <p className="saveaddressas">Save Address As</p>
          <div className="iconcontainer">
            {["Home", "Work", "Other"].map((type) => (
              <a
                key={type}
                className="icons-wrapper"
                onClick={() => this.handleAddressTypeSelection(type)}
              >
                <img
                  src={
                    type === "Home"
                      ? Homeicon
                      : type === "Work"
                      ? Workicon
                      : Othericon
                  }
                  alt={type}
                  className="icon"
                />
                <span
                  className="icontext"
                  style={{
                    color: selectedAddressType === type ? "#1F9151" : "gray",
                    fontWeight: selectedAddressType === type ? "600" : "400",
                  }}
                >
                  {type}
                </span>
              </a>
            ))}
          </div>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box className="labelform">
                <span className="para">
                  Full Name<p className="para1">*</p>
                </span>

                <TextField
                  fullWidth
                  value={fullName}
                  onChange={(e) => this.setState({ fullName: e.target.value })}
                />
              </Box>

              <Box className="labelform">
                <span className="para">
                  Flat No./ House No./ Building No.<p className="para1">*</p>
                </span>

                <TextField
                  fullWidth
                  value={flatNumber}
                  onChange={(e) =>
                    this.setState({ flatNumber: e.target.value })
                  }
                />
              </Box>

              <Box className="labelform">
                <span className="para">Landmark</span>

                <TextField
                  fullWidth
                  value={landmark}
                  onChange={(e) => this.setState({ landmark: e.target.value })}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className="labelform">
                <span className="para">
                  Phone No.<p className="para1">*</p>
                </span>

                <TextField
                  fullWidth
                  value={phone}
                  onChange={(e) => this.setState({ phone: e.target.value })}
                />
              </Box>

              <Box className="labelform">
                <span className="para">
                  Area/Locality<p className="para1">*</p>
                </span>

                <TextField
                  fullWidth
                  value={area}
                  onChange={(e) => this.setState({ area: e.target.value })}
                />
              </Box>
              <Box className="labelform">
                <span className="para">
                  Pincode<p className="para1">*</p>
                </span>

                <TextField
                  fullWidth
                  value={pincode}
                  onChange={(e) => this.setState({ pincode: e.target.value })}
                />
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ marginTop: "16px" }}>
            {isSubmitting ? (
              <CircularProgress color="success" />
            ) : (
              <button
                variant="contained"
                className="smallbutton"
                type="submit"
                onClick={this.handleAddressSubmit}
              >
                Save
              </button>
            )}
          </Box>
        </Box>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateAddress: (data) => dispatch(updateAddress(data)),
  postAddress: (data) => dispatch(postAddress(data)),
});

export default connect(null, mapDispatchToProps)(AddAddressModal);
