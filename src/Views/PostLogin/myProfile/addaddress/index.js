import React, { Component } from "react";
import { Box, Button, CircularProgress, Modal } from "@mui/material";
import { connect } from "react-redux";
import Deleteicon from "../../../../assets/img/trash-2.png";
import Editicon from "../../../../assets/img/editicon.svg";
import { Loader } from "../../../Utills/helperFunctions";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import {
  fetchDefaultAddress,
  getAllAddress,
  deleteAddress,
} from "../../../../Redux/Address/AddressThunk";
import status from "../../../../Redux/Constants";
import { loginDetails } from "../../../Utills/helperFunctions";

class AllAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmit: false,
      defaultAddressId: null,
      allAddresses: [],
      deleteId: "",
      loaderStatus: false,
      open: false,
      addressId: "",
      openDeleteModal: false,
      addressToDelete: null,
      isDeleting: false,
    };
  }

  componentDidMount() {
    this.setState({ loaderStatus: true });
    this.apiCalls();
  }

  componentDidUpdate(prevProps) {
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
      this.setState({ deleteId: "", open: false });
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

  handleEditClick = (event, address) => {
    event.stopPropagation();
    // Edit functionality removed.
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
      defaultAddressId,
      loaderStatus,
      openDeleteModal,
      isDeleting,
      allAddresses,
    } = this.state;

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
        <Box className="containeradddress">
          {this.props.allAddress?.status === status.IN_PROGRESS ? (
            Loader.commonLoader()
          ) : (
            <Box>
              <Box>
                <h2>Address Book</h2>
              </Box>
              {sortedAddresses && sortedAddresses.length > 0 ? (
                sortedAddresses.map((item) => (
                  <Box className="maindivfortheaddress" key={item.addressId}>
                    <Box className="addresscontainerbox">
                      <h3 className="headeroftheaddress">
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
                      <p >{item?.name}</p>
                      <span>
                        {item?.house_number}, {item?.landmark_area},
                        {item?.address}, {item?.zipCode}
                      </span>
                    </Box>
                    <Box className="iconsscontainer">
                      {item.addressId !== defaultAddressId && (
                        <img
                          src={Deleteicon}
                          alt="Delete"
                          className="iconsheightwidth"
                          onClick={(event) => {
                            event.stopPropagation();
                            this.handleDeleteClick(item.addressId);
                          }}
                        />
                      )}
                      <img
                        src={Editicon}
                        alt="Edit"
                        className="iconsheightwidth"
                        onClick={(event) => this.handleEditClick(event, item)}
                      />
                    </Box>
                  </Box>
                ))
              ) : (
                <Box className="no-data">There Is No Address Found</Box>
              )}
            </Box>
          )}
          <Button className="common-btn ">+ Add Address</Button>
        </Box>
        <Modal open={openDeleteModal} onClose={this.handleDeleteModalClose}>
          <Box className="common-modal deletemodal">
            <Box className="delete-text">Confirm Deletion</Box>
            <Box className="delete-subtext">
              Are you sure you want to delete this address?
            </Box>
            <Box className="buttongap">
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

              <button
                onClick={this.handleDeleteModalClose}
                className="cancelbutton"
              >
                Cancel
              </button>
            </Box>
          </Box>
        </Modal>
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
)(navigateRouter(AllAddress));
