import React, { Component } from "react";
import { Box, Button, Container, CircularProgress, Modal } from "@mui/material";
import ProfileSideBar from "../profileSideBar";
import { connect } from "react-redux";
import Deleteicon from "../../../../assets/img/trash-2.png";
import Editicon from "../../../../assets/img/editicon.svg";
import {
  fetchDefaultAddress,
  getAllAddress,
  deleteAddress,
} from "../../../../Redux/Address/AddressThunk";
import status from "../../../../Redux/Constants";
import { loginDetails, Loader } from "../../../Utills/helperFunctions";
import AddAddressModal from "../../../../components/AddressModal/addaddressmodal";

class ManageAddresses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitAddress: false, 
      openDeleteModal: false,
      addressToDelete: null,
      addressToEdit: null, 
            isDeleting: false, 
    };
  }

  componentDidMount() {
    this.refreshAddresses();
  }

  refreshAddresses = () => {
    const loginData = loginDetails();
    const userId = loginData?.userId;
    if (userId) {
      this.props.getAllAddress({ userId }).then(() => {});
    } else {
      console.error("User ID not found in login details.");
    }
  };

  handleDeleteClick = (addressId) => {
    this.setState({ openDeleteModal: true, addressToDelete: addressId });
  };

  handleDeleteModalClose = (closeParentModal = false) => {
    this.setState({ openDeleteModal: false, addressToDelete: null });
    if (closeParentModal && this.props.handleClose) {
      this.props.handleClose();
    }
  };

  handleConfirmDelete = () => {
    const { addressToDelete } = this.state;
    const loginData = loginDetails();
    const userId = loginData?.userId;
    if (userId && addressToDelete) {
      this.setState({ isDeleting: true });
      this.props
        .deleteAddress({ userId, addressId: addressToDelete })
        .then(() => {
          this.setState({
            openDeleteModal: false,
            addressToDelete: null,
            isDeleting: false,
          });
          if (this.props.handleClose) {
            this.props.handleClose();
          }
          this.refreshAddresses();
        })
        .catch((error) => {
          this.setState({ isDeleting: false });
          console.error("Failed to delete address:", error);
        });
    } else {
      console.error("User ID or address ID is missing.");
    }
  };

  handleEditClick = (address) => {
    this.setState({
      addressToEdit: address,
      submitAddress: true,
    });
  };

  handleModalClose = () => {
    this.setState({ submitAddress: false, addressToEdit: null }, () => {
      this.refreshAddresses();
    });
  };

  render() {
    const { allAddressData } = this.props;
    const { submitAddress, openDeleteModal, addressToEdit, isDeleting } =
      this.state;
    const { defaultAddressId, addresses } = allAddressData || {};

    if (!addresses || addresses.length === 0) return null;

    const defaultAddress = addresses.find(
      (address) => address.addressId === defaultAddressId
    );
    const otherAddresses = addresses.filter(
      (address) => address.addressId !== defaultAddressId
    );

    return (
      <Box className="main-container">
        <Container>
          <Box className="profile-container">
            <ProfileSideBar />
            {this.props.allAddressData?.status === status.IN_PROGRESS ? (
              Loader.commonLoader()
            ) : (
              <Box className="profile-right">
                <Box className="heading">
                  <h2>Address Book</h2>
                  <Button
                    className="common-btn address-btn"
                    variant="contained"
                    onClick={() =>
                      this.setState({
                        submitAddress: true,
                        addressToEdit: null,
                      })
                    }
                  >
                    + Add Address
                  </Button>
                </Box>
                {defaultAddress && (
                  <Box className="manageaddressmodal">
                    <Box className="manageaddress-info">
                      <h3>
                        {defaultAddress.address_type}
                        <div
                          className="roundDiv"
                          style={{ marginLeft: "10px" }}
                        >
                          Default
                        </div>
                      </h3>{" "}
                      <p>{defaultAddress.name}</p>
                      <span>
                        {defaultAddress.house_number},{" "}
                        {defaultAddress.landmark_area}, {defaultAddress.address}
                        , {defaultAddress.zipCode}
                      </span>
                    </Box>
                    <Box className="manageaddress-icons">
                      <img
                        src={Editicon}
                        alt="Edit"
                        className="manageaddressicons"
                        onClick={() => this.handleEditClick(defaultAddress)}
                      />
                    </Box>
                  </Box>
                )}
                {otherAddresses.length > 0 &&
                  otherAddresses.map((address) => (
                    <Box className="manageaddressmodal" key={address.addressId}>
                      <Box className="manageaddress-info">
                        <h3>{address.address_type}</h3>
                        <p>{address.name}</p>
                        <span>
                          {address.house_number}, {address.landmark_area},{" "}
                          {address.address}, {address.zipCode}
                        </span>
                      </Box>
                      <Box className="manageaddress-icons">
                        <img
                          src={Deleteicon}
                          alt="Delete"
                          className="deleteiconn"
                          onClick={() =>
                            this.handleDeleteClick(address.addressId)
                          }
                        />
                        <img
                          src={Editicon}
                          alt="Edit"
                          className="manageaddressicons"
                          onClick={() => this.handleEditClick(address)}
                        />
                      </Box>
                    </Box>
                  ))}
              </Box>
            )}
          </Box>
        </Container>

        <AddAddressModal
          open={submitAddress}
          handleClose={this.handleModalClose}
          addressData={addressToEdit}
        />

        <Modal
          open={openDeleteModal}
          onClose={() => this.handleDeleteModalClose(false)}
        >
          <Box className="common-modal deletemodal">
            <Box className="delete-text">Confirm Deletion</Box>
            <Box className="delete-subtext">
              Are you sure you want to delete this address?
            </Box>
            <Box className="buttongap">
              <button
                onClick={() => this.handleDeleteModalClose(false)}
                className="cancelbutton"
              >
                Cancel
              </button>
              <button
                onClick={this.handleConfirmDelete}
                className="confirmbutton"
                disabled={isDeleting}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Confirm
                {isDeleting && (
                  <CircularProgress size={20} style={{ marginLeft: "4px" }} />
                )}
              </button>
            </Box>
          </Box>
        </Modal>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  allAddressData: state.alladdress.allAddress?.data || {},
});

const mapDispatchToProps = (dispatch) => ({
  getAllAddress: (params) => dispatch(getAllAddress(params)),
  deleteAddress: (params) => dispatch(deleteAddress(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageAddresses);
