import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Box, Grid, TextField, CircularProgress } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { ValidationEngine } from "Views/Utills/helperFunctions";
import Homeicon from "../../../../../assets/img/homeicon.png";
import Workicon from "../../../../../assets/img/workicon.png";
import Othericon from "../../../../../assets/img/othericon.png";
import {
  updateAddress,
  postAddress,
  setDefaultAddress,
  fetchDefaultAddress,
} from "../../../../../Redux/Address/AddressThunk"; // Import the setDefaultAddress action
import { loginDetails } from "Views/Utills/helperFunctions";
import BackArrow from "../../../../../assets/img/backArrow.svg";
import Checkmark from "../../../../../assets/img/check_mark.png";

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
      type: ValidationEngine.type.MANDATORY,
      message: "Phone number is required.",
    },
    {
      type: ValidationEngine.type.REGEX,
      regex: ValidationEngine.MOBILE_NUMBER_REGEX,
      message: "Enter a valid 10-digit phone number.",
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
      type: ValidationEngine.type.MANDATORY,
      message: "Pincode is required.",
    },
    {
      type: ValidationEngine.type.REGEX,
      regex: ValidationEngine.ZIP_CODE_REGEX,
      message: "Enter a valid 6-digit pincode.",
    },
  ],
  selectedAddressType: [
    {
      message: "Please select a delivery type",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
};

class AddNewAddressessModal extends Component {
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
      selectedAddressType: "Home", // Set "Home" as the default selected address type
      addressId: "",
      initialLoad: true, // Ensures props are loaded only once
      isDefaultChecked: false, // To track if the checkbox is checked
      validationErrors: {},
      isDefaultAddressPresent: false,
      showBox2: false, // Controls which box is shown

    };
  }

  componentDidMount() {
    const defaultAddress = JSON.parse(localStorage.getItem("defaultAddress"));
    this.setState({
      isDefaultAddressPresent: !!defaultAddress, // true if a default address exists
      isDefaultChecked: !defaultAddress,
    });

    // Log the received address data from navigation state if available
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.address
    ) {
      console.log(
        "Received address from state:",
        this.props.location.state.address
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.addressData !== this.props.addressData) {
      console.log("Updated Props Received:", this.props.addressData);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("Next Props Address Data:", nextProps.addressData);
    console.log("Previous State:", prevState);

    const addressData =
      nextProps.addressData ||
      (nextProps.location &&
        nextProps.location.state &&
        nextProps.location.state.address);

    if (addressData && prevState.initialLoad) {
      return {
        fullName: addressData.name || "",
        flatNumber: addressData.house_number || "",
        landmark: addressData.landmark_area || "",
        phone: addressData.phoneNumber || "",
        area: addressData.address || "",
        pincode: addressData.zipCode || "",
        selectedAddressType: addressData.address_type || "Home",
        addressId: addressData.addressId || "",
        initialLoad: false,
      };
    }
    return null;
  }

  handleAddressTypeSelection = (type) => {
    this.setState({
      selectedAddressType: type,
    });
  };

  handleAddressSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors } = this.validateForm(); // Validate form
    if (!isValid) {
      console.log("Validation failed:", errors);
      return; // Stop submission if invalid
    }
  
    const {
      fullName,
      flatNumber,
      landmark,
      phone,
      area,
      pincode,
      selectedAddressType,
      isDefaultChecked,
      isDefaultAddressPresent,
      addressId,
    } = this.state;
    const loginData = loginDetails(); // Retrieve login details
    const userId = loginData?.userId;
  
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
      let response = null;
  
      if (addressId) {
        requestBody.addressId = addressId;
        response = await this.props.updateAddress(requestBody);
        console.log("Update Address API Response:", response);
      } else {
        response = await this.props.postAddress(requestBody);
        const newAddressId = response?.payload?.addressId;
  
        if (!newAddressId) {
          console.error("Address ID is missing in the response:", response);
          this.setState({ isSubmitting: false });
          return;
        }
  
        console.log("Post Address API Response Address ID:", newAddressId);
  
        if (isDefaultChecked || !isDefaultAddressPresent) {
          await this.props.setDefaultAddress({
            userId,
            addressId: newAddressId,
          });
  
          const fetchDefaultAddressResponse =
            await this.props.fetchDefaultAddress(userId);
          if (fetchDefaultAddressResponse?.payload) {
            const newDefaultAddress = fetchDefaultAddressResponse.payload;
            if (newDefaultAddress) {
              localStorage.setItem(
                "defaultAddress",
                JSON.stringify(newDefaultAddress)
              );
            }
          } else {
            console.error("Failed to fetch the default address.");
          }
        }
      }
      if (response && response.payload) {
        this.setState({ showBox2: true, isSubmitting: false }, () => {
          setTimeout(() => {
            window.location.reload();
          }, 3000); 
        });
      }
       else {
        console.error("API response failed:", response);
        this.setState({ isSubmitting: false });
      }
    } catch (error) {
      console.error("Error in API call:", error);
      this.setState({ isSubmitting: false });
    }
  };
  
  validateForm = () => {
    const {
      fullName,
      flatNumber,
      landmark,
      phone,
      area,
      pincode,
      selectedAddressType,
    } = this.state;
    const errors = {};
    Object.keys(addressValidationSchema).forEach((field) => {
      const fieldValidators = addressValidationSchema[field];
      fieldValidators.forEach((validator) => {
        if (
          validator.type === ValidationEngine.type.MANDATORY &&
          !this.state[field]
        ) {
          if (!errors[field]) errors[field] = validator.message;
        }
        if (
          validator.type === ValidationEngine.type.REGEX &&
          this.state[field] &&
          !validator.regex.test(this.state[field])
        ) {
          errors[field] = validator.message;
        }
      });
    });

    const isValid = Object.keys(errors).length === 0;
    this.setState({ validationErrors: errors });
    return {
      isValid,
      errors,
    };
  };

  render() {
    const {
      fullName,
      flatNumber,
      landmark,
      phone,
      area,
      pincode,
      isSubmitting,
      selectedAddressType,
      isDefaultAddressPresent,
      isDefaultChecked,
      validationErrors,
    } = this.state;

    return (
      <Box className="main-container">
              {this.state.showBox2 ? (
      <Box
      className="box2container"
    >
      <img src={Checkmark} alt="Checkmark" style={{ width: "50px", height: "50px", marginBottom: "10px" }} />
      <p>Your Address has been Saved!</p>
    </Box>
    
      ) : (

        <Box className="containeradddress">
          <Box className="headerboxoftheaddress">
            <div style={{ display: "flex", gap: "8px" }}>
              <img
                src={BackArrow}
                alt="Back"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.location.reload();
                }}
              />
              <h2>Address Book</h2>
            </div>
            <Box sx={{ marginTop: "8px" }}>
              <button
                className="smallbutton"
                type="submit"
                onClick={this.handleAddressSubmit}
                disabled={isSubmitting}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px 16px",
                }}
              >
                Save
                {isSubmitting && (
                  <CircularProgress
                    color="success"
                    size={20}
                    style={{ marginLeft: "4px" }}
                  />
                )}
              </button>
            </Box>
          </Box>
          <div className="iconcontainer">
            {["Home", "Work", "Other"].map((type) => (
              <button
                key={type}
                className="button1"
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
                />
                <span
                  className="icontext"
                  style={{
                    color:
                      selectedAddressType === type
                        ? "#1F9151"
                        : validationErrors?.selectedAddressType
                        ? "red"
                        : "gray",
                    fontWeight: selectedAddressType === type ? "600" : "400",
                  }}
                >
                  {type}
                </span>
              </button>
            ))}
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box className="labelform">
                <span className="para">
                  Full Name<p className="para1">*</p>
                </span>
                <TextField
                  fullWidth
                  value={this.state.fullName}
                  onChange={(e) =>
                    this.setState({
                      fullName: e.target.value,
                      validationErrors: {
                        ...this.state.validationErrors,
                        fullName: "",
                      },
                    })
                  }
                  error={!!this.state.validationErrors?.fullName}
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
                    this.setState({
                      flatNumber: e.target.value,
                      validationErrors: {
                        ...validationErrors,
                        flatNumber: "",
                      },
                    })
                  }
                  error={!!validationErrors?.flatNumber}
                />
              </Box>
              <Box className="labelform">
                <span className="para">
                  Landmark<p className="para1">*</p>
                </span>
                <TextField
                  fullWidth
                  value={landmark}
                  onChange={(e) =>
                    this.setState({
                      landmark: e.target.value,
                      validationErrors: {
                        ...validationErrors,
                        landmark: "",
                      },
                    })
                  }
                  error={!!validationErrors?.landmark}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box className="labelform">
                <span className="para">
                  Phone No.<p className="para1">*</p>
                </span>
                <TextField
                  fullWidth
                  value={phone}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                  onChange={(e) =>
                    this.setState({
                      phone: e.target.value,
                      validationErrors: {
                        ...validationErrors,
                        phone: "",
                      },
                    })
                  }
                  onBlur={() => {
                    const phoneValue = phone;
                    const errors = ValidationEngine.validate(
                      addressValidationSchema,
                      { phone: phoneValue }
                    );
                    this.setState({
                      validationErrors: {
                        ...validationErrors,
                        phone: errors?.phone?.message || "",
                      },
                    });
                  }}
                  error={!!validationErrors?.phone}
                  helperText={validationErrors?.phone || ""}
                />
              </Box>
              <Box className="labelform">
                <span className="para">
                  Area/Locality<p className="para1">*</p>
                </span>
                <TextField
                  fullWidth
                  value={area}
                  onChange={(e) =>
                    this.setState({
                      area: e.target.value,
                      validationErrors: {
                        ...validationErrors,
                        area: "",
                      },
                    })
                  }
                  error={!!validationErrors?.area}
                />
              </Box>
              <Box className="labelform">
                <span className="para">
                  Pincode<p className="para1">*</p>
                </span>
                <TextField
                  fullWidth
                  value={pincode}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                  onChange={(e) =>
                    this.setState({
                      pincode: e.target.value,
                      validationErrors: {
                        ...validationErrors,
                        pincode: "",
                      },
                    })
                  }
                  onBlur={() => {
                    const pincodeValue = pincode;
                    const errors = ValidationEngine.validate(
                      addressValidationSchema,
                      { pincode: pincodeValue }
                    );
                    this.setState({
                      validationErrors: {
                        ...validationErrors,
                        pincode: errors?.pincode?.message || "",
                      },
                    });
                  }}
                  error={!!validationErrors?.pincode}
                  helperText={validationErrors?.pincode || ""}
                />
              </Box>
            </Grid>
          </Grid>
          {!this.state.addressId && (
            <>
              <Checkbox
                checked={isDefaultChecked}
                color="success"
                onChange={() =>
                  this.setState({ isDefaultChecked: !isDefaultChecked })
                }
              />
              <span className="checkboxspan">Set this Address as default</span>
            </>
          )}
        </Box>
              )}

      </Box>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateAddress: (data) => dispatch(updateAddress(data)),
  postAddress: (data) => dispatch(postAddress(data)),
  setDefaultAddress: (data) => dispatch(setDefaultAddress(data)),
  fetchDefaultAddress: (params) => dispatch(fetchDefaultAddress(params)),
});

export default connect(null, mapDispatchToProps)(AddNewAddressessModal);
