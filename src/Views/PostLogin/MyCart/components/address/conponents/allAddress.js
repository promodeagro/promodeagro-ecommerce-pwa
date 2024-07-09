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
import { loginDetails } from "Views/Utills/helperFunctions";
import { useNavigate } from "react-router-dom";

const AllAddress = (props) => {
  const [open, setOpen] = useState(false);
  const [allAddress, setAllAddress] = useState([]);
  const [allAddressApiLoader, setAllAddresApiLoader] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({});
  const allAddressState = useSelector((state) => state.alladdress.allAddress);
  const postAddressStatus = useSelector(
    (state) => state.alladdress.postAddress.status
  );
  const deleteAddressStatus = useSelector(
    (state) => state.alladdress.deleteAddress.status
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let items = loginDetails();
    setAllAddresApiLoader(true);
    dispatch(
      getAllAddress({
        userId: items.userId,
      })
    );
  }, []);

  useEffect(() => {
    if (
      allAddressState.status === status.SUCCESS &&
      allAddressState.data.addresses &&
      allAddressApiLoader
    ) {
      setAllAddresApiLoader(false);
      setAllAddress(allAddressState.data.addresses);

      if (!props.selectedAddressData?.address) {
        dispatch(setSelectedAdd(allAddressState.data.addresses[0]));
        setSelectedAddress(allAddressState.data.addresses[0]);
      }
    }
  }, [allAddressState]);

  useEffect(() => {
    if (postAddressStatus === status.SUCCESS) {
      console.log(postAddressStatus.data);
    }
  }, [postAddressStatus]);

  useEffect(() => {
    if (props.selectedAddressData) {
      setSelectedAddress(props.selectedAddressData);
    }
  }, [props.selectedAddressData]);

  useEffect(() => {
    if (deleteAddressStatus === status.SUCCESS) {
      let items = loginDetails();
      dispatch(
        getAllAddress({
          userId: items.userId,
        })
      );
    }
  }, [deleteAddressStatus]);

  const handleDelete = (userId, addressId) => {
    dispatch(
      deleteAddress({
        userId: userId,
        addressId: addressId,
      })
    );
  };

  const handleEdit = (address) => {
    navigate("/myCart/address/updated-address", {
      state: { address },
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectedAddress = (selcet) => {
    dispatch(setSelectedAdd(selcet));
    setSelectedAddress(selcet);
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
          {allAddress?.length > 0 &&
            allAddress.map((item, index) => {
              return (
                <Grid key={index} item xs={12} lg={4} md={6} sm={6}>
                  <Box
                    className={`address-card-container ${
                      item.addressId == selectedAddress.addressId
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleSelectedAddress(item)}
                  >
                    {item.addressId == selectedAddress.addressId ? (
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
                          item.addressId == selectedAddress.addressId
                            ? "address-btn active"
                            : "address-btn"
                        }
                        onClick={() => handleEdit(item)}
                      >
                        <BorderColorIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        className={
                          item.addressId == selectedAddress.addressId
                            ? "address-btn active"
                            : "address-btn"
                        }
                        onClick={() => {
                          handleClickOpen();
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
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
                        <DialogActions style={{ justifyContent: "center", paddingBottom: "24px" }}>
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
                            onClick={() => {
                              handleDelete(item.userId, item.addressId);
                              handleClose();
                            }}
                            autoFocus
                          >
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Box>
                    <h3 className="person-name">{item.name}</h3>
                    <address>{item.address}</address>
                    <Box className="d-block contact-number">
                      <span className="d-block contact-heading">Contact</span>
                      <Box className="d-flex align-items-center">
                        <span className="d-block title">Phone</span>
                        <span className="d-block details">{item.contact}</span>
                      </Box>
                      <Box className="d-flex align-items-center">
                        <span className="d-block title">Email</span>
                        <span className="d-block details">{item.email}</span>
                      </Box>
                    </Box>
                    {item.addressId == selectedAddress.addressId ? (
                      <FormControlLabel
                        checked
                        control={<Checkbox />}
                        label="Make This Default Address"
                      />
                    ) : (
                      <></>
                    )}
                  </Box>
                </Grid>
              );
            })}
          <Grid item xs={12} lg={4} md={12} sm={12}>
            <Link to={"/myCart/address/add-new-address"}>
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
        <Box className="d-flex justify-content-end w-100">
          <Button
            variant="contained"
            fullWidth
            className="common-btn proceed-btn"
            onClick={() => {
              props.handleTabs(1, selectedAddress);
              localStorage.setItem("selectedTab", 1);
              navigate("/myCart/address/order-details");
              // here route change of page 1
            }}
          >
            Proceed Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

function mapStateToProps(state) {
  const { cartData } = state.home;
  const { cartItems } = state.cartitem;

  const { allAddress, selectedAddressData } = state.alladdress;
  return { cartData, cartItems, allAddress, selectedAddressData };
}

const mapDispatchToProps = {
  getAllAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllAddress);
