import React, { Component } from "react";
import {
  Box,
  Button,
  Container,
  CircularProgress,
  Modal
} from "@mui/material";
import ProfileSideBar from "../profileSideBar";
import { connect } from "react-redux";
import Deleteicon from "../../../../assets/img/trash-2.png";
import Editicon from "../../../../assets/img/editicon.svg";

import {
  ErrorMessages,
  Loader,
  ValidationEngine,
} from "../../../Utills/helperFunctions";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import {
  fetchDefaultAddress,
  getAllAddress,
  deleteAddress,
} from "../../../../Redux/Address/AddressThunk";
import status from "../../../../Redux/Constants";
import AddNewAddress from "./Components/AddNewAddress";
import { loginDetails } from "../../../Utills/helperFunctions";
import AddAddressModal from "../../../../components/AddressModal/addaddressmodal";

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
      addAddressModal: false,
      defaultAddressId: null, // Will store the default address ID
      allAddresses: [],
      deleteId: "",
      loaderStatus: false,
      open: false,
      addressId: "",
      submitAddress: false, // For adding or editing an address
      openDeleteModal: false, // For confirming delete
      addressToDelete: null,
      addressToEdit: null, // Store the address data to be edited
      isDeleting: false, // Add loading state for deletion
    };
  }

  componentDidMount() {
    this.setState({
      loaderStatus: true,
    });
    this.apiCalls();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.defaultAddressData?.status !==
        this.props?.defaultAddressData?.status &&
      this.props?.defaultAddressData?.status === status.SUCCESS &&
      this.props?.defaultAddressData?.data
    ) {
      this.setState({
        defaultAddressId: this.props?.defaultAddressData?.data?.addressId,
      });
    }

    if (
      prevProps.deleteAddresses?.status !==
        this.props?.deleteAddresses?.status &&
      this.props.deleteAddresses.status === status.SUCCESS
    ) {
      this.setState({
        deleteId: "",
        open: false,
      });
      this.apiCalls();
    }

    if (
      prevProps.allAddress?.status !== this.props?.allAddress?.status &&
      this.props?.allAddress?.status === status.SUCCESS &&
      this.props?.allAddress?.data
    ) {
      this.setState({
        allAddresses: this.props?.allAddress?.data?.addresses,
        loaderStatus: false,
      });
    }
  }

  apiCalls() {
    const items = loginDetails();
    if (items) {
      this.props.getAllAddress(items);
      this.props.fetchDefaultAddress(items?.userId);
    }
  }

  handleModal = (status, defualtApisStatus) => {
    this.setState({
      addAddressModal: status,
    });
    if (defualtApisStatus) {
      this.apiCalls();
    } else {
      let items = loginDetails();
      this.props.getAllAddress(items);
    }
  };

  // Updated handleEditClick to accept event and address
  handleEditClick = (event, address) => {
    event.stopPropagation();
    this.setState({
      addressToEdit: address, // Set the address data to be edited
      submitAddress: true,  // Open the AddAddressModal
    });
  };

  // For delete modal: when clicking the delete icon, set openDeleteModal true
  handleDeleteClick = (addressId) => {
    this.setState({ openDeleteModal: true, addressToDelete: addressId });
  };

  // Close the delete modal
  handleDeleteModalClose = () => {
    this.setState({ openDeleteModal: false, addressToDelete: null });
  };

  handleConfirmDelete = () => {
    const { addressToDelete } = this.state;
    const loginData = loginDetails();
    const userId = loginData?.userId;
    if (userId && addressToDelete) {
      this.setState({ isDeleting: true });
      this.props
        .deleteAddress({
          userId: userId,
          addressId: addressToDelete,
        })
        .then(() => {
          this.setState({
            openDeleteModal: false,
            addressToDelete: null,
            isDeleting: false,
          });
          this.apiCalls();
        })
        .catch((error) => {
          this.setState({ isDeleting: false });
          console.error("Failed to delete address:", error);
        });
    } else {
      console.error("User ID or address ID is missing.");
    }
  };

  render() {
    const {
      addAddressModal,
      defaultAddressId,
      loaderStatus,
      submitAddress,
      openDeleteModal,
      addressToEdit,
      isDeleting,
      allAddresses
    } = this.state;

    // If there are multiple addresses, sort them so that the default address comes first.
    let sortedAddresses = allAddresses;
    if (allAddresses && allAddresses.length > 1 && defaultAddressId) {
      sortedAddresses = allAddresses.slice().sort((a, b) => {
        if (a.addressId === defaultAddressId) return -1;
        if (b.addressId === defaultAddressId) return 1;
        return 0;
      });
    }

    return (
      <Box className="main-container">
        <Container>
          <Box className="profile-container">
            <ProfileSideBar />
            {this.props.allAddress?.status === status.IN_PROGRESS ? (
              Loader.commonLoader()
            ) : (
              <Box className="profile-right" style={{ borderBottom: "none" }}>
                <Box className="heading">
                  <h2>Address Book</h2>
                  <Button
                    className="common-btn address-btn"
                    variant="contained"
                    onClick={() =>
                      this.setState({ submitAddress: true, addressToEdit: null })
                    }
                  >
                    + Add Address
                  </Button>
                </Box>
                {addAddressModal ? (
                  <AddNewAddress handleModal={this.handleModal} />
                ) : (
                  <>
                    {sortedAddresses && sortedAddresses.length > 0 ? (
                      sortedAddresses.map((item) => {
                        return (
                          <Box
                            className="manageaddressmodal"
                            key={item.addressId}
                          >
                            <Box className="manageaddress-info">
                              <h3>
                                {item?.address_type}
                                {item.addressId === defaultAddressId ? (
                                  <div
                                    className="roundDiv"
                                    style={{ marginLeft: "10px" }}
                                  >
                                    Default
                                  </div>
                                ) : null}
                              </h3>
                              <p>{item?.name}</p>
                              <span>
                                {item?.house_number}, {item?.landmark_area},{" "}
                                {item?.address}, {item?.zipCode}
                              </span>
                            </Box>
                            <Box className="manageaddress-icons">
                              {item.addressId !== defaultAddressId && (
                                <img
                                  src={Deleteicon}
                                  alt="Delete"
                                  className="deleteiconn"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    this.handleDeleteClick(item.addressId);
                                  }}
                                />
                              )}
                              <img
                                src={Editicon}
                                alt="Edit"
                                className="manageaddressicons"
                                onClick={(event) =>
                                  this.handleEditClick(event, item)
                                }
                              />
                            </Box>
                          </Box>
                        );
                      })
                    ) : (
                      <Box className="no-data">There Is No Address Found</Box>
                    )}
                  </>
                )}
              </Box>
            )}
          </Box>

          <AddAddressModal
            open={submitAddress}
            handleClose={() => {
              this.setState({ submitAddress: false, addressToEdit: null });
              // Call the address API again when the modal is closed
              this.apiCalls();
            }}
            addressData={addressToEdit} // This prop will be used to pre-fill the form data
          />
          <Modal
            open={openDeleteModal}
            onClose={this.handleDeleteModalClose}
          >
            <Box className="common-modal deletemodal">
              <Box className="delete-text">Confirm Deletion</Box>
              <Box className="delete-subtext">
                Are you sure you want to delete this address?
              </Box>
              <Box className="buttongap">
                <button
                  onClick={this.handleDeleteModalClose}
                  variant="outlined"
                  className="cancelbutton"
                >
                  Cancel
                </button>
                <button
                  onClick={this.handleConfirmDelete}
                  className="confirmbutton"
                  variant="contained"
                  disabled={isDeleting}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Confirm
                  {isDeleting && (
                    <CircularProgress
                      size={20}
                      style={{ marginLeft: "4px" }}
                    />
                  )}
                </button>
              </Box>
            </Box>
          </Modal>
        </Container>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const {
    allAddress,
    selectedAddressData,
    defaultAddressData,
    setDefaultAddressData,
    deleteAddresses,
  } = state.alladdress;
  return {
    allAddress,
    selectedAddressData,
    defaultAddressData,
    setDefaultAddressData,
    deleteAddresses,
  };
}

const mapDispatchToProps = {
  fetchDefaultAddress,
  getAllAddress,
  deleteAddress,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(ManageAddresses));
