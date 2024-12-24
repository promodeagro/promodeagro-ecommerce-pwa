import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteAddress,
  getAllAddress,
  getDefaultAddress,
} from "../../../../Redux/Address/AddressThunk";
import {
  ErrorMessages,
  Loader,
  loginDetails,
} from "Views/Utills/helperFunctions";
import status from "../../../../Redux/Constants";
import DeleteIcon from "@mui/icons-material/Delete";
import penciEditIcon from "../../../../assets/img/pencilEditIcon.svg";
import deleteBinIcon from "../../../../assets/img/deleteBinIcon.svg";

const AllAdresses = (props) => {
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
    if (props.defaultSelectedAddress?.addressId && !selectedAddressId) {
      setSelectedAddressId(props.defaultSelectedAddress.addressId);
    }
  }, [props.defaultSelectedAddress]);

  console.log(allAddressState);

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

  const handleSelectedAddress = (select) => {
    localStorage.setItem("address", select?.addressId);
    setSelectedAddressId(select?.addressId);
  
    // Call the parent component method to update the selected address
    if (props.onAddressSelect) {
      props.onAddressSelect(select);
    }
  };
  
    return (
    <>
      {console.log("status", allAddressState.status)}
      {allAddressState.status === status.IN_PROGRESS ? (
        Loader.commonLoader()
      ) : (
        <>
          {allAddress?.length > 0 ? (
            allAddress.map((item, index) => {
              return (
                <Grid key={index} item xs={12} lg={4} md={6} sm={6}>
                  {item?.addressId === selectedAddressId &&
                  props.setDefaultAddressData.status == status.IN_PROGRESS ? (
                    Loader.commonLoader()
                  ) : (
                    <>
                      <Box
                        onClick={() => handleSelectedAddress(item)}
                        className={`address_box ${
                          item.addressId == selectedAddressId
                            ? "address_box_active"
                            : ""
                        }`}
                      >
                        <div>
                          {console.log(item)}
                          <span>Home</span>
                        </div>
                        <p>
                          {item.address} {item.zipCode}{" "}
                        </p>
                        <div className="address_box_bottom">
                          <img
                            src={deleteBinIcon}
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
                            alt=""
                          />
                          <img
                            src={penciEditIcon}
                            aria-label="delete"
                            className={
                              item.addressId == selectedAddressId
                                ? "address-btn active"
                                : "address-btn"
                            }
                            alt=""
                          />
                        </div>
                      </Box>
                    </>
                  )}
                </Grid>
              );
            })
          ) : (
            <Box className="empty_address">
              you don’t have <br />
              save address with us
            </Box>
          )}
        </>
      )}
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
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllAdresses);
