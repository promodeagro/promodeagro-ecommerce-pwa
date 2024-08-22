import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getAllAddress,
  deleteAddress,
} from "../../../../../../Redux/Address/AddressThunk";
import { setSelectedAdd } from "../../../../../../Redux/Address/AddressSlice";
import status from "../../../../../../Redux/Constants";
import { useSelector, useDispatch } from "react-redux";
import { Loader, loginDetails } from "Views/Utills/helperFunctions";
import { useNavigate } from "react-router-dom";
import { ErrorMessages } from "../../../../../Utills/helperFunctions";

const AllAddress = (props) => {
  const [open, setOpen] = useState(false);
  const [allAddress, setAllAddress] = useState([]);
  const [allAddressApiLoader, setAllAddresApiLoader] = useState(false);
  const [deleteAddressApiLoader, setDeleteAddressApiLoader] = useState(false);
  const allAddressState = useSelector((state) => state.alladdress.allAddress);
  const [addressId, setAddressId] = useState("");
  const [defaultAddressLoader, setDefaultAddressLoader] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const postAddressStatus = useSelector(
    (state) => state.alladdress.postAddress.status
  );
  const deleteAddressStatus = useSelector(
    (state) => state.alladdress.deleteAddresses.status
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let items = loginDetails();
    setAllAddresApiLoader(true);
    setSelectedAddressId(localStorage.getItem("address"));
    dispatch(
      getAllAddress({
        userId: items.userId,
      })
    );
  }, []);

  useEffect(() => {
    if (props.defaultSelectedAddress.addressId && !selectedAddressId) {
      setSelectedAddressId(props.defaultSelectedAddress.addressId);
    }
  }, [props.defaultSelectedAddress]);

  useEffect(() => {
    if (
      allAddressState.status === status.SUCCESS &&
      allAddressState.data.addresses &&
      allAddressApiLoader
    ) {
      localStorage.removeItem("address");

      setAllAddresApiLoader(true);
      setAllAddress(allAddressState.data.addresses);
      if (allAddressState?.data?.addresses?.length == 0) {
        setSelectedAddressId("");
      }
    }
  }, [allAddressState]);

  useEffect(() => {
    if (deleteAddressStatus === status.SUCCESS && deleteAddressApiLoader) {
      let items = loginDetails();
      setAllAddresApiLoader(true);
      setDeleteAddressApiLoader(false);
      props.getDefaultAddress();
      dispatch(
        getAllAddress({
          userId: items.userId,
        })
      );
      ErrorMessages.success("Address Delete Successfully");
      setOpen(false);
    }
  }, [deleteAddressStatus]);

  useEffect(() => {
    if (
      props.setDefaultAddressData.status == status.SUCCESS &&
      defaultAddressLoader
    ) {
      if (props.setDefaultAddressData.data) {
        setSelectedAddressId("");
        setDefaultAddressLoader(false);
        props.getDefaultAddress();
      }
    }
  }, [props.setDefaultAddressData.status]);

  const handleDelete = (userId, addressId) => {
    setDeleteAddressApiLoader(true);
    dispatch(
      deleteAddress({
        userId: userId,
        addressId: addressId,
      })
    );
  };

  const handleEdit = (event, address) => {
    event.stopPropagation();
    navigate(`/mycart/address/updated-address/${address?.addressId}`, {
      state: { address },
    });
  };

  const handleClickOpen = (item) => {
    setAddressId(item.addressId);
    setOpen(true);
  };

  const handleClose = () => {
    setAddressId("");
    setOpen(false);
  };

  const handleSelectedAddress = (selcet) => {
    localStorage.setItem("address", selcet?.addressId);
    setSelectedAddressId(selcet?.addressId);
  };

  return (
    <Box className="address-select-container">
      <Box className="address-details">
        <Box className="d-block contain">
          <h2>Select a location for delivery</h2>
          <p>
            Choose your address location to see product availability and
            delivery options
          </p>
        </Box>
        <Grid container spacing={4} alignItems={"center"}>
          {/* {(Loader.commonLoader())} */}
          {allAddressState.status === status.IN_PROGRESS ? (
            Loader.commonLoader()
          ) : (
            <>
              {allAddress?.length > 0 ? (
                allAddress.map((item, index) => {
                  return (
                    <Grid key={index} item xs={12} lg={4} md={6} sm={6}>
                      {item?.addressId === selectedAddressId &&
                      props.setDefaultAddressData.status ==
                        status.IN_PROGRESS ? (
                        Loader.commonLoader()
                      ) : (
                        <>
                          <Box
                            className={`address-card-container ${
                              item.addressId == selectedAddressId
                                ? "active"
                                : ""
                            }`}
                            onClick={() => handleSelectedAddress(item)}
                          >
                            {item.addressId == selectedAddressId ? (
                              <Box className="active-check">
                                <CheckIcon />
                              </Box>
                            ) : (
                              <></>
                            )}

                            <Box className="d-flex align-items-center">
                              <IconButton
                                aria-label="edit"
                                className={
                                  item.addressId == selectedAddressId
                                    ? "address-btn active"
                                    : "address-btn"
                                }
                                onClick={(event) => handleEdit(event, item)}
                              >
                                <BorderColorIcon />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                className={
                                  item.addressId == selectedAddressId
                                    ? "address-btn active"
                                    : "address-btn"
                                }
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleClickOpen(item);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                            <h3 className="person-name">{item.name}</h3>
                            <address>
                              {item.address} {item.zipCode}
                            </address>
                            <Box className="d-block contact-number">
                              <span className="d-block contact-heading">
                                Contact
                              </span>
                              <Box className="d-flex align-items-center">
                                <span className="d-block title">Phone</span>
                                <span className="d-block details">
                                  {item.phoneNumber}
                                </span>
                              </Box>
                              <Box className="d-flex align-items-center">
                                <span className="d-block title">Email</span>
                                <span className="d-block details">
                                  {item.email}
                                </span>
                              </Box>
                            </Box>
                            {/* {item.addressId == selectedAddressId ? (
                              <FormControlLabel
                                
                                checked
                                control={<Checkbox />}
                                label="Make This Default Address"
                              />
                            ) : (
                              <></>
                            )} */}
                          </Box>
                        </>
                      )}
                    </Grid>
                  );
                })
              ) : (
                <></>
              )}
            </>
          )}
          <Grid item xs={12} lg={4} md={12} sm={12}>
            <Link to={"/mycart/address/add-new-address"}>
              <Button
                variant="outlined"
                fullWidth
                className="outline-common-btn"
                startIcon={<AddIcon />}
              >
                Add New Address
              </Button>
            </Link>
          </Grid>
        </Grid>
        {props?.cartListLength > 0 && selectedAddressId ? (
          <Box className="d-flex justify-content-end w-100">
            <Button
              variant="contained"
              fullWidth
              className="common-btn proceed-btn"
              onClick={() => {
                props.handleTabs(1, selectedAddressId);
                localStorage.setItem("selectedTab", 1);
                navigate("/mycart/address/order-details");
              }}
            >
              Proceed Next
            </Button>
          </Box>
        ) : (
          <></>
        )}
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
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
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            className="outline-common-btn"
            color="error"
            onClick={(event) => {
              event.stopPropagation();
              let items = loginDetails();
              handleDelete(items?.userId, addressId);
            }}
            disabled={props.deleteAddresses.status == status.IN_PROGRESS}
            endIcon={
              props.deleteAddresses.status === status.IN_PROGRESS ? (
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
    </Box>
  );
};

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
  };
}

const mapDispatchToProps = {
  getAllAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllAddress);
