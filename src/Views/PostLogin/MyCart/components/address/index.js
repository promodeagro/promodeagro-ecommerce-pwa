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
  Button,
  Modal,
  Tabs,
  Tab,
  Divider,
  RadioGroup,
  Radio,
  CircularProgress,
} from "@mui/material";
import _ from "lodash";
import { productDetailsData } from "../../../../../Redux/AllProducts/AllProductSlice";
import { fetchAvailableDeliverySlot } from "../../../../../Redux/Order/PlaceOrderThunk";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import AllAddress from "./conponents/allAddress";
import { connect } from "react-redux";
import status from "../../../../../Redux/Constants";
import { fetchCartItems } from "../../../../../Redux/Cart/CartThunk";
import { placeOrder } from "../../../../../Redux/Order/PlaceOrderThunk";
import { fetchDefaultAddress } from "../../../../../Redux/Address/AddressThunk";
import {
  ErrorMessages,
  Loader,
  loginDetails,
} from "Views/Utills/helperFunctions";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
const steps = ["Delivery Address", "Delivery Options"];
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const futureDate = () => {
  let currentDate = new Date();

  currentDate.setDate(currentDate.getDate() + 2);

  let year = currentDate.getFullYear();
  let month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  let day = currentDate.getDate().toString().padStart(2, "0");

  let futureDate = `${year}-${month}-${day}`;
  return futureDate;
};
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
      totalSavings: "",
      skipped: new Set(),
      itemList: [],
      defaultSelectedAddress: {},
      deliverySlot: "today",
      deliverySlotData: [],
      selectedDeliverySlot: "",
      slots: [],
      id: 0,
    };
  }

  componentDidMount() {
    this.getDefaultAddress();

    if (window?.location?.pathname === "/myCart/address/order-details") {
      this.props.fetchAvailableDeliverySlot(this.state?.deliverySlot);
    }

    const tab = localStorage.getItem("selectedTab");
    if (
      (tab &&
        this.state.activeStep != tab &&
        window.location.pathname == "/mycart/address/order-details") ||
      window.location.pathname == "/mycart/payment-details" ||
      window.location.pathname == "/myCart/address/order-details"
    ) {
      if (window.location.pathname == "/mycart/address/order-details") {
        this.props.fetchAvailableDeliverySlot(this.state?.deliverySlot);
      }
      this.setState({
        activeStep: parseInt(tab),
      });
    }

    const items = loginDetails();
    if (items?.userId) {
      this.props.fetchCartItems({
        userId: items?.userId,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.deliverySlotData?.status !==
        this.props?.deliverySlotData?.status &&
      this.props?.deliverySlotData?.status === status.SUCCESS &&
      this.props?.deliverySlotData?.data
    ) {
      this.setState({
        deliverySlotData: this.props?.deliverySlotData?.data,
        selectedDeliverySlot: this.props?.deliverySlotData?.data[0],
        slots: this.props?.deliverySlotData?.data,
        timneValue: 0,
      });
    }
    if (
      prevProps.defaultAddressData?.status !==
        this.props?.defaultAddressData?.status &&
      this.props?.defaultAddressData?.status === status.SUCCESS &&
      this.props?.defaultAddressData?.data
    ) {
      this.setState({
        defaultSelectedAddress: this.props?.defaultAddressData?.data,
      });
      // localStorage.setItem(
      //   "address",
      //   this.props?.defaultAddressData?.data?.addressId
      // );
    }

    if (
      prevProps.cartItems.status !== this.props.cartItems.status &&
      this.props.cartItems.status === status.SUCCESS &&
      this.props.cartItems.data
    ) {
      let cartListData = [];
      let itemListData = [];
      this.props.cartItems.data.items.forEach((item) => {
        let data = {
          mrp: item.Mrp,
          price: item.Price,
          id: item.ProductId,
          Quantity: item.Quantity,
          savingsPercentage: item.Savings,
          subtotal: item.Subtotal,
          userId: item.UserId,
          image: item.productImage,
          name: item.productName,
        };

        let data1 = {
          productId: item.ProductId,
          quantity: item.Quantity,
          quantityUnits: item.QuantityUnits,
        };
        itemListData.push(data1);
        cartListData.push(data);
      });

      this.setState({
        totalPrice: this.props.cartItems.data.subTotal,
        totalSavings: this.props.cartItems.data.savings,
        cartList: cartListData,
        itemList: itemListData,
      });
    }

    if (
      prevProps.placeOrderData.status !== this.props.placeOrderData.status &&
      this.props.placeOrderData.status === status.SUCCESS &&
      this.props.placeOrderData.data
    ) {
      if (this.props.placeOrderData.data.orderId) {
        localStorage.removeItem("selectedTab");
        localStorage.removeItem("address");
        ErrorMessages.success(this.props.placeOrderData.data.message);

        this.props.navigate(
          `/mycart/address/order-placed/${this.props.placeOrderData.data.orderId}`
        );
      } else {
      }
    }
  }

  handlePlaceOrder = () => {
    let login = loginDetails();
    let addressId = localStorage.getItem("address");
    const {
      totalPrice,
      itemList,
      defaultSelectedAddress,
      cartListData,
      selectedDeliverySlot,
    } = this.state;
    let data = {
      addressId: addressId ? addressId : defaultSelectedAddress?.addressId,
      deliverySlotId: selectedDeliverySlot?.slotId,
      // paymentMethod: "",
      paymentDetails: {
        method: "Credit Card",
        transactionId: "txn-12345",
        amount: totalPrice,
        currency: "USD",
      },
      items: itemList,
      userId: login.userId,
    };
    this.props.placeOrder(data);
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
    if (newValue === 0) {
      this.props?.fetchAvailableDeliverySlot("today");
    } else if (newValue === 1) {
      this.props?.fetchAvailableDeliverySlot("tomorrow");
    } else {
      this.props?.fetchAvailableDeliverySlot(futureDate());
    }
  };
  timingSlotHandleChange = (event, newTimeValue) => {
    const { deliverySlotData } = this.state;
    this.setState({ timneValue: newTimeValue });
    if (newTimeValue == 0) {
      this.setState({
        slots: deliverySlotData,
      });

      // all slot
    } else if (newTimeValue == 1) {
      const afternoonSlots = deliverySlotData.filter((slot) => {
        const startTime24 = this.convertTimeTo24Hour(slot.startTime);

        return startTime24 >= 12 && startTime24 < 16;
      });

      this.setState({
        slots: afternoonSlots,
        // selectedDeliverySlot: afternoonSlots?.length ? afternoonSlots?.[0] : "",
      });
    } else if (newTimeValue == 2) {
      const eveningSlots = deliverySlotData.filter((slot) => {
        const startTime24 = this.convertTimeTo24Hour(slot.startTime);

        return startTime24 >= 16 && startTime24 <= 19;
      });

      this.setState({
        slots: eveningSlots,
      });
    }
  };

  convertTimeTo24Hour = (time) => {
    const [hours, minutes] = time.split(":");
    const period = time.slice(-2).toUpperCase();

    let hours24 = parseInt(hours, 10);

    if (period === "PM" && hours24 < 12) {
      hours24 += 12;
    } else if (period === "AM" && hours24 === 12) {
      hours24 = 0;
    }

    return hours24 + parseInt(minutes, 10) / 60;
  };

  handleTabs = (value, selectedAddress) => {
    this.setState({
      activeStep: value,
      selectedAddress: selectedAddress,
    });
  };
  getDefaultAddress = () => {
    let loginData = loginDetails();

    if (loginData?.userId) {
      this.props.fetchDefaultAddress(loginData?.userId);
    }
  };

  handleSlotChange = (event, slotId) => {
    const slotIndex = event.target.value;
    this.setState({
      id: Number(slotIndex),
      selectedDeliverySlot: this.state.slots[Number(slotIndex)],
    });
  };

  render() {
    const { activeStep, value, timneValue, cartList, totalPrice, skipped } =
      this.state;
    const isStepOptional = (step) => {
      return step === 0;
    };
    const isStepSkipped = (step) => {
      return skipped.has(step);
    };
    return (
      <Box className="address-container">
        <Container>
          <Box className="address-stepper-container">
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};

                if (index === 0 && activeStep === 1) {
                  labelProps.optional = (
                    <Button
                      variant="outlined"
                      className="outline-common-btn"
                      onClick={() => {
                        this.props.navigate("/mycart/address");
                      }}
                    >
                      Change
                    </Button>
                  );
                }

                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }

                return (
                  <Step key={label} {...stepProps} className="step">
                    <StepLabel className="step-label" {...labelProps}>
                      {label}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>
          {activeStep === 0 ? (
            <AllAddress
              selectedAddress={this.state.defaultSelectedAddress}
              handleTabs={this.handleTabs}
              cartListLength={cartList.length}
              getDefaultAddress={this.getDefaultAddress}
              defaultSelectedAddress={this.state.defaultSelectedAddress}
            />
          ) : activeStep === 1 ? (
            <>
              {this.props?.deliverySlotData?.status === status.IN_PROGRESS ? (
                Loader.commonLoader()
              ) : (
                <>
                  <Box className="select-delivery-option-container">
                    {cartList.length > 0 &&
                    this.props.cartItems?.status === status?.SUCCESS ? (
                      <Grid container spacing={2} data-aos="zoom-in-down">
                        <Grid item xs={12} lg={8} md={12} sm={12}>
                          <Box className="delivery-option-details">
                            <h3>Select a delivery option</h3>
                            <Box className="delivery-inner-box">
                              <Box className="d-flex align-items-center flex-wrap">
                                {cartList.length &&
                                  cartList.slice(0, 4).map((item) => {
                                    let itemId = cartList?.find(
                                      (x) => x.ProductId === item.id
                                    );
                                    return (
                                      <Box
                                        className="product-img-box"
                                        onClick={() => {
                                          let cartList = _.cloneDeep(item);
                                          cartList.Quantity = itemId?.Quantity
                                            ? itemId?.Quantity
                                            : 0;
                                          this.props.productDetailsData(
                                            cartList
                                          );
                                          this.props.navigate(
                                            `/product-details/${item?.id}`
                                          );
                                        }}
                                      >
                                        <img src={item?.image} alt="" />
                                      </Box>
                                    );
                                  })}
                                <Box className="view-all-img-box">
                                  <Link to={"/mycart"}>
                                    <span className="d-block">
                                      View all {cartList?.length} items
                                    </span>
                                  </Link>
                                </Box>
                              </Box>
                              {this.state?.slots?.length ? (
                                <Box
                                  className="delivery-slot-select"
                                  onClick={this.handleOpen}
                                >
                                  <span className="title">Delivery Slot </span>
                                  <Box className="d-flex align-items-center justify-content-between w-100">
                                    <Box className="d-flex align-items-center">
                                      <AccessTimeIcon className="time-icon" />
                                      {this.state.deliverySlotData?.length ? (
                                        <span className="d-block slot-time">
                                          {
                                            this.state?.selectedDeliverySlot
                                              ?.date
                                          }
                                          {
                                            this.state?.selectedDeliverySlot
                                              ?.dayOfWeek
                                          }
                                          Between
                                          {
                                            this.state?.selectedDeliverySlot
                                              ?.startTime
                                          }
                                          -
                                          {
                                            this.state?.selectedDeliverySlot
                                              ?.endTime
                                          }
                                        </span>
                                      ) : (
                                        <></>
                                      )}
                                    </Box>
                                    <KeyboardArrowDownIcon className="down-arrow-icon" />
                                  </Box>
                                </Box>
                              ) : (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "flex-start",
                                  }}
                                >
                                  <p>No Delivery Option Available</p>
                                </div>
                              )}

                              <Box className="w-100 justify-content-end d-flex">
                                {/* <Button
                        variant="contained"
                        fullWidth
                        className="common-btn proceed-payment-btn"
                        onClick={() => {
                          this.setState({
                            activeStep: 2
                          })
                        }}
                      >
                        Proceed to payment
                      </Button> */}

                                {/* <Button
                        variant="contained"
                        fullWidth
                        className="common-btn proceed-payment-btn"
                        onClick={() => {
                          localStorage.setItem("selectedTab", 2);
                          this.props.navigate("/mycart/payment-details");
 
                          this.setState({
                            activeStep: 2,
                          });
                        }}
                      >
                        Place Order
                      </Button> */}
                                <Button
                                  variant="contained"
                                  fullWidth
                                  className="common-btn proceed-payment-btn"
                                  onClick={() => this.handlePlaceOrder()}
                                  disabled={
                                    this.props.placeOrderData.status ===
                                      status.IN_PROGRESS ||
                                    (this.props?.deliverySlotData?.status ===
                                      status.SUCCESS &&
                                      !this.props?.deliverySlotData?.data?.[0])
                                  }
                                  endIcon={
                                    this.props.placeOrderData.status ===
                                    status.IN_PROGRESS ? (
                                      <CircularProgress className="common-loader" />
                                    ) : (
                                      <></>
                                    )
                                  }
                                >
                                  Place Order
                                </Button>
                              </Box>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} lg={4} md={12} sm={12}>
                          <Box className="order-summary-container">
                            <h3 className="order-title">Order Summary</h3>
                            <Box className="order-summary">
                              {cartList.length &&
                                cartList.map((item) => {
                                  return (
                                    <Box className="product-list d-flex align-items-center justify-content-between">
                                      <span className="d-block product-name">
                                        {item.name}
                                      </span>
                                      <span className="d-block product-weight">
                                        x {item?.Quantity}
                                      </span>
                                    </Box>
                                  );
                                })}
                            </Box>
                            <Box className="total-amount d-flex align-items-center justify-content-between">
                              <span className="d-block heading">
                                Total Amount Payable{" "}
                              </span>
                              <span className="d-block amount">
                                ₹ {totalPrice}
                              </span>
                            </Box>
                            <Box className="total-saving d-flex align-items-center justify-content-between">
                              <span className="d-block heading">
                                Total Savings{" "}
                              </span>
                              <span className="d-block amount">
                                ₹ {this.state.totalSavings}
                              </span>
                            </Box>
                            <Box className="information d-flex ">
                              <InfoIcon className="info-icon" />
                              <p className="d-block text">
                                Select your address and delivery slot to know
                                accurate delivery charges. You can save more by
                                applying a voucher!
                              </p>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    ) : this.props.cartItems?.status === status?.SUCCESS &&
                      cartList.length == 0 ? (
                      <Box>There is no item in cart</Box>
                    ) : (
                      <></>
                    )}
                  </Box>
                </>
              )}
            </>
          ) : activeStep === 2 ? (
            <></>
          ) : (
            // <Box
            //   className="payment-option-container"
            //   data-aos="fade-right"
            //   data-aos-offset="300"
            //   data-aos-easing="ease-in-sine"
            // >
            //   <Box className="payment-details">
            //     <Box className="payment-option-box active">
            //       <Box className="d-flex align-items-center justify-content-between">
            //         <Box className="d-flex align-items-center">
            //           <Checkbox
            //             {...label}
            //             defaultChecked
            //             icon={<RadioButtonUncheckedIcon />}
            //             checkedIcon={<CheckCircleIcon />}
            //           />
            //           <span className="d-block payment-title">
            //             Pay with Credit Card
            //           </span>
            //         </Box>
            //         <Box className="d-flex align-items-center">
            //           <Box className="card-type-img">
            //             <img src={cardTypeImg1} alt="cart-type" />
            //           </Box>
            //           <Box className="card-type-img">
            //             <img src={cardTypeImg2} alt="cart-type" />
            //           </Box>
            //           <Box className="card-type-img">
            //             <img src={cardTypeImg3} alt="cart-type" />
            //           </Box>
            //         </Box>
            //       </Box>
            //       <Grid container spacing={2} marginTop={"8px"}>
            //         <Grid item xs={12} lg={9} md={9} sm={9}>
            //           <label className="d-block form-field-title">
            //             Name on card
            //           </label>
            //           <TextField
            //             id="outlined-basic"
            //             variant="outlined"
            //             fullWidth
            //             className="form-text-field"
            //             placeholder="Olivia Rhye"
            //           />
            //         </Grid>
            //         <Grid item xs={12} lg={3} md={3} sm={3}>
            //           <label className="d-block form-field-title">Expiry</label>
            //           <TextField
            //             id="outlined-basic"
            //             variant="outlined"
            //             fullWidth
            //             className="form-text-field"
            //             placeholder="06 / 2024"
            //           />
            //         </Grid>
            //         <Grid item xs={12} lg={9} md={9} sm={9}>
            //           <label className="d-block form-field-title">
            //             Card number
            //           </label>
            //           <TextField
            //             id="outlined-basic"
            //             variant="outlined"
            //             fullWidth
            //             className="form-text-field"
            //             placeholder="Olivia Rhye"
            //           />
            //         </Grid>
            //         <Grid item xs={12} lg={3} md={3} sm={3}>
            //           <label className="d-block form-field-title">CVV</label>
            //           <TextField
            //             id="outlined-basic"
            //             variant="outlined"
            //             fullWidth
            //             type="password"
            //             className="form-text-field"
            //           />
            //         </Grid>
            //       </Grid>
            //     </Box>
            //     <Box className="payment-option-box ">
            //       <Box className="d-flex justify-content-between align-items-flex-start">
            //         <Box className="d-flex align-items-flex-start">
            //           <Checkbox
            //             {...label}
            //             icon={<RadioButtonUncheckedIcon />}
            //             checkedIcon={<CheckCircleIcon />}
            //           />
            //           <Box className="d-block">
            //             <span className="d-block payment-title">UPI</span>
            //             <p className="d-block info">
            //               Unlimited users and unlimited individual data.
            //             </p>
            //           </Box>
            //         </Box>
            //         <Box className="d-flex align-items-center">
            //           <Box className="card-type-img">
            //             <img src={upiImg1} alt="cart-type" />
            //           </Box>
            //           <Box className="card-type-img">
            //             <img src={upiImg2} alt="cart-type" />
            //           </Box>
            //         </Box>
            //       </Box>
            //     </Box>
            //     <Box className="payment-option-box ">
            //       <Box className="d-flex justify-content-between align-items-flex-start">
            //         <Box className="d-flex align-items-flex-start">
            //           <Checkbox
            //             {...label}
            //             icon={<RadioButtonUncheckedIcon />}
            //             checkedIcon={<CheckCircleIcon />}
            //           />
            //           <Box className="d-block">
            //             <span className="d-block payment-title">Paypal</span>
            //             <p className="d-block info">
            //               You will be redirected to the PayPal website after
            //               submitting your order{" "}
            //             </p>
            //           </Box>
            //         </Box>
            //         <Box className="d-flex align-items-center">
            //           <Box className="card-type-img">
            //             <img src={paypalImg} alt="cart-type" />
            //           </Box>
            //         </Box>
            //       </Box>
            //     </Box>
            //     <Box className="payment-option-box ">
            //       <Box className="d-flex justify-content-between align-items-flex-start">
            //         <Box className="d-flex align-items-flex-start">
            //           <Checkbox
            //             {...label}
            //             icon={<RadioButtonUncheckedIcon />}
            //             checkedIcon={<CheckCircleIcon />}
            //           />
            //           <Box className="d-block">
            //             <span className="d-block payment-title">
            //               Cash on delivery
            //             </span>
            //             <p className="d-block info">
            //               You will be redirected to the PayPal website after
            //               submitting your order{" "}
            //             </p>{" "}
            //           </Box>
            //         </Box>
            //         <Box className="d-flex align-items-center">
            //           <Box className="card-type-img">
            //             <img src={cashOnDeliveryImg} alt="cart-type" />
            //           </Box>
            //         </Box>
            //       </Box>
            //     </Box>
            //     <Box className="w-100 d-flex justify-content-end">
            //       {/* <Link to={"/mycart/address/order-placed"}> */}
            //       <Button
            //         variant="contained"
            //         fullWidth
            //         className="common-btn place-order-btn"
            //         onClick={() => this.handlePlaceOrder()}
            //         disabled={
            //           this.props.placeOrderData.status === status.IN_PROGRESS
            //         }
            //       >
            //         {this.props.placeOrderData.status === status.IN_PROGRESS ? (
            //           <>
            //             <CircularProgress className="common-loader" />
            //           </>
            //         ) : (
            //           "Place Order"
            //         )}
            //       </Button>

            //       {/* </Link> */}
            //     </Box>
            //   </Box>
            // </Box>
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
                  value={this.state?.value}
                  onChange={this.handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Today" />
                  <Tab label="Tomorrow " />
                  <Tab label={futureDate()} />
                </Tabs>
              </Box>
              <Divider />
              {this.props.deliverySlotData?.status == status.IN_PROGRESS ? (
                <>{Loader.commonLoader()}</>
              ) : (
                <>
                  <Box className="slot-timing-tab">
                    <Tabs
                      value={this.state?.timneValue}
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
                        value={this.state.id}
                        onChange={(event) => this.handleSlotChange(event)}
                      >
                        <Grid container spacing={2}>
                          {this.state?.slots?.length ? (
                            this.state?.slots?.map((item, index) => {
                              return (
                                <Grid
                                  item
                                  xs={12}
                                  lg={4}
                                  md={4}
                                  sm={6}
                                  // onClick={this.setState({
                                  //   selectedDeliverySlot: item,
                                  // })}
                                >
                                  <FormControlLabel
                                    value={index.toString()}
                                    control={
                                      <Radio
                                        checked={
                                          this.state?.selectedDeliverySlot
                                            ?.startTime === item?.startTime &&
                                          this.state?.selectedDeliverySlot
                                            ?.endTime === item?.endTime
                                        }
                                      />
                                    }
                                    label={`${item?.startTime} - ${item?.endTime}`}
                                  />
                                </Grid>
                              );
                            })
                          ) : (
                            <p>No Delivery Slot Available</p>
                          )}

                          {/* <Grid item xs={12} lg={4} md={4} sm={6}>
                        <FormControlLabel
                          value="eveningSlot"
                          control={<Radio />}
                          label="4:00 PM - 6:00 PM"
                        />
                      </Grid> */}
                        </Grid>
                      </RadioGroup>
                    </Box>
                  ) : timneValue === 1 ? (
                    <Box className="time-slot-checkbox">
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={this.state.id}
                        onChange={(event) => this.handleSlotChange(event)}
                      >
                        <Grid container spacing={2}>
                          {this.state.slots?.length ? (
                            this.state?.slots?.map((item, index) => {
                              return (
                                <Grid
                                  item
                                  xs={12}
                                  lg={4}
                                  md={4}
                                  sm={6}
                                  // onClick={this.setState({
                                  //   selectedDeliverySlot: item,
                                  // })}
                                >
                                  <FormControlLabel
                                    value={index.toString()}
                                    control={
                                      <Radio
                                        checked={
                                          this.state?.selectedDeliverySlot
                                            ?.startTime === item?.startTime &&
                                          this.state?.selectedDeliverySlot
                                            ?.endTime === item?.endTime
                                        }
                                      />
                                    }
                                    label={`${item?.startTime} - ${item?.endTime}`}
                                  />
                                </Grid>
                              );
                            })
                          ) : (
                            <p>No Delivery Slot Available</p>
                          )}

                          {/* <Grid item xs={12} lg={4} md={4} sm={6}>
                      <FormControlLabel
                        value="eveningSlot"
                        control={<Radio />}
                        label="4:00 PM - 6:00 PM"
                      />
                    </Grid> */}
                        </Grid>
                      </RadioGroup>
                    </Box>
                  ) : (
                    <Box className="time-slot-checkbox">
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={this.state.id}
                        onChange={(event) => this.handleSlotChange(event)}
                      >
                        <Grid container spacing={2}>
                          {this.state.slots?.length ? (
                            this.state?.slots?.map((item, index) => {
                              return (
                                <Grid
                                  item
                                  xs={12}
                                  lg={4}
                                  md={4}
                                  sm={6}
                                  // onClick={this.setState({
                                  //   selectedDeliverySlot: item,
                                  // })}
                                >
                                  <FormControlLabel
                                    value={index.toString()}
                                    control={
                                      <Radio
                                        checked={
                                          this.state?.selectedDeliverySlot
                                            ?.startTime === item?.startTime &&
                                          this.state?.selectedDeliverySlot
                                            ?.endTime === item?.endTime
                                        }
                                      />
                                    }
                                    label={`${item?.startTime} - ${item?.endTime}`}
                                  />
                                </Grid>
                              );
                            })
                          ) : (
                            <p>No Delivery Slot Available</p>
                          )}

                          {/* <Grid item xs={12} lg={4} md={4} sm={6}>
                      <FormControlLabel
                        value="eveningSlot"
                        control={<Radio />}
                        label="4:00 PM - 6:00 PM"
                      />
                    </Grid> */}
                        </Grid>
                      </RadioGroup>
                    </Box>
                  )}
                </>
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
  const { allAddress, selectedAddressData, defaultAddressData } =
    state.alladdress;
  const { loginData } = state.login;
  const { placeOrderData, deliverySlotData } = state.placeorder;
  return {
    cartItems,
    loginData,
    allAddress,
    placeOrderData,
    selectedAddressData,
    defaultAddressData,
    deliverySlotData,
  };
}

const mapDispatchToProps = {
  fetchCartItems,
  placeOrder,
  productDetailsData,
  fetchDefaultAddress,
  fetchAvailableDeliverySlot,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(Address));
