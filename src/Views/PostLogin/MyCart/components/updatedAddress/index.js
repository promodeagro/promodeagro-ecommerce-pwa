import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  Button,
  FormHelperText,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useParams } from "react-router-dom";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  updateAddress,
  getAllAddress,
  setDefaultAddress,
  fetchDefaultAddress,
} from "../../../../../Redux/Address/AddressThunk";
import status from "../../../../../Redux/Constants";
import { Loader, loginDetails } from "Views/Utills/helperFunctions";
import { Link } from "react-router-dom";
import {
  ErrorMessages,
  ValidationEngine,
} from "../../../../Utills/helperFunctions";

const validationSchema = {
  name: [
    {
      message: "Please enter name",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
  email: [
    {
      message: "Please enter email",
      type: ValidationEngine.type.MANDATORY,
    },
    {
      message: "Please enter valid email",
      type: ValidationEngine.type.REGEX,
      regex: ValidationEngine.EMAIL_REGEX,
    },
  ],
  address: [
    {
      message: "Please enter address",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
  phoneNumber: [
    {
      message: "Please enter phone number",
      type: ValidationEngine.type.MANDATORY,
    },
    {
      message: "Please valid phone number",
      type: ValidationEngine.type.REGEX,
      regex: ValidationEngine.MOBILE_NUMBER_REGEX,
    },
  ],
  zipCode: [
    {
      message: "Please enter zip code",
      type: ValidationEngine.type.MANDATORY,
    },
    {
      message: "Please valid zip code",
      type: ValidationEngine.type.REGEX,
      regex: ValidationEngine.ZIP_CODE_REGEX,
    },
  ],
};
const UpdatedAddress = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [addressDetails, setAddressDetails] = useState({
    name: "",
    email: "",
    address: "",
    contact: "",
    zipCode: "",
    addressId: "",
    isSubmit: false,
  });
  const [isChecked, setIsChecked] = useState(false);
  const [apiLoader, setApiLoader] = useState(false);
  const [allAddressApiLoader, setAllAddressLoader] = useState(false);
  const [defaultAddressLoader, setDefaultAddressLoader] = useState(false);
  const [defaultAPILoader, setdefaultAPILoader] = useState(false);
  useEffect(() => {
    setAllAddressLoader(true);
    props.getAllAddress({
      userId: loginDetails()?.userId,
    });
    setDefaultAddressLoader(true);
    props.fetchDefaultAddress(loginDetails()?.userId);
  }, [id]);

  useEffect(() => {
    if (
      props.setDefaultAddressData?.status === status.SUCCESS &&
      defaultAPILoader
    ) {
      setdefaultAPILoader(false);
      // setIsChecked(false);
      navigate(-1);
    }
  }, [props.setDefaultAddressData?.status]);
  useEffect(() => {
    if (
      props.defaultAddressData.status === status.SUCCESS &&
      props.defaultAddressData?.data &&
      defaultAddressLoader
    ) {
      setDefaultAddressLoader(false);
      if (props.defaultAddressData?.data?.addressId === id) {
        // debugger;
        // setIsChecked(true);
      }
    }
  }, [props.defaultAddressData.status]);
  useEffect(() => {
    if (
      props.allAddress.status === status.SUCCESS &&
      props.allAddress?.data &&
      allAddressApiLoader
    ) {
      const currentAddress = props.allAddress?.data.addresses.find(
        (address) => address.addressId === id
      );
      setAddressDetails(currentAddress);
      setAllAddressLoader(false);
    }
  }, [props.allAddress.status]);

  useEffect(() => {
    if (
      props.updateAddressState.status === status.SUCCESS &&
      props.updateAddressState?.data &&
      apiLoader &&
      addressDetails.isSubmit
    ) {
      if (isChecked) {
        setdefaultAPILoader(true);
        props.setDefaultAddress({
          userId: loginDetails()?.userId,
          addressId: id,
        });
      } else {
        setAddressDetails({
          ...addressDetails,
          isSubmit: false,
          name: "",
          email: "",
          address: "",
          phoneNumber: "",
          zipCode: "",
        });
        navigate(-1);
      }

      setApiLoader(false);

      ErrorMessages.success("Address Successfully Update");
    }
  }, [props.updateAddressState.status]);

  const validateForm = () => {
    const { name, email, address, phoneNumber, zipCode } = addressDetails;
    const error = ValidationEngine.validate(validationSchema, {
      name,
      email,
      address,
      phoneNumber,
      zipCode,
    });
    return error;
  };

  const handleSubmit = () => {
    const { name, email, address, phoneNumber, zipCode, addressId } =
      addressDetails;
    setApiLoader(true);
    const items = loginDetails();
    const errorData = validateForm();

    setAddressDetails({
      ...addressDetails,
      isSubmit: true,
    });
    if (errorData.isValid) {
      props.updateAddress({
        userId: items.userId,
        addressId: addressId,
        address: {
          name,
          email,
          address,
          phoneNumber,
          zipCode,
        },
      });
    }
  };

  const handleValueChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;

    if (type === "checkbox") {
      setIsChecked(val);
    } else {
      setAddressDetails({
        ...addressDetails,
        [name]: val,
        [event.target.name]: event.target.value,
      });
    }
  };

  const { name, email, address, phoneNumber, zipCode, isSubmit } =
    addressDetails;
  const errorData = validateForm();

  return (
    <>
      {props.allAddress.status === status.IN_PROGRESS ? (
        Loader.commonLoader()
      ) : (
        <Container>
          <Box
            className="add-new-address-container"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="400"
          >
            <Box className="address-details">
              <h2>Update address</h2>
              <Box className="form-info">
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={6} md={6} sm={6}>
                    <label className="d-block form-field-title">Name</label>
                    <TextField
                      name="name"
                      variant="outlined"
                      fullWidth
                      className="form-text-field"
                      placeholder="John Doe"
                      value={name}
                      onChange={handleValueChange}
                      error={!errorData.name.isValid && isSubmit}
                    />
                    {isSubmit && (
                      <FormHelperText error>
                        {errorData?.name?.message}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} lg={6} md={6} sm={6}>
                    <label className="d-block form-field-title">Email</label>
                    <TextField
                      name="email"
                      variant="outlined"
                      fullWidth
                      className="form-text-field"
                      placeholder="JohnDoe@gmail.com"
                      value={email}
                      onChange={handleValueChange}
                      error={!errorData.email.isValid && isSubmit}
                    />
                    {isSubmit && (
                      <FormHelperText error>
                        {errorData?.email?.message}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <label className="d-block form-field-title">Address</label>
                    <TextField
                      name="address"
                      variant="outlined"
                      fullWidth
                      className="form-text-field"
                      placeholder="Address"
                      multiline
                      rows={4}
                      value={address}
                      onChange={handleValueChange}
                      error={!errorData.address.isValid && isSubmit}
                    />
                    {isSubmit && (
                      <FormHelperText error>
                        {errorData?.address?.message}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} lg={6} md={6} sm={6}>
                    <label className="d-block form-field-title">Contact</label>
                    <OutlinedInput
                      name="phoneNumber"
                      className="form-text-field"
                      type="number"
                      fullWidth
                      placeholder="0000 0000 00"
                      value={phoneNumber}
                      onChange={handleValueChange}
                      error={!errorData.phoneNumber.isValid && isSubmit}
                    />
                    {isSubmit && (
                      <FormHelperText error>
                        {errorData?.phoneNumber?.message}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} lg={6} md={6} sm={6}>
                    <label className="d-block form-field-title">Zip code</label>
                    <TextField
                      name="zipCode"
                      variant="outlined"
                      fullWidth
                      className="form-text-field"
                      placeholder="000000"
                      type="number"
                      value={zipCode}
                      onChange={handleValueChange}
                      error={!errorData.zipCode.isValid && isSubmit}
                    />
                    {isSubmit && (
                      <FormHelperText error>
                        {errorData?.zipCode?.message}
                      </FormHelperText>
                    )}
                  </Grid>
                  <>
                    <Grid item>
                      <FormControlLabel
                        disabled={
                          props.defaultAddressData.status == status.SUCCESS &&
                          props.defaultAddressData?.data?.addressId === id
                        }
                        value={isChecked}
                        onChange={handleValueChange}
                        control={<Checkbox />}
                        label="Make This Default Address"
                      />
                    </Grid>
                  </>

                  <Grid item xs={6} lg={6} md={6} sm={6} marginTop={"25px"}>
                    <Link>
                      <Button
                        variant="outlined"
                        fullWidth
                        className="outline-common-btn"
                        onClick={() => navigate(-1)}
                      >
                        Cancel
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item xs={6} lg={6} md={6} sm={6} marginTop={"25px"}>
                    <Button
                      variant="contained"
                      fullWidth
                      className="common-btn"
                      onClick={handleSubmit}
                      disabled={
                        props.updateAddressState.status == status.IN_PROGRESS ||
                        props.setDefaultAddressData?.status ===
                          status.IN_PROGRESS
                      }
                      endIcon={
                        props.updateAddressState.status ===
                          status.IN_PROGRESS ||
                        props.setDefaultAddressData?.status ===
                          status.IN_PROGRESS ? (
                          <CircularProgress className="common-loader" />
                        ) : (
                          <></>
                        )
                      }
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const {
    updateAddress,
    allAddress,
    defaultAddressData,
    setDefaultAddressData,
  } = state.alladdress;
  return {
    updateAddressState: updateAddress,
    allAddress,
    defaultAddressData,
    setDefaultAddressData,
  };
};

const mapDispatchToProps = {
  updateAddress,
  getAllAddress,
  setDefaultAddress,
  fetchDefaultAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatedAddress);
