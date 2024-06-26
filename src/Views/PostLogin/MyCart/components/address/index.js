import React, { Component } from "react";
import {
  Box,
  Container,
  StepLabel,
  Step,
  Stepper,
  IconButton,
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
const steps = ["Delivery Address", "Delivery Options", "Payment Option"];

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Box className="address-container">
        <Container>
          <Box className="address-stepper-container">
            <Stepper activeStep={1} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <Box className="address-select-container">
            <Box className="address-details">
              <Box className="d-block contain">
                <h2>Select a location for delivery</h2>
                <p>
                  Choose your address location to see product availablity and
                  delivery option
                </p>
              </Box>
              <Grid container spacing={4} alignItems={"center"}>
                <Grid item xs={4}>
                  <Box
                    className="address-card-container active"
                    data-aos="zoom-in-down"
                  >
                    <Box className="active-check">
                      <CheckIcon />
                    </Box>
                    <Box className="d-flex align-items-center">
                      <IconButton
                        aria-label="edit"
                        className="address-btn active"
                      >
                        <BorderColorIcon />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        className="address-btn active"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <h3 className="person-name">John Doe</h3>
                    <address>
                      3 Saint Georges Ct <br /> Trabuco Canyon, California(CA),
                      <br /> 92679
                    </address>
                    <Box className="d-block contact-number">
                      <span className="d-block contact-heading">Contact</span>
                      <Box className="d-flex align-items-center">
                        <span className="d-block title">Phone</span>
                        <span className="d-block details">(949) 713-6462</span>
                      </Box>
                      <Box className="d-flex align-items-center">
                        <span className="d-block title">Email </span>
                        <span className="d-block details">
                          Johndoe@mail.com
                        </span>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box
                    className="address-card-container "
                    data-aos="zoom-in-down"
                  >
                    <Box className="d-flex align-items-center">
                      <IconButton aria-label="edit" className="address-btn ">
                        <BorderColorIcon />
                      </IconButton>
                      <IconButton aria-label="edit" className="address-btn ">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <h3 className="person-name">John Doe</h3>
                    <address>
                      3 Saint Georges Ct <br /> Trabuco Canyon, California(CA),
                      <br /> 92679
                    </address>
                    <Box className="d-block contact-number">
                      <span className="d-block contact-heading">Contact</span>
                      <Box className="d-flex align-items-center">
                        <span className="d-block title">Phone</span>
                        <span className="d-block details">(949) 713-6462</span>
                      </Box>
                      <Box className="d-flex align-items-center">
                        <span className="d-block title">Email </span>
                        <span className="d-block details">
                          Johndoe@mail.com
                        </span>
                      </Box>
                    </Box>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Make This Default Address"
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="outlined"
                    fullWidth
                    className="outline-common-btn"
                    startIcon={<AddIcon />}
                  >
                    Add New Address
                  </Button>
                </Grid>
              </Grid>
              <Box className="d-flex justify-content-end w-100">
                <Button
                  variant="contained"
                  fullWidth
                  className="common-btn proceed-btn"
                >
                  Proceed Next
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default Address;
