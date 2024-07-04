import React, { Component } from "react";
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

class AddNewAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryCode: "",
    };
  }

  countryCodeHandleChange = (event) => {
    this.setState({ countryCode: event.target.value });
  };

  render() {
    return (
      <Container>
        <Box
          className="add-new-address-container"
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="400"
        >
          <Box className="address-details ">
            <h2>Add new address</h2>
            <Box className="form-info">
              <Grid container spacing={2}>
                <Grid item xs={12} lg={6} md={6} sm={6}>
                  <label className="d-block form-field-title">Name</label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    className="form-text-field"
                    placeholder="John doe"
                  />
                </Grid>
                <Grid item xs={12} lg={6} md={6} sm={6}>
                  <label className="d-block form-field-title">Name</label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    className="form-text-field"
                    placeholder="John doe@gmail.com"
                  />
                </Grid>
                <Grid item xs={12}>
                  <label className="d-block form-field-title">Address</label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    className="form-text-field"
                    placeholder="Address"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} lg={6} md={6} sm={6}>
                  <label className="d-block form-field-title">Contact</label>
                  <OutlinedInput
                    className="form-text-field"
                    type="number"
                    fullWidth
                    id="outlined-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">
                        <Select
                          className="country-select-box"
                          value={this.state.countryCode}
                          onChange={this.countryCodeHandleChange}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value="">
                            <em>IN</em>
                          </MenuItem>
                          <MenuItem value={10}>IN</MenuItem>
                          <MenuItem value={20}>USA</MenuItem>
                          <MenuItem value={30}>NZ</MenuItem>
                        </Select>
                      </InputAdornment>
                    }
                    placeholder="+91 0000 0000000"
                  />
                </Grid>
                <Grid item xs={12} lg={6} md={6} sm={6}>
                  <label className="d-block form-field-title">Country</label>
                  <Select
                    className="common-select-box"
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={this.state.countryCode}
                    onChange={this.countryCodeHandleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} lg={6} md={6} sm={6}>
                  <label className="d-block form-field-title">Zip code</label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    className="form-text-field"
                    placeholder="000000"
                    type="number"
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
                  <Button
                    variant="outlined"
                    fullWidth
                    className="outline-common-btn"
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={6} lg={6} md={6} sm={6} marginTop={"25px"}>
                  <Button variant="contained" fullWidth className="common-btn ">
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    );
  }
}

export default AddNewAddress;
