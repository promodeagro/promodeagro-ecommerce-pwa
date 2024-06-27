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
  Modal,
  Tabs,
  Tab,
  Divider,
  RadioGroup,
  Radio,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import productImg from "../../../../../assets/img/product-img.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const steps = ["Delivery Address", "Delivery Options", "Payment Option"];

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      activeStep: 0,
      value: 0,
      timneValue: 0,
    };
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  timingSlotHandleChange = (event, newTimeValue) => {
    this.setState({ timneValue: newTimeValue });
  };
  render() {
    const { activeStep, value, timneValue } = this.state;
    return (
      <Box className="address-container">
        <Container>
          <Box className="address-stepper-container">
            <Stepper activeStep alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          {activeStep === 0 ? (
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
                        3 Saint Georges Ct <br /> Trabuco
                        Canyon, California(CA),
                        <br /> 92679
                      </address>
                      <Box className="d-block contact-number">
                        <span className="d-block contact-heading">Contact</span>
                        <Box className="d-flex align-items-center">
                          <span className="d-block title">Phone</span>
                          <span className="d-block details">
                            (949) 713-6462
                          </span>
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
                        3 Saint Georges Ct <br /> Trabuco
                        Canyon, California(CA),
                        <br /> 92679
                      </address>
                      <Box className="d-block contact-number">
                        <span className="d-block contact-heading">Contact</span>
                        <Box className="d-flex align-items-center">
                          <span className="d-block title">Phone</span>
                          <span className="d-block details">
                            (949) 713-6462
                          </span>
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
                  >
                    Proceed Next
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box className="select-delivery-option-container">
              <Grid container spacing={2} data-aos="zoom-in-down">
                <Grid item xs={8}>
                  <Box className="delivery-option-details">
                    <h3>Select a delivery option</h3>
                    <Box className="delivery-inner-box">
                      <Box className="d-flex align-items-center">
                        <Box className="product-img-box">
                          <img src={productImg} alt="" />
                        </Box>
                        <Box className="product-img-box">
                          <img src={productImg} alt="" />
                        </Box>
                        <Box className="product-img-box">
                          <img src={productImg} alt="" />
                        </Box>
                        <Box className="view-all-img-box">
                          <span className="d-block">View all 3 items </span>
                        </Box>
                      </Box>
                      <Box
                        className="delivery-slot-select"
                        onClick={this.handleOpen}
                      >
                        <span className="title">Delivery Slot</span>
                        <Box className="d-flex align-items-center justify-content-between w-100">
                          <Box className="d-flex align-items-center">
                            <AccessTimeIcon className="time-icon" />
                            <span className="d-block slot-time">
                              28 May, Tue, Between 2:00 PM - 5:00 PM
                            </span>
                          </Box>
                          <KeyboardArrowDownIcon className="down-arrow-icon" />
                        </Box>
                      </Box>
                      <Box className="w-100 justify-content-end d-flex">
                        <Button
                          variant="contained"
                          fullWidth
                          className="common-btn proceed-payment-btn"
                        >
                          Proceed to payment
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="order-summary-container">
                    <h3 className="order-title">Order Summary</h3>
                    <Box className="product-list d-flex align-items-center justify-content-between">
                      <span className="d-block product-name">Green chilli</span>
                      <span className="d-block product-weight">x 200gm</span>
                    </Box>
                    <Box className="product-list d-flex align-items-center justify-content-between">
                      <span className="d-block product-name">Tomato</span>
                      <span className="d-block product-weight">x 2 Pack</span>
                    </Box>
                    <Box className="product-list d-flex align-items-center justify-content-between">
                      <span className="d-block product-name">Capsicum</span>
                      <span className="d-block product-weight">x 2 Piece</span>
                    </Box>
                    <Box className="product-list d-flex align-items-center justify-content-between">
                      <span className="d-block product-name">Green Apple</span>
                      <span className="d-block product-weight">x 2 Kg</span>
                    </Box>
                    <Box className="total-amount d-flex align-items-center justify-content-between">
                      <span className="d-block heading">
                        Total Amount Payable{" "}
                      </span>
                      <span className="d-block amount">₹ 200.12</span>
                    </Box>
                    <Box className="total-saving d-flex align-items-center justify-content-between">
                      <span className="d-block heading">Total Savings </span>
                      <span className="d-block amount">₹ 200.12</span>
                    </Box>
                    <Box className="information d-flex ">
                      <InfoIcon className="info-icon" />
                      <p className="d-block text">
                        Select your address and delivery slot to know accurate
                        delivery charges. You can save more by applying a
                        voucher!
                      </p>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </Container>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          data-aos="flip-left"
        >
          <Box className="common-modal select-slot-modal-container">
            <Box className="modal-header">
              <Box className="d-flex align-items-center justify-content-between w-100">
                <h3 className="modal-title">Delivery Slot</h3>
                <IconButton aria-label="close" onClick={this.handleClose}>
                  <CloseIcon className="modal-close-icon" />
                </IconButton>
              </Box>
            </Box>
            <Box className="modal-body">
              <Box className="days-slot-tab">
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Today" />
                  <Tab label="Tomorrow " />
                  <Tab label="30-05-2024" />
                </Tabs>
              </Box>
              <Divider />
              <Box className="slot-timing-tab">
                <Tabs
                  value={this.state.timneValue}
                  onChange={this.timingSlotHandleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="All Slots" />
                  <Tab label="Afternoon " />
                  <Tab label="Evening" />
                </Tabs>
              </Box>
              {timneValue === 0 ? (
                <Box className="time-slot-checkbox">
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <FormControlLabel
                          value="afternoonSlot"
                          control={<Radio />}
                          label="2:00 PM - 4:00 PM"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <FormControlLabel
                          value="eveningSlot"
                          control={<Radio />}
                          label="4:00 PM - 6:00 PM"
                        />
                      </Grid>
                    </Grid>
                  </RadioGroup>
                </Box>
              ) : (
                ""
              )}
            </Box>
          </Box>
        </Modal>
      </Box>
    );
  }
}

export default Address;
