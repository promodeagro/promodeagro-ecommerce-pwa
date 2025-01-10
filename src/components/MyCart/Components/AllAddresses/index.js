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

class AllAddresses extends React.Component {
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
      this.props
        .deleteAddress({ userId: userId, addressId: addressToDelete })
        .then(() => {
          this.setState({ openDeleteModal: false, addressToDelete: null }); // Close modal after deletion
          const items = loginDetails(); // Ensure loginDetails is available
          this.props.getAllAddress({ userId: items.userId }); // Call the address API again
        })
        .catch((error) => {
          console.error("Failed to delete address:", error);
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
      <div>
        <div  className="h2spacing">
        <Button
      onClick={() => this.setState({ openAddNewAddressModal: true })} // Add click handler

          sx={{
            borderRadius: "9px",
            height: "60px",
            background: "rgba(0, 178, 7, 0.1019607843)",
            justifyContent: "start",
            color: "#1f9151",
            fontWeight: 600,
            textTransform: "none",
            fontSize: "16px",
          }}
          fullWidth
          startIcon={<AddIcon fontSize="28px" />}
        >
          Add New Address
        </Button>
        {/* <h2>Select An Address</h2> */}
        </div>
        {sortedAddresses?.length > 0 ? (
          sortedAddresses.map((item, index) => (
            <Grid key={index} item xs={12} lg={4} md={6} sm={6}>
              
              {item?.addressId === selectedAddressId &&
              allAddressApiLoader.status === status.IN_PROGRESS ? (
                Loader.commonLoader()
              ) : (
                <Box
                  onClick={() => this.handleSelectedAddress(item)}
                  className={`address_box ${
                    item.addressId === selectedAddressId
                      ? "address_box_active"
                      : ""
                  } ${
                    item.addressId === allAddressData.defaultAddressId
                      ? "default_address"
                      : ""
                  }`}
                >
                  <div>
                    <span>{item.address_type}</span>
                    {item.addressId === allAddressData.defaultAddressId ? (
                      <button className="defaultdiv">Default</button>
                    ) : (
                      <button className="graydiv">Deliver here</button>
                    )}
                  </div>
                  <p>
                    {item.house_number} {item.landmark_area} {item.address},{" "}
                    {item.zipCode}
                  </p>
                  <div className="address_box_bottom">
                    {item.addressId !== allAddressData.defaultAddressId && (
                      <>
                        <img
                          src={penciEditIcon}
                          aria-label="edit"
                          className={
                            item.addressId === selectedAddressId
                              ? "address-btn active"
                              : "address-btn"
                          }
                          alt="edit"
                          onClick={(event) => {
                            event.stopPropagation();
                            this.handleEditClick(item); // Open AddAddressModal with prefilled data
                          }}
                        />
                        <img
                          src={deleteBinIcon}
                          aria-label="delete"
                          className={
                            item.addressId === selectedAddressId
                              ? "address-btn active"
                              : "address-btn"
                          }
                          alt="delete"
                          onClick={(event) => {
                            event.stopPropagation();
                            this.handleDeleteClick(item.addressId); // Open delete modal
                          }}
                        />
                      </>
                    )}
                    {/* Show only Edit button for default address */}
                    {item.addressId === allAddressData.defaultAddressId && (
                      <img
                        src={penciEditIcon}
                        aria-label="edit"
                        className={
                          item.addressId === selectedAddressId
                            ? "address-btn active"
                            : "address-btn"
                        }
                        alt="edit"
                        onClick={(event) => {
                          event.stopPropagation();
                          this.handleEditClick(item); // Open AddAddressModal with prefilled data
                        }}
                      />
                    )}
                  </div>
                </Box>
              )}
            </Grid>
          ))
        ) : (
  Loader.commonLoader() 
        )}
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
            <Box className="delete-text">Confirm Deletion</Box>
            <Box className="delete-subtext">
              Are you sure you want to delete this address?
            </Box>
            <Box className="buttongap">
              <button
                variant="outlined"
                className="cancelbutton"
                onClick={() => this.handleDeleteModalClose()} // Close modal on Cancel
              >
                Cancel
              </button>
              <button
                className="confirmbutton"
                variant="contained"
                onClick={this.handleConfirmDelete}
              >
                Confirm
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
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllAddresses);
