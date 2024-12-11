import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Box, Grid, TextField, CircularProgress } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { ValidationEngine } from "Views/Utills/helperFunctions";
import Homeicon from "../../assets/img/homeicon.png";
import Workicon from "../../assets/img/workicon.png";
import Othericon from "../../assets/img/othericon.png";
import { postAddress } from "../../Redux/Address/AddressThunk";
import { loginDetails } from "Views/Utills/helperFunctions";

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
    };
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
      const { fullName, flatNumber, landmark, phone, area, pincode, selectedAddressType } = this.state;
  
      // Get userId from loginDetails
      const loginData = loginDetails(); // Fetch login data from localStorage
      const userId = loginData ? loginData.userId : null; // Get userId from login details
  
      // Check if userId exists
      if (!userId) {
        // Handle missing userId error (e.g., show a message or handle accordingly)
        console.error("User ID is missing.");
        return;
      }
  
      // Mapping the request body as per the required key names
      const requestBody = {
        userId: userId, // User ID from login details
        address: {
          name: fullName,                // Full name
          address: area,                 // Area/Locality
          phoneNumber: phone,            // Phone number
          landmark_area: landmark,       // Landmark
          zipCode: pincode,              // Pincode
          house_number: flatNumber,      // House number (Flat No./House No./Building No.)
          address_type: selectedAddressType, // Add address type (Home, Work, Other)

        },
      };
  
      this.setState({ isSubmitting: true });
  
      try {
        // Assuming `this.props.postAddress` is the async thunk to make the API call
        await this.props.postAddress(requestBody);
        this.setState({ isSubmitting: false });
        this.props.handleClose(); // Close modal on success
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
    } = this.state;
    const { selectedAddressType } = this.state;

    return (
      <Modal open={open} onClose={handleClose}>
        <Box className="common-modal newaddressmodal">
          <span className="address-text">Add Address</span>
          <p className="saveaddressas">Save Address As</p>
          <div className="iconcontainer">
            <a className="icons-wrapper">
              <img src={Homeicon} alt="Home" className="icon" />
              <a
                className="icontext"
                onClick={() => this.handleAddressTypeSelection("Home")}
                style={{
                  color: selectedAddressType === "Home" ? "#1F9151" : "gray",
                  fontWeight: selectedAddressType === "Home" ? "600" : "400",
                }}
              >
                Home
              </a>
            </a>
            <a className="icons-wrapper">
              <img src={Workicon} alt="Work" className="icon" />
              <a
                className="icontext"
                onClick={() => this.handleAddressTypeSelection("Work")}
                style={{
                  color: selectedAddressType === "Work" ? "#1F9151" : "gray",
                  fontWeight: selectedAddressType === "Work" ? "600" : "400",
                }}
              >
                Work
              </a>
            </a>
            <a className="icons-wrapper">
              <img src={Othericon} alt="Other" className="icon" />
              <a
                className="icontext"
                onClick={() => this.handleAddressTypeSelection("Other")}
                style={{
                  color: selectedAddressType === "Other" ? "#1F9151" : "gray",
                  fontWeight: selectedAddressType === "Other" ? "600" : "400",
                }}
              >
                Other
              </a>
            </a>
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
                  variant="outlined"
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
                  variant="outlined"
                />
              </Box>
              <Box className="labelform">
                <span className="para">Landmark</span>
                <TextField
                  fullWidth
                  value={landmark}
                  onChange={(e) => this.setState({ landmark: e.target.value })}
                  variant="outlined"
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
                  variant="outlined"
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
                  variant="outlined"
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
                  variant="outlined"
                />
              </Box>
            </Grid>
          </Grid>
          <Box className="checkbox">
            <span>
              <Checkbox color="success" />
            </span>
            <span>Set this Address as default</span>
          </Box>
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
  postAddress: (data) => dispatch(postAddress(data)),
});

export default connect(null, mapDispatchToProps)(AddAddressModal);
