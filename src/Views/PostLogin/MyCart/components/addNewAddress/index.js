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
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  postAddress,
  getAllAddress,
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

const AddNewAddress = (props) => {
  const [apiLoader, setApiLoader] = useState(false);

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

  useEffect(() => {
    if (
      postAddressStatus === status.SUCCESS &&
      apiLoader &&
      formData.isSubmit
    ) {
      setApiLoader(false);
      setFormData({
        ...formData,
        isSubmit: false,
        name: "",
        email: "",
        address: "",
        phoneNumber: "",
        zipCode: "",
      });
      navigate("/myCart/address");
      ErrorMessages.success("Add Address Successfully");
    }
  }, [postAddressStatus, dispatch, navigate]);

  const validateForm = () => {
    const { name, email, address, phoneNumber, zipCode } = formData;
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
    const items = loginDetails();
    setApiLoader(true);
    const { name, email, address, phoneNumber, zipCode } = formData;

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
            phoneNumber,
            zipCode,
          },
        })
      );
    }
  };

  const handleValueChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: val,
    });
  };

  const { name, email, address, phoneNumber, zipCode, isSubmit } = formData;
  const errorData = validateForm();

  return (
    <Container>
      <Box
        className="add-new-address-container"
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="400"
      >
        <Box className="address-details">
          <h2>Add new address</h2>
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
              <Grid item xs={6} lg={6} md={6} sm={6} marginTop={"25px"}>
                <Link to={"/myCart/address"}>
                  <Button
                    variant="outlined"
                    fullWidth
                    className="outline-common-btn"
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
                  disabled={props.postAddress.status == status.IN_PROGRESS}
                  endIcon={
                    props.postAddress.status === status.IN_PROGRESS ? (
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
  );
};

function mapStateToProps(state) {
  const { postAddress } = state.alladdress;
  return { postAddress };
}

const mapDispatchToProps = {
  getAllAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewAddress);
