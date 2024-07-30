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
  Autocomplete,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  postAddress,
  getAllAddress,
  setDefaultAddress,
} from "../../../../../Redux/Address/AddressThunk";
import status from "../../../../../Redux/Constants";
import { loginDetails } from "Views/Utills/helperFunctions";
import { Link } from "react-router-dom";
import {
  ErrorMessages,
  ValidationEngine,
} from "../../../../Utills/helperFunctions";
import { connect } from "react-redux";

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
  mobileNumber: [
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

const AddNewAddress = (props) => {
  const [apiLoader, setApiLoader] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    zipCode: "",
    isSubmit: false,
  });

  const postAddressStatus = useSelector(
    (state) => state.alladdress.postAddress.status
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [defaultAddApiLoader, setDefaultApiLoader] = useState(false);

  useEffect(() => {
    if (
      props.setDefaultAddressData?.status === status.SUCCESS &&
      defaultAddApiLoader &&
      props.setDefaultAddressData?.data
    ) {
      setDefaultApiLoader(false);
      props.handleModal(false, true);
      setIsChecked(false);
    }
  }, [props.setDefaultAddressData?.status]);

  useEffect(() => {
    if (
      postAddressStatus === status.SUCCESS &&
      apiLoader &&
      formData.isSubmit
    ) {
      setApiLoader(false);
      if (isChecked) {
        setDefaultApiLoader(true);
        props?.setDefaultAddress({
          userId: loginDetails()?.userId,
          addressId: props.postAddress?.data?.addressId,
        });
      } else if (!isChecked) {
        setFormData({
          ...formData,
          isSubmit: false,
          name: "",
          email: "",
          address: "",
          mobileNumber: "",
          zipCode: "",
        });
        props.handleModal(false);
      }

      //   navigate("/mycart/address");
    }
  }, [postAddressStatus]);

  const validateForm = () => {
    const { name, email, address, mobileNumber, zipCode } = formData;
    const error = ValidationEngine.validate(validationSchema, {
      name,
      email,
      address,
      mobileNumber,
      zipCode,
    });
    return error;
  };

  const handleSubmit = () => {
    const items = loginDetails();
    setApiLoader(true);
    const { name, email, address, mobileNumber, zipCode } = formData;

    const errorData = validateForm();
    setFormData({
      ...formData,
      isSubmit: true,
    });

    if (errorData.isValid) {
      dispatch(
        postAddress({
          userId: items.userId,
          address: {
            name,
            email,
            address,
            phoneNumber: mobileNumber,
            zipCode,
          },
        })
      );
    }
  };

  const handleValueChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;
    if (type === "checkbox") {
      setIsChecked(val);
    } else {
      setFormData({
        ...formData,
        [name]: val,
      });
    }
  };

  const errorData = validateForm();

  return (
    <Box className="add-address-container">
      <Grid container spacing={2} alignItems={"center"}>
        <Grid item xs={12} lg={6} md={6} sm={6}>
          <Box className="textfield">
            <label>Name</label>
            <TextField
              className="input"
              variant="outlined"
              fullWidth
              name="name"
              value={formData.name}
              type="text"
              onChange={handleValueChange}
              error={!errorData?.name?.isValid && formData.isSubmit}
            />
            {formData.isSubmit && (
              <FormHelperText error>{errorData?.name?.message}</FormHelperText>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} lg={6} md={6} sm={6}>
          <Box className="textfield">
            <label className="d-block">Email</label>
            <TextField
              className="input"
              variant="outlined"
              fullWidth
              name="email"
              value={formData.email}
              type="text"
              onChange={handleValueChange}
              error={!errorData?.email?.isValid && formData.isSubmit}
            />
            {formData.isSubmit && (
              <FormHelperText error>{errorData?.email?.message}</FormHelperText>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} lg={12} md={12} sm={12}>
          <Box className="textfield">
            <label className="d-block">Address</label>
            <TextField
              className="input"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              name="address"
              value={formData.address}
              type="text"
              onChange={handleValueChange}
              error={!errorData.address.isValid && formData.isSubmit}
            />
            {formData.isSubmit && (
              <FormHelperText error>
                {errorData?.address?.message}
              </FormHelperText>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} lg={6} md={6} sm={6}>
          <Box className="textfield">
            <label className="d-block">Contact</label>
            <TextField
              className="input"
              variant="outlined"
              fullWidth
              name="mobileNumber"
              value={formData.mobileNumber}
              type="text"
              onChange={handleValueChange}
              error={!errorData?.mobileNumber?.isValid && formData.isSubmit}
            />
            {formData.isSubmit && (
              <FormHelperText error>
                {errorData?.mobileNumber?.message}
              </FormHelperText>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} lg={6} md={6} sm={6}>
          <Box className="textfield">
            <label className="d-block">Zip Code</label>
            <TextField
              className="input"
              variant="outlined"
              fullWidth
              name="zipCode"
              value={formData.zipCode}
              type="text"
              onChange={handleValueChange}
              error={!errorData?.zipCode?.isValid && formData.isSubmit}
            />
            {formData.isSubmit && (
              <FormHelperText error>
                {errorData?.zipCode?.message}
              </FormHelperText>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} lg={12} md={12} sm={12}>
          <FormControlLabel
            value={isChecked}
            onChange={handleValueChange}
            control={<Checkbox />}
            label="Make This Default Address"
          />
        </Grid>
        <Grid item xs={12} lg={6} md={6} sm={6}>
          <Button
            className="common-btn save-address-btn"
            variant="contained"
            disabled={
              props.postAddress.status == status.IN_PROGRESS ||
              props.setDefaultAddressData === status.IN_PROGRESS
            }
            endIcon={
              props.postAddress.status === status.IN_PROGRESS ||
              props.setDefaultAddressData === status.IN_PROGRESS ? (
                <CircularProgress className="common-loader" />
              ) : (
                <></>
              )
            }
            onClick={() => handleSubmit()}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

function mapStateToProps(state) {
  const { postAddress, setDefaultAddressData } = state.alladdress;
  return { postAddress, setDefaultAddressData };
}

const mapDispatchToProps = {
  getAllAddress,
  setDefaultAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewAddress);
