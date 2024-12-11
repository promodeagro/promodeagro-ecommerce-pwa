import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import Deleteicon from "../../assets/img/trash-2.png";
import Editicon from "../../assets/img/editicon.svg";
import {
  fetchDefaultAddress,
  getAllAddress,
} from "../../Redux/Address/AddressThunk";
import { loginDetails } from "Views/Utills/helperFunctions";
import AddAddressModal from "./addaddressmodal";

class AddressModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitAddress: false,
      allAddresses: [], // Add this to hold the fetched addresses
    };
  }

  componentDidMount() {
    const { fetchDefaultAddress, getAllAddress } = this.props;
    const loginData = loginDetails();
    const userId = loginData?.userId;
    if (userId) {
      fetchDefaultAddress(userId);
      getAllAddress({ userId }).then((response) => {
        if (response.payload) {
          this.setState({ allAddresses: response.payload.addresses }); // Extract addresses array
        }
      });
    } else {
      console.error("User ID not found in login details.");
    }
  }

  handleModalClose = () => {
    this.props.handleClose();
  };

  render() {
    const { open, defaultAddress } = this.props;
    const { submitAddress } = this.state;

    return open ? (
      <div className="address_modal_par">
        <div className="address-modal-bg" onClick={this.handleModalClose}></div>
        <Box className="address-modal">
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
                  type="button"
                  onClick={() => this.setState({ submitAddress: true })} // Show Add Address modal
                >
                  + Add Address
                </button>
              </Box>
            </Box>
          </Box>
          {!defaultAddress || defaultAddress?.status === "IN_PROGRESS" ? (
            <Box className="addressloader">
              <CircularProgress color="success" />
            </Box>
          ) : (
            <>
              <Box className="addressmainbox">
                <Box className="addressbox" variant="contained" fullWidth>
                  <span className="iconcontainer1">
                    <span>
                      <span className="underlinetext">Home</span>
                      <span className="roundDiv">Default</span>
                    </span>
                    <span className="iconcontainer2">
                      <img src={Deleteicon} alt="Delete" className="icons" />
                      <img src={Editicon} alt="Edit" className="icons" />
                    </span>
                  </span>
                  <div style={{ marginTop: "8px" }}>
                    {defaultAddress?.landmark_area}
                    {defaultAddress?.address || "No Address Set"},
                    {defaultAddress?.city}
                    {defaultAddress?.state} {defaultAddress?.zipCode}
                  </div>
                </Box>
                <Box className="alladdressbox">
                  {this.state.allAddresses.length > 0 ? (
                    this.state.allAddresses.map((address) => (
                      <Box key={address.addressId} className="address-item">
                        <Box className="iconcontainer1">
                          <span>
                            <span className="underlinetext">
                              {address.landmark_area || "No Landmark"}
                            </span>
                          </span>
                          <Box className="iconcontainer2">
                            <img
                              src={Deleteicon}
                              alt="Delete"
                              className="icons"
                            />
                            <img src={Editicon} alt="Edit" className="icons" />
                          </Box>
                        </Box>
                        <Box sx={{marginTop: '8px'}}>
                          {address.house_number} {address.address},
                          {address.zipCode}
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <div></div>
                  )}
                </Box>
              </Box>
              <span className="viewbutton">
                <button
                  variant="contained"
                  className="smallbutton1"
                  type="button"
                >
                  View Saved Address
                </button>
              </span>
            </>
          )}
        </Box>
        <AddAddressModal
          open={submitAddress}
          handleClose={() => this.setState({ submitAddress: false })}
        />
      </div>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  defaultAddress: state.alladdress.defaultAddressData?.data || null,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDefaultAddress: (userId) => dispatch(fetchDefaultAddress(userId)),
  getAllAddress: (params) => dispatch(getAllAddress(params)), // Dispatching getAllAddress
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressModal);
