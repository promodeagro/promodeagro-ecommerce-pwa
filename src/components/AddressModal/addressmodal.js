import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Modal } from "@mui/material";
import Deleteicon from "../../assets/img/trash-2.png";
import Editicon from "../../assets/img/editicon.svg";
import { getAllAddress, deleteAddress, setDefaultAddress } from "../../Redux/Address/AddressThunk";
import { loginDetails } from "Views/Utills/helperFunctions";
import AddAddressModal from "./addaddressmodal";

class AddressModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitAddress: false,  // For adding a new address
      openDeleteModal: false,  // For confirming delete
      addressToDelete: null,
      addressToEdit: null,  // Store the address data to be edited
    };
  }

  componentDidMount() {
    const { getAllAddress } = this.props;
    const loginData = loginDetails();
    const userId = loginData?.userId;
    if (userId) {
      getAllAddress({ userId }).then((response) => {});
    } else {
      console.error("User ID not found in login details.");
    }
  }
  

  handleDeleteClick = (addressId) => {
    this.setState({ openDeleteModal: true, addressToDelete: addressId });
  };

  handleDeleteModalClose = (closeParentModal = false) => {
    this.setState({ openDeleteModal: false, addressToDelete: null });
    if (closeParentModal) {
      this.props.handleClose(); // Close the parent modal (AddressModal)
    }
  };

  handleConfirmDelete = () => {
    const { addressToDelete } = this.state;
    const loginData = loginDetails();
    const userId = loginData?.userId;

    if (userId && addressToDelete) {
      this.props
        .deleteAddress({
          userId: userId,
          addressId: addressToDelete,
        })
        .then(() => {
          this.setState({ openDeleteModal: false, addressToDelete: null });
          this.props.handleClose(); // Close the AddressModal after deletion
        })
        .catch((error) => {
          console.error("Failed to delete address:", error);
        });
    } else {
      console.error("User ID or address ID is missing.");
    }
  };

  handleEditClick = (address) => {
    this.setState({
      addressToEdit: address, // Set the address data to be edited
      submitAddress: true, // Open the AddAddressModal
    });
  };

  handleSetDefaultAddress = (addressId) => {
    const loginData = loginDetails();
    const userId = loginData?.userId;
  
    if (userId && addressId) {
      this.props
        .setDefaultAddress({
          userId: userId,
          addressId: addressId,
        })
        .then(() => {
          console.log("Default address set successfully!");
          
          // Find the new default address details
          const newDefaultAddress = this.props.allAddressData.addresses.find(
            (address) => address.addressId === addressId
          );
  
          // Update localStorage
          localStorage.setItem("defaultAddress", JSON.stringify(newDefaultAddress));
          
          // Optional: Close the modal
          this.props.handleClose();
        })
        .catch((error) => {
          console.error("Failed to set default address:", error);
        });
    } else {
      console.error("User ID or address ID is missing.");
    }
  };
  
  render() {
    const { open, allAddressData, handleClose } = this.props;
    const { submitAddress, openDeleteModal, addressToEdit } = this.state;
    const { defaultAddressId, addresses } = allAddressData || {};
    if (!addresses || addresses.length === 0) return null;
    const defaultAddress = addresses.find(
      (address) => address.addressId === defaultAddressId
    );
    const otherAddresses = addresses.filter(
      (address) => address.addressId !== defaultAddressId
    );

    return open ? (
      <div className="address_modal_par">
        <div className="address-modal-bg" onClick={handleClose}></div>
        <Box className="address-modal" onClose={handleClose}>
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
                  onClick={() => this.setState({ submitAddress: true })}
                >
                  + Add Address
                </button>
              </Box>
            </Box>
          </Box>
          <Box className="addressmainbox">
            <Box className="addressbox" variant="contained" fullWidth>
              <span className="iconcontainer1">
                <span>
                  <span className="underlinetext">{defaultAddress.address_type}</span>
                  <span className="roundDiv">Default</span>
                </span>
                <span className="iconcontainer2">
                  <img
                    src={Deleteicon}
                    alt="Delete"
                    className="icons"
                    onClick={() =>
                      this.handleDeleteClick(defaultAddress.addressId)
                    }
                  />
                  <img
                    src={Editicon}
                    alt="Edit"
                    className="icons"
                    onClick={() => this.handleEditClick(defaultAddress)} // Open for edit
                  />
                </span>
              </span>
              <div style={{ marginTop: "8px" }}>
                {defaultAddress.house_number} {defaultAddress.landmark_area} {defaultAddress.address}, {defaultAddress.zipCode}
              </div>
            </Box>
            <Box className="alladdressbox">
              {otherAddresses.length > 0 ? (
                otherAddresses.map((address) => (
                  <a key={address.addressId} className="address-item"   onClick={() => this.handleSetDefaultAddress(address.addressId)}
>
                    <Box className="iconcontainer1">
                      <span>
                        <span className="underlinetext">
                          {address.address_type || "No address type"}
                        </span>
                      </span>
                      <Box className="iconcontainer2">
                        <img
                          src={Deleteicon}
                          alt="Delete"
                          className="icons"
                          onClick={() =>
                            this.handleDeleteClick(address.addressId)
                          }
                        />
                        <img
                          src={Editicon}
                          alt="Edit"
                          className="icons"
                          onClick={() => this.handleEditClick(address)} // Open for edit
                        />
                      </Box>
                    </Box>
                    <Box sx={{ marginTop: "8px" }}>
                      {address.house_number} {address.landmark_area} {address.address}, {address.zipCode}
                    </Box>
                  </a>
                ))
              ) : (
                <></>
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
        </Box>
        <AddAddressModal
          open={submitAddress}
          handleClose={() => {
            this.setState({ submitAddress: false, addressToEdit: null });
            this.props.handleClose(); // Close the parent AddressModal
          }}
          addressData={addressToEdit} // Pass the data for prefill
        />
        <Modal
          open={openDeleteModal}
          onClose={() => this.handleDeleteModalClose(true)}
        >
          <Box className="common-modal deletemodal">
            <Box className="delete-text">Confirm Deletion</Box>
            <Box className="delete-subtext">
              Are you sure you want to delete this address?
            </Box>
            <Box className="buttongap">
              <button
                onClick={() => this.handleDeleteModalClose(true)}
                variant="outlined"
                className="cancelbutton"
              >
                Cancel
              </button>
              <button
                onClick={this.handleConfirmDelete}
                className="confirmbutton"
                variant="contained"
              >
                Confirm
              </button>
            </Box>
          </Box>
        </Modal>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  allAddressData: state.alladdress.allAddress?.data || {},
});

const mapDispatchToProps = (dispatch) => ({
  getAllAddress: (params) => dispatch(getAllAddress(params)),
  deleteAddress: (params) => dispatch(deleteAddress(params)),
  setDefaultAddress: (params) => dispatch(setDefaultAddress(params)),

});

export default connect(mapStateToProps, mapDispatchToProps)(AddressModal);
