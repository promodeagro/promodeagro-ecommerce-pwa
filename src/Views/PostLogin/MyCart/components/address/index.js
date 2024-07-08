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
  TextField,
} from "@mui/material";
import productImg from "../../../../../assets/img/product-img.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import cardTypeImg1 from "../../../../../assets/img/visa-logo.png";
import cardTypeImg2 from "../../../../../assets/img/stripe.png";
import cardTypeImg3 from "../../../../../assets/img/mastercard.png";
import cashOnDeliveryImg from "../../../../../assets/img/cash.png";
import paypalImg from "../../../../../assets/img/pay-pal.png";
import upiImg1 from "../../../../../assets/img/amazon-pay.png";
import upiImg2 from "../../../../../assets/img/g-pay.png";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AllAddress from "./conponents/allAddress";
import { connect } from "react-redux"
import status from "../../../../../Redux/Constants";
import { fetchCartItems } from "../../../../../Redux/Cart/CartThunk";
import { loginDetails } from "Views/Utills/helperFunctions";
const steps = ["Delivery Address", "Delivery Options", "Payment Option"];
const label = { inputProps: { "aria-label": "Checkbox demo" } };

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      activeStep: 0,
      value: 0,
      timneValue: 0,
      cartList: [],
      totalPrice: "",
      address: "",
      addressId: "",
    };
  }

  componentDidMount() {
    const items = loginDetails();

    this.props.fetchCartItems({
      userId: items.userId,
    });
  }




  componentDidUpdate(prevProps, prevState) {

    if (
      prevProps.cartItems.status !== this.props.cartItems.status &&
      this.props.cartItems.status === status.SUCCESS &&
      this.props.cartItems.data
    ) {
      let price = 0;
      for (let i = 0; i < this.props.cartItems.data.items.length; i++) {
        let item = this.props.cartItems.data.items[i]

        if (item?.Subtotal) {
          price += item.Subtotal

        }
      }
      this.setState({
        totalPrice: price,
        cartList: this.props.cartItems.data.items,
      });
    }
    if (
      prevProps.allAddress?.status !== this.props.allAddress?.status &&
      this.props.allAddress?.status === status.SUCCESS &&
      this.props.allAddress.data
    ) {

      debugger

      this.setState(
        {
          addressId: "",
          address: ""
        }
      )
    }




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

  handleTabs = (value, selectedAddress) => {
    debugger
    this.setState({
      activeStep: value
    })
  }

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
            <AllAddress handleTabs={this.handleTabs} />
          ) : activeStep === 1 ? (
            <Box className="select-delivery-option-container">
              <Grid container spacing={2} data-aos="zoom-in-down">
                <Grid item xs={12} lg={8} md={12} sm={12}>
                  <Box className="delivery-option-details">
                    <h3>Select a delivery option</h3>
                    <Box className="delivery-inner-box">
                      <Box className="d-flex align-items-center flex-wrap">
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
                <Grid item xs={12} lg={4} md={12} sm={12}>
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
          ) : activeStep === 2 ? (
            <Box
              className="payment-option-container"
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
            >
              <Box className="payment-details">
                <Box className="payment-option-box active">
                  <Box className="d-flex align-items-center justify-content-between">
                    <Box className="d-flex align-items-center">
                      <Checkbox
                        {...label}
                        defaultChecked
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<CheckCircleIcon />}
                      />
                      <span className="d-block payment-title">
                        Pay with Credit Card
                      </span>
                    </Box>
                    <Box className="d-flex align-items-center">
                      <Box className="card-type-img">
                        <img src={cardTypeImg1} alt="cart-type" />
                      </Box>
                      <Box className="card-type-img">
                        <img src={cardTypeImg2} alt="cart-type" />
                      </Box>
                      <Box className="card-type-img">
                        <img src={cardTypeImg3} alt="cart-type" />
                      </Box>
                    </Box>
                  </Box>
                  <Grid container spacing={2} marginTop={"8px"}>
                    <Grid item xs={12} lg={9} md={9} sm={9}>
                      <label className="d-block form-field-title">
                        Name on card
                      </label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        className="form-text-field"
                        placeholder="Olivia Rhye"
                      />
                    </Grid>
                    <Grid item xs={12} lg={3} md={3} sm={3}>
                      <label className="d-block form-field-title">Expiry</label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        className="form-text-field"
                        placeholder="06 / 2024"
                      />
                    </Grid>
                    <Grid item xs={12} lg={9} md={9} sm={9}>
                      <label className="d-block form-field-title">
                        Card number
                      </label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        className="form-text-field"
                        placeholder="Olivia Rhye"
                      />
                    </Grid>
                    <Grid item xs={12} lg={3} md={3} sm={3}>
                      <label className="d-block form-field-title">CVV</label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        type="password"
                        className="form-text-field"
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Box className="payment-option-box ">
                  <Box className="d-flex justify-content-between align-items-flex-start">
                    <Box className="d-flex align-items-flex-start">
                      <Checkbox
                        {...label}
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<CheckCircleIcon />}
                      />
                      <Box className="d-block">
                        <span className="d-block payment-title">UPI</span>
                        <p className="d-block info">
                          Unlimited users and unlimited individual data.
                        </p>
                      </Box>
                    </Box>
                    <Box className="d-flex align-items-center">
                      <Box className="card-type-img">
                        <img src={upiImg1} alt="cart-type" />
                      </Box>
                      <Box className="card-type-img">
                        <img src={upiImg2} alt="cart-type" />
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className="payment-option-box ">
                  <Box className="d-flex justify-content-between align-items-flex-start">
                    <Box className="d-flex align-items-flex-start">
                      <Checkbox
                        {...label}
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<CheckCircleIcon />}
                      />
                      <Box className="d-block">
                        <span className="d-block payment-title">Paypal</span>
                        <p className="d-block info">
                          You will be redirected to the PayPal website after
                          submitting your order{" "}
                        </p>
                      </Box>
                    </Box>
                    <Box className="d-flex align-items-center">
                      <Box className="card-type-img">
                        <img src={paypalImg} alt="cart-type" />
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className="payment-option-box ">
                  <Box className="d-flex justify-content-between align-items-flex-start">
                    <Box className="d-flex align-items-flex-start">
                      <Checkbox
                        {...label}
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<CheckCircleIcon />}
                      />
                      <Box className="d-block">
                        <span className="d-block payment-title">
                          Cash on delivery
                        </span>
                        <p className="d-block info">
                          You will be redirected to the PayPal website after
                          submitting your order{" "}
                        </p>{" "}
                      </Box>
                    </Box>
                    <Box className="d-flex align-items-center">
                      <Box className="card-type-img">
                        <img src={cashOnDeliveryImg} alt="cart-type" />
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className="w-100 d-flex justify-content-end">
                  <Link to={"/myCart/address/order-placed"}>
                    <Button
                      variant="contained"
                      fullWidth
                      className="common-btn place-order-btn"
                    >
                      Place Order
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Box>
          ) : (
            ""
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
                      <Grid item xs={12} lg={4} md={4} sm={6}>
                        <FormControlLabel
                          value="afternoonSlot"
                          control={<Radio />}
                          label="2:00 PM - 4:00 PM"
                        />
                      </Grid>
                      <Grid item xs={12} lg={4} md={4} sm={6}>
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



function mapStateToProps(state) {
  const { cartItems } = state.cartitem;
  const { allAddress } = state.alladdress;
  const { loginData } = state.login;
  return { cartItems, loginData, allAddress };
}

const mapDispatchToProps = {
  fetchCartItems
};

export default connect(mapStateToProps, mapDispatchToProps)(Address);

