import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormHelperText, Grid, ListItem, ListItemText, Tab, Tabs, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import careerIcon from "../../../../assets/img/careerIcon.svg"
import LocationIcon from "../../../../assets/img/LocationImg.svg"
import { ErrorMessages, loginDetails, ValidationEngine } from 'Views/Utills/helperFunctions'
import { connect, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { postAddress, setDefaultAddress } from '../../../../Redux/Address/AddressThunk'
import status from '../../../../Redux/Constants'

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
    const [tabIndex, setTabIndex] = useState(0);
    const {open,handleClose} = props
    const [apiLoader, setApiLoader] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [defaultAddApiLoader, setDefaultApiLoader] = useState(false);
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      address: "",
      phoneNumber: "",
      zipCode: "",
      isSubmit: false,
    });

    // Handle tab change
    const handleTabChange = (event, newValue) => {
      setTabIndex(newValue);
    };


    const dispatch = useDispatch();
    const navigate = useNavigate();

    
  useEffect(() => {
    if (
      props.postAddress.status === status.SUCCESS &&
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
      } else {
        setFormData({
          ...formData,
          isSubmit: false,
          name: "",
          email: "",
          address: "",
          phoneNumber: "",
          zipCode: "",
        });
     
      }
      handleClose()
      ErrorMessages.success("Add Address Successfully");
    }
  }, [props.postAddress.status]);



  useEffect(() => {
    if (
      props.setDefaultAddressData?.status === status.SUCCESS &&
      defaultAddApiLoader &&
      props.setDefaultAddressData?.data
    ) {
      setIsChecked(false);
      navigate(-1);
    }
  }, [props.setDefaultAddressData?.status]);

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
    if (type === "checkbox") {
      setIsChecked(val);
    } else {
      setFormData({
        ...formData,
        [name]: val,
      });
    }
  };

  const { name, email, address, phoneNumber, zipCode, isSubmit } = formData;
  const errorData = validateForm();
  return (
    // common-modal
   <Box className="not_common_modal select_your_address_popup">
<h2 >Select Your Address</h2>
<Box className="address_container">
<span><img src={careerIcon} alt="" /> <span>Your Current Location</span> </span>
<span><img src={LocationIcon}  alt="" /> <span>Flat 205, Apollo Apartment, Near Shadan College, Suncity, Hyderabad.500081</span> </span>
</Box>

      {/* Tabs Section */}
      <Tabs  value={tabIndex} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
        <Tab   sx={{
          '& .MuiTab-root': {
            color: '#757575', // Default text color for inactive tabs
          },
          '& .Mui-selected': {
            color: '#00796b', // Active tab text color (dark teal)
          },
          '& .MuiTabs-indicator': {
            bgcolor: '#00796b', // Indicator color (dark teal)
          },
        }}  label="Apartment" />
        <Tab label="Individual House" />
      </Tabs>

      {/* Tab Content */}
      <Box >
        {tabIndex === 0 && (
          <Box sx={{display:'flex' ,height:'150px', justifyContent:"center" , alignItems:"center"}} className="apartments_container">
   No Data Found

          </Box>
        )}
        {tabIndex === 1 && (
          <Box>
            <Grid container spacing={2} alignItems={"center"}>
        <Grid item xs={12} lg={6} md={6} sm={6}>
          <Box className="textfield">
            <label className='d-block select_address_labels' >Name</label>
            <TextField
              className="input"
              variant="outlined"
              fullWidth
              name="name"
              type="text"
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
          </Box>
        </Grid>

        <Grid item xs={12} lg={6} md={6} sm={6}>
          <Box className="textfield">
            <label className="d-block select_address_labels">Email</label>
            <TextField
              className="input"
              variant="outlined"
              fullWidth
              name="email"
              type="text"
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
          </Box>
        </Grid>
        <Grid item xs={12} lg={12} md={12} sm={12}>
          
        </Grid>
        <Grid item xs={12}>
          <Box className="textfield">
            <label className="d-block select_address_labels">Address</label>
            <TextField
              className="input"
              variant="outlined"
              fullWidth
              name="address"
              type="text"
              placeholder="Address"
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
          </Box>
        </Grid>
        <Grid item xs={12} lg={6} md={6} sm={6}>
          <Box className="textfield">
            <label className="d-block select_address_labels">Contact</label>
            <TextField
              className="input"
              variant="outlined"
              fullWidth
              name="phoneNumber"
              type="number"
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
          </Box>
        </Grid>
        <Grid item xs={12} lg={6} md={6} sm={6}>
          <Box className="textfield">
            <label className="d-block select_address_labels">Zip code</label>
            <TextField
              className="input"
              variant="outlined"
              fullWidth
              name="zipCode"
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
                  variant="contained"
                  fullWidth
                  className="common-btn"
                  onClick={handleSubmit}
                  disabled={
                    props.postAddress.status == status.IN_PROGRESS ||
                    props.setDefaultAddressData?.status === status.IN_PROGRESS
                  }
                  endIcon={
                    props.postAddress.status === status.IN_PROGRESS ||
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
        )}
      </Box>


   </Box>
  )
}


function mapStateToProps(state) {
    const { postAddress, setDefaultAddressData } = state.alladdress;
    return { postAddress, setDefaultAddressData };
  }
  
  const mapDispatchToProps = {
    setDefaultAddress,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddNewAddress);
  

