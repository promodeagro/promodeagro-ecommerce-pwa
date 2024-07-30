import React, { Component } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import ProfileSideBar from "../profileSideBar";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { connect } from "react-redux";
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
      defaultAddressId: {},
      allAddresses: [],
      deleteId: "",
      loaderStatus: false,
      open: false,
      addressId: "",
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
  handleAddAddress = () => {
    const { addAddressModal, isSubmit } = this.state;
    this.setState({
      addAddressModal: !addAddressModal,
      isSubmit: false,
    });
    // this.props.navigate("/my-profile/manage-addresses/add-new-address");
  };

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

  handleEdit = (event, address) => {
    event.stopPropagation();
    this.props.navigate(
      `/mycart/address/updated-address/${address?.addressId}`,
      {
        state: { address },
      }
    );
  };
  handleClickOpen = (item) => {
    this.setState({
      addressId: item.addressId,
      open: true,
      deleteId: item?.addressId,
    });
  };

  handleClose = () => {
    this.setState({
      addressId: "",
      open: false,
    });
  };



  render() {
    const { addAddressModal, defaultAddressId, loaderStatus } = this.state;
    return (
      <Box className="main-container">
        {this.props.allAddress?.status == status.IN_PROGRESS ? (
          Loader.commonLoader()
        ) : (
          <Container>
            <Box className="profile-container">
              <Box className="profile-left">
                <ProfileSideBar />
              </Box>
              <Box className="profile-right">
                <Box className="heading">
                  <h2>{addAddressModal?"Add Address":"Manage Addresses"}</h2>
                  <Button
                    className={
                      addAddressModal
                        ? "common-btn address-cancel-btn"
                        : "common-btn address-btn"
                    }
                    variant="contained"
                    onClick={() => this.handleAddAddress()}
                  >
                    {addAddressModal ? <>Cancel</> : <>Add Address</>}
                  </Button>
                </Box>
                {addAddressModal ? (
                  <AddNewAddress   handleModal={this.handleModal}/>
                ) : (
                  <Box className="address-container">
                    <Grid container spacing={4} alignItems={"center"}>
                      {this.state.allAddresses?.length > 0 ? (
                        this.state.allAddresses?.map((item) => {
                          return (
                            <Grid item xs={12} lg={4} md={6} sm={6}>
                              <Box className="address-card-container">
                                <Box className="d-flex align-items-center">
                                  <IconButton
                                    aria-label="edit"
                                    className="address-btn"
                                    onClick={(event) =>
                                      this.handleEdit(event, item)
                                    }
                                  >
                                    <BorderColorIcon />
                                  </IconButton>
                                  <IconButton
                                    aria-label="delete"
                                    className="address-btn"
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      this.handleClickOpen(item);
                                    }}
                                    // onClick={() => {

                                    //   this.setState({
                                    //     deleteId: item?.addressId,
                                    //   });
                                    //   this.props.deleteAddress({
                                    //     userId: loginDetails()?.userId,
                                    //     addressId: item?.addressId,
                                    //   });
                                    // }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Box>
                                <h3 className="person-name">
                                  {item?.name}{" "}
                                  {item.addressId === defaultAddressId ? (
                                    <span>Default</span>
                                  ) : (
                                    <></>
                                  )}
                                </h3>
                                <address>{item?.address}</address>
                                <Box className="d-block contact-number">
                                  <span className="d-block contact-heading">
                                    Contact
                                  </span>
                                  <Box className="d-flex align-items-center">
                                    <span className="d-block title">Phone</span>
                                    <span className="d-block details">
                                      {item?.phoneNumber}
                                    </span>
                                  </Box>
                                  <Box className="d-flex align-items-center">
                                    <span className="d-block title">Email</span>
                                    <span className="d-block details">
                                      {item?.email}
                                    </span>
                                  </Box>
                                </Box>
                              </Box>
                            </Grid>
                          );
                        })
                      ) : (
                        <p>There Is No Address Found</p>
                      )}
                    </Grid>
                  </Box>
                )}
              </Box>
            </Box>

            <Dialog
              open={this.state.open}
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

                    this.props.deleteAddress({
                      userId: loginDetails()?.userId,
                      addressId: this.state.addressId,
                    });
                  }}
                  disabled={
                    this.props.deleteAddresses.status == status.IN_PROGRESS
                  }
                  endIcon={
                    this.props.deleteAddresses.status === status.IN_PROGRESS ? (
                      <CircularProgress className="common-loader delete" />
                    ) : (
                      <></>
                    )
                  }
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </Container>
        )}
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
