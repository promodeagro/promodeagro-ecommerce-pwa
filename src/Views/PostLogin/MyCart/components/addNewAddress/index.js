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

const AddNewAddress = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [countryCode, setCountryCode] = useState("IN");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [apiLoader, setApiLoader] = useState(false)

  const postAddressStatus = useSelector((state) => state.alladdress.postAddress.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (postAddressStatus === status.SUCCESS && apiLoader) {
      setApiLoader(false)

      navigate("/myCart/address");
    }
  }, [postAddressStatus, dispatch, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "contact":
        setContact(value);
        break;
      case "countryCode":
        setCountryCode(value);
        break;
      case "country":
        setCountry(value);
        break;
      case "zipCode":
        setZipCode(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    const items = loginDetails();
    setApiLoader(true);
    dispatch(postAddress({
      userId: items.userId,
      address: {
        name,
        email,
        address,
        contact,
        country,
        zipCode,
      },
    }));

  };

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
                  onChange={handleChange}
                />
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
                  onChange={handleChange}
                />
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
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} lg={6} md={6} sm={6}>
                <label className="d-block form-field-title">Contact</label>
                <OutlinedInput
                  name="contact"
                  className="form-text-field"
                  type="number"
                  fullWidth
                  startAdornment={
                    <InputAdornment position="start">
                      <Select
                        className="country-select-box"
                        value={countryCode}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ name: "countryCode" }}
                      >
                        <MenuItem value="IN">IN</MenuItem>
                        <MenuItem value="USA">USA</MenuItem>
                        <MenuItem value="NZ">NZ</MenuItem>
                      </Select>
                    </InputAdornment>
                  }
                  placeholder="+91 0000 0000000"
                  value={contact}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} lg={6} md={6} sm={6}>
                <label className="d-block form-field-title">Country</label>
                <Select
                  className="common-select-box"
                  value={country}
                  onChange={handleChange}
                  inputProps={{ name: "country" }}
                >
                  <MenuItem value="Ten">Ten</MenuItem>
                  <MenuItem value="Twenty">Twenty</MenuItem>
                  <MenuItem value="Thirty">Thirty</MenuItem>
                </Select>
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
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} lg={6} md={6} sm={6}>
                <Button
                  variant="contained"
                  fullWidth
                  className="common-btn location-btn"
                  endIcon={<LocationOnIcon />}
                >
                  Current Location
                </Button>
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

export default AddNewAddress;
