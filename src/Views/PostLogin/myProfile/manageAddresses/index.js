import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  Container,
  Modal,
} from "@mui/material";
import { connect } from "react-redux";
import {
  deleteAddress,
  getAllAddress,
} from "../../../../Redux/Address/AddressThunk";
import {
  ErrorMessages,
  Loader,
  loginDetails,
} from "Views/Utills/helperFunctions";
import status from "../../../../Redux/Constants";
import penciEditIcon from "../../../../assets/img/pencilEditIcon.svg";
import deleteBinIcon from "../../../../assets/img/deleteBinIcon.svg";
import AddNewAddressModal from "../../../../../src/components/AddressModal/addnewaddressmodal";
import AddIcon from "@mui/icons-material/Add";
import ProfileSideBar from "../profileSideBar";
import Deleteicon from "../../../../assets/img/trash-2.png";
import Editicon from "../../../../assets/img/editicon.svg";

class ManageAddresses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      allAddressApiLoader: false,
      deleteAddressApiLoader: false,
      openDeleteModal: false, // For confirming delete
      addressToEdit: null, // Store the address data to be edited
      openAddNewAddressModal: false,
      addressId: "",
      selectedAddressId: localStorage.getItem("address") || "",
      confirmDeleteLoader: false, // Loader for the Confirm button in delete modal
    };
  }

  componentDidMount() {
    const items = loginDetails();
    this.setState({ allAddressApiLoader: true });
    this.props.getAllAddress({ userId: items.userId }).then(() => {
      // Ensure default address gets selected
      const { defaultAddressId } = this.props.allAddressData;
      if (!this.state.selectedAddressId && defaultAddressId) {
        this.setDefaultAddress(defaultAddressId);
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { allAddressData, deleteAddresses } = this.props;
    if (allAddressData.defaultAddressId && !this.state.selectedAddressId) {
      this.setDefaultAddress(allAddressData.defaultAddressId);
    }
    if (
      deleteAddresses.status === status.SUCCESS &&
      this.state.deleteAddressApiLoader
    ) {
      this.handlePostDelete();
    }
  }
  setDefaultAddress = (defaultAddressId) => {
    this.setState({ selectedAddressId: defaultAddressId });
    localStorage.setItem("address", defaultAddressId);
  };

  setDefaultAddress = (defaultAddressId) => {
    this.setState({ selectedAddressId: defaultAddressId });
    localStorage.setItem("address", defaultAddressId);
  };

  handleEditClick = (address) => {
    this.setState({ openAddNewAddressModal: true, addressToEdit: address });
  };

  handleAddNewAddressModalClose = () => {
    const items = loginDetails();
    this.setState(
      { openAddNewAddressModal: false, addressToEdit: null },
      () => {
        this.props
          .getAllAddress({ userId: items.userId })
          .then(() => {})
          .catch((error) => {
            console.error("Failed to fetch addresses after edit:", error);
          });
      }
    );
  };

  handlePostDelete = () => {
    const items = loginDetails();
    this.setState({ allAddressApiLoader: true, deleteAddressApiLoader: false });
    this.props.getDefaultAddress();
    this.props.getAllAddress({ userId: items.userId });
    this.setState({ open: false });
  };

  handleDelete = (userId, addressId) => {
    this.setState({ deleteAddressApiLoader: true });
    this.props.deleteAddress({ userId, addressId });
  };

  handleDeleteClick = (addressId) => {
    this.setState({ openDeleteModal: true, addressToDelete: addressId });
  };

  handleDeleteModalClose = () => {
    this.setState({ openDeleteModal: false, addressToDelete: null });
  };

  handleConfirmDelete = () => {
    const { addressToDelete } = this.state;
    const loginData = loginDetails();
    const userId = loginData?.userId;

    if (userId && addressToDelete) {
      this.setState({ confirmDeleteLoader: true }); // Show loader
      this.props
        .deleteAddress({ userId: userId, addressId: addressToDelete })
        .then(() => {
          this.setState({
            openDeleteModal: false,
            addressToDelete: null,
            confirmDeleteLoader: false, // Hide loader after successful deletion
          });

          const items = loginDetails();
          this.props.getAllAddress({ userId: items.userId }); // Fetch updated addresses
        })
        .catch((error) => {
          console.error("Failed to delete address:", error);
          this.setState({ confirmDeleteLoader: false }); // Hide loader on error
        });
    } else {
      console.error("User ID or address ID is missing.");
    }
  };

  handleClickOpen = (item) => {
    this.setState({ addressId: item.addressId, open: true });
  };

  handleClose = () => {
    this.setState({ addressId: "", open: false });
  };

  handleSelectedAddress = (select) => {
    localStorage.setItem("address", select?.addressId);
    this.setState({ selectedAddressId: select?.addressId });
    if (this.props.onAddressSelect) {
      this.props.onAddressSelect(select);
    }
  };

  render() {
    const { allAddressData, setDefaultAddressData, openDeleteModal } =
      this.props;
    const {
      open,
      allAddressApiLoader,
      deleteAddressApiLoader,
      selectedAddressId,
    } = this.state;
    const { openAddNewAddressModal, addressToEdit } = this.state;

    const sortedAddresses = allAddressData.addresses
      ? [
          ...allAddressData.addresses.filter(
            (address) => address.addressId === allAddressData.defaultAddressId
          ),
          ...allAddressData.addresses.filter(
            (address) => address.addressId !== allAddressData.defaultAddressId
          ),
        ]
      : [];

    return (
      <Box className="main-container">
        <Container className="wraper">
          <Box className="profile-container">
            <ProfileSideBar />
            <Box className="profile-right">
              <Box className="heading">
                <h2>Address Book</h2>
                <div>
                  <Button
                    onClick={() =>
                      this.setState({ openAddNewAddressModal: true })
                    }
                    className="common-btn address-btn manageaddressicons"
                  >
                    + Add Address
                  </Button>
                </div>
              </Box>
              {sortedAddresses?.length > 0 ? (
                sortedAddresses.map((item, index) => (
                  <>
                    {item?.addressId === selectedAddressId &&
                    allAddressApiLoader.status === status.IN_PROGRESS ? (
                      Loader.commonLoader()
                    ) : (
                      <Box className="manageaddressmodal">
                        <Box className="manageaddress-info">
                          <h3>
                            {item.address_type}
                            {item.addressId ===
                              allAddressData.defaultAddressId && (
                              <div
                                className="roundDiv"
                                style={{ marginLeft: "10px" }}
                              >
                                <button className="defaultdiv">Default</button>
                              </div>
                            )}
                          </h3>
                          <p>{item.name}</p>
                          <span>
                            {item.house_number} {item.landmark_area}{" "}
                            {item.address}, {item.zipCode}
                          </span>
                        </Box>
                        <Box className="manageaddress-icons">
                          {item.addressId !==
                            allAddressData.defaultAddressId && (
                            <>
                              <img
                                src={Deleteicon}
                                className="deleteiconn"
                                alt="delete"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  this.handleDeleteClick(item.addressId); // Open delete modal
                                }}
                              />

                              <img
                                src={Editicon}
                                aria-label="edit"
                                className="manageaddressicons"
                                alt="edit"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  this.handleEditClick(item); // Open AddAddressModal with prefilled data
                                }}
                              />
                            </>
                          )}
                          {item.addressId ===
                            allAddressData.defaultAddressId && (
                            <img
                              src={Editicon}
                              aria-label="edit"
                              className="manageaddressicons"
                              alt="edit"
                              onClick={(event) => {
                                event.stopPropagation();
                                this.handleEditClick(item); // Open AddAddressModal with prefilled data
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                    )}
                  </>
                ))
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', width:"100%" }}>
                  {allAddressApiLoader ? (
                    <Loader.commonLoader />
                  ) : (
                    "No addresses available"
                  )}
                </div>
              )}
            </Box>
          </Box>
        </Container>

        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this address?
            </DialogContentText>
          </DialogContent>
          <DialogActions
            style={{ justifyContent: "center", paddingBottom: "24px" }}
          >
            <Button
              variant="outlined"
              className="outline-common-btn"
              onClick={this.handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              className="outline-common-btn"
              color="error"
              onClick={(event) => {
                event.stopPropagation();
                const items = loginDetails();
                this.handleDelete(items?.userId, this.state.addressId);
              }}
              disabled={deleteAddressApiLoader}
              endIcon={
                deleteAddressApiLoader ? (
                  <CircularProgress
                    className="common-loader delete"
                    color="success"
                  />
                ) : null
              }
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Modal
          open={this.state.openDeleteModal}
          onClose={this.handleDeleteModalClose}
        >
          <Box className="common-modal deletemodal">
            <Box className="delete-subtext">
              Are you sure you want to delete this address?
            </Box>
            <Box className="buttongap">
            <button
                className="confirmbutton"
                variant="contained"
                onClick={this.handleConfirmDelete}
                disabled={this.state.confirmDeleteLoader} // Disable button while loader is active
              >
                Delete
                {this.state.confirmDeleteLoader && (
                  <CircularProgress size={20} style={{ marginLeft: "4px" }} />
                )}
              </button>
              <button
                variant="outlined"
                className="cancelbutton"
                onClick={() => this.handleDeleteModalClose()} // Close modal on Cancel
              >
                Cancel
              </button>
              
            </Box>
          </Box>
        </Modal>
        {openAddNewAddressModal && (
          <AddNewAddressModal
            open={openAddNewAddressModal}
            handleClose={this.handleAddNewAddressModalClose} // Pass updated handler
            addressData={addressToEdit} // Prefilled data for edit
          />
        )}
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { cartData } = state.home;
  const { cartItems } = state.cartitem;
  const {
    allAddress,
    selectedAddressData,
    deleteAddresses,
    setDefaultAddressData,
  } = state.alladdress;

  return {
    cartData,
    cartItems,
    allAddress,
    deleteAddresses,
    selectedAddressData,
    setDefaultAddressData,
    allAddressData: state.alladdress.allAddress?.data || {},
  };
}

const mapDispatchToProps = {
  getAllAddress,
  deleteAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAddresses);
