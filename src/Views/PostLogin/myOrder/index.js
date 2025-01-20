import React, { Component } from "react";
import {
  Box,
  Container,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip,
} from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import {
  fetchAllorders,
  fetchOrderById,
  cancleOrder,
} from "../../../Redux/Order/PlaceOrderThunk";
import { connect } from "react-redux";
import { Loader, loginDetails } from "Views/Utills/helperFunctions";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";

import status from "../../../Redux/Constants";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Invoice from "../myProfile/notification/invoice";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");
const dateFormatter = (d) => {
  const date = new Date(d);
  return timeAgo.format(date);
};

const customIcons = {
  0: <Box width={5} className="icon order-placed"></Box>,
  1: <Box width={5} className="icon in-process"></Box>,
  2: <Box width={5} className="icon packed"></Box>,
  3: <Box width={5} className="icon on-the-way"></Box>,
  4: <Box width={5} className="icon delivered"></Box>,
};

function CustomStepIcon(props) {
  const { icon, completed, active } = props;

  return (
    <Box className="custom-step-icon">
      {completed ? (
        <Box className="icon completed">
          <CheckOutlinedIcon />
        </Box>
      ) : active ? (
        <Box
          className={
            icon === 1
              ? "icon order-placed active"
              : icon === 2
              ? "icon in-process active"
              : icon === 3
              ? "icon packed active"
              : icon === 4
              ? "icon on-the-way active"
              : icon === 5
              ? "icon delivered active"
              : "icon"
          }
        ></Box>
      ) : (
        customIcons[icon]
      )}
    </Box>
  );
}

class MyOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedOrderDetails: null,
      openOrderDialog: false,
      copiedOrderId: null,
      myOrdersList: [],
      expandedOrderId: "",
      previousPath: null,
    };
  }
  componentDidMount() {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", this.onBackButtonEvent);
    const items = loginDetails();
    if (items?.userId) {
      this.props.fetchAllorders(items?.userId);
    }
    this.mediaQuery = window.matchMedia("(max-width: 600px)");
    this.mediaQuery.addEventListener("change", this.handleMediaQueryChange);
    this.handleMediaQueryChange(this.mediaQuery); // Set initial state
  }

  componentWillUnmount() {
    // this.props.navigate("/");
    this.mediaQuery.removeEventListener("change", this.handleMediaQueryChange);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.allOrdersData.status !== this.props.allOrdersData.status &&
      this.props.allOrdersData.status === status.SUCCESS &&
      this.props.allOrdersData?.data &&
      this.props.allOrdersData?.data?.orders
    ) {
      this.setState({
        myOrdersList: this.props.allOrdersData.data.orders,
      });
    }

    if (
      prevProps.cancelOrderData.status !== this.props.cancelOrderData.status &&
      this.props.cancelOrderData.status === status.SUCCESS &&
      this.props.cancelOrderData?.data
    ) {
    } else if (this.props.cancelOrderData.status === status.FAILURE) {
    }
  }

  handleToggleExpand = (orderList) => {
    this.setState((prevState) => ({
      expandedOrderDetails:
        prevState.expandedOrderDetails === orderList ? null : orderList,
    }));
  };

  handleCopyOrderId = (orderId) => {
    navigator.clipboard.writeText(orderId).then(
      () => {
        this.setState({ copiedOrderId: orderId });
        setTimeout(() => {
          this.setState({ copiedOrderId: null });
        }, 2000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  handleClickOpen = () => {
    this.setState({ openOrderDialog: true });
  };

  handleClickClose = () => {
    this.setState({ openOrderDialog: false });
  };

  handleCancleOrder = (orderId) => {
    // this.props.cancleOrder({
    //   orderId:orderId,
    //   userId:loginDetails()?.userId
    // })
  };
  state = {
    isMobile: false,
  };
  handleMediaQueryChange = (e) => {
    this.setState({ isMobile: e.matches });
  };


  render() {
    const { isMobile } = this.state;
    const   HideDirectlySeeInvoice=false

    const steps = [
      "Order placed",
      "In Process",
      "Packed",
      "On the way",
      "Delivered",
    ];

    const {
      expandedOrderDetails,
      openOrderDialog,
      copiedOrderId,
      myOrdersList,
    } = this.state;

    const statusToStepIndex = {
      "order placed": 0,
      "in process": 1,
      packed: 2,
      "on the way": 3,
      delivered: 4,
      cancelled: -1, // Handle cancelled orders
    };
    console.log(myOrdersList, "my");
    return (
      <Box className="main-container">
        <Container>
          {this.props.allOrdersData.status === status.IN_PROGRESS ? (
            Loader.commonLoader()
          ) : (
            <Box className="my-order-container">
              <Box className="my-order-list">
                <Box className="d-flex align-items-center">
                  <h2>My Orders</h2>
                  {/* <Box className="order-status">
                  <span>Packing</span>
                </Box> */}
                </Box>
                <span className="d-block last-month-order">
                  Showing orders for the last 6 months{" "}
                  <strong>{myOrdersList?.length}</strong> Orders
                </span>
                {myOrdersList?.length > 0 ? (
                  myOrdersList.map((item) => (
                    <Box key={item?.id}>
                      <Box
                       style={{
                        border: `1.5px solid ${item.status === "cancelled" ? "#d30606" : "#bfbfbf"}`,
                       
                      }} 
                        className="order-status-collapsed"
                        data-aos="zoom-in-right"
                      >
                        {!isMobile ? (
                          <Box className="inner-order">
                            <Grid container spacing={1} alignItems={"center"}>
                              <Grid item xs={3}>
                                <Box className="date-time-container order-progress">
                                  <AccessTimeIcon />
                                  <Box className="d-block">
                                    <span className="d-block">
                                      {item?.deliverySlot?.startTime}-
                                      {item?.deliverySlot?.endTime}
                                    </span>
                                  </Box>
                                </Box>
                              </Grid>
                              

                              <Grid item xs={5}>
                                <Box className="order-status-bar">
                                  <Stepper
                                    activeStep={
                                      statusToStepIndex[item?.status] !==
                                      undefined
                                        ? statusToStepIndex[item?.status]
                                        : 0
                                    }
                                    alternativeLabel
                                  >
                                    {steps.map((label, index) => (
                                      <Step key={label}>
                                        <StepLabel
                                          StepIconComponent={CustomStepIcon}
                                          icon={index}
                                        >
                                          {label}
                                        </StepLabel>
                                      </Step>
                                    ))}
                                  </Stepper>
                                </Box>
                              </Grid>
                              <Grid item xs={1}>
                                {item?.status === "delivered" ? (
                                  <Box className="order-status-container delivered">
                                    <span className="d-block">
                                      {item?.status}
                                    </span>
                                  </Box>
                                ) : item?.status === "cancelled" ? (
                                  <Box className="order-status-container cancelled">
                                    <span className="d-block">
                                      {item?.status}
                                    </span>
                                  </Box>
                                ) : null}
                              </Grid>

                              

                              <Grid item xs={2}>
                                <Box className="order-id-container order-progress">
                                  <span className="d-block title">
                                    Order ID:
                                  </span>
                                
                              
                                  <Box className="d-flex align-items-center">
                                    <span className="d-block number">
                                      {item?.id}
                                    </span>
                                    <Tooltip
                                      title={
                                        copiedOrderId === item?.id
                                          ? "Copied!"
                                          : "Copy Order ID"
                                      }
                                      arrow
                                      open={copiedOrderId === item?.id}
                                    >
                                      <ContentCopyIcon
                                        onClick={() =>
                                          this.handleCopyOrderId(item?.id)
                                        }
                                      />
                                    </Tooltip>
                                  </Box>
                                </Box>
                              </Grid>
                              <Grid
                                item
                                xs={1}
                                display={"flex"}
                                justifyContent={"center"}
                              >
                                <IconButton
                                  aria-label="arrow"
                                  onClick={() => this.handleToggleExpand(item)}
                                >
                                  {expandedOrderDetails === item ? (
                                    <KeyboardArrowUpIcon />
                                  ) : (
                                    <KeyboardArrowDownIcon />
                                  )}
                                </IconButton>
                              </Grid>
                            </Grid>
                          </Box>
                        ) : (
                          <>
                            <Grid item>
                              <div style={{ display: "flex" }}>
                                <Box
                                  style={{ width: "320px", height: "100px" }}
                                  className="order-id-container order-progress"
                                >
                                  {" "}
                                  <div style={{display:'flex', justifyContent:'space-between'}}>

                                  <div>
                                  <span className="d-block title">
                                    Order ID:
                                  </span>
                                  <div style={{ display: "flex" }}>
                                    <span className="d-block number">
                                      {item?.id}
                                    </span>
                                    <Tooltip
                                      title={
                                        copiedOrderId === item?.id
                                          ? "Copied!"
                                          : "Copy Order ID"
                                      }
                                      arrow
                                      open={copiedOrderId === item?.id}
                                    >
                                      <ContentCopyIcon
                                        onClick={() =>
                                          this.handleCopyOrderId(item?.id)
                                        }
                                      />
                                    </Tooltip>
                                  </div>
                                  </div>
                                  <Grid item xs={1}>
                                {item?.status === "delivered" ? (
                                  <Box className="order-status-container delivered">
                                    <span className="d-block">
                                      {item?.status}
                                    </span>
                                  </Box>
                                ) : item?.status === "cancelled" ? (
                                  <Box className="order-status-container cancelled">
                                    <span style={{paddingLeft:'5px',paddingRight:'5px'}} className="d-block">
                                      {item?.status}
                                    </span>
                                  </Box>
                                ) : null}
                              </Grid>
                              </div>

                               
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "5px",
                                    }}
                                  >
                                    <AccessTimeIcon style={{ margin: "0px" }} />

                                    <span style={{ color: "#1f9151" }}>
                                      {item?.deliverySlot?.startTime}-
                                      {item?.deliverySlot?.endTime}
                                    </span>{"  "}
                                    <span style={{fontSize:'12px'}}>{item.createdAt.split("T")[0]}</span>
                                    </div>
                                </Box>

                                {/* </Box> */}
                                <Grid
                                  item
                                  xs={1}
                                  display={"flex"}
                                  justifyContent={"center"}
                                >
                                  <IconButton
                                    aria-label="arrow"
                                    onClick={() =>
                                      this.handleToggleExpand(item)
                                    }
                                  >
                                    {expandedOrderDetails === item ? (
                                      <KeyboardArrowUpIcon />
                                    ) : (
                                      <KeyboardArrowDownIcon />
                                    )}
                                  </IconButton>
                                </Grid>
                              </div>
                            </Grid>
                            {expandedOrderDetails === item && (
                              <Box
                                sx={{
                                  border: "0.5px solid #a8a8a8", // Adjust border color and size
                                  borderRadius: "4px", // Rounded corners with 2px radius
                                  padding: "16px", // Add padding if needed
                                  width: "full", // Adjust width
                                  height: "100px", // Adjust height
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  marginTop: "8px",
                                }}
                              >
                                <Grid item xs={5}>
                                  <Box className="order-status-bar">
                                    <Stepper
                                      activeStep={
                                        statusToStepIndex[item?.status] !==
                                        undefined
                                          ? statusToStepIndex[item?.status]
                                          : 0
                                      }
                                      alternativeLabel
                                    >
                                      {steps.map((label, index) => (
                                        <Step key={label}>
                                          <StepLabel
                                            StepIconComponent={CustomStepIcon}
                                            icon={index}
                                          >
                                            {label}
                                          </StepLabel>
                                        </Step>
                                      ))}
                                    </Stepper>
                                  </Box>
                                </Grid>
                              </Box>
                            )}
                          </>
                        )}
                      </Box>

                      {expandedOrderDetails === item && (
                        <Box
                          className="order-details-container"
                          data-aos="zoom-in-right"
                        >
                          <span className="d-block order-place-time">
                            {dateFormatter(item?.createdAt)}
                          </span>

                          <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                              <Box className="delivery-address">
                                <h3 className="d-block">Delivery Address</h3>
                                <span className="d-block info">
                                  {item?.address?.name}
                                </span>
                                <address className="info">
                                  {item?.address?.address}
                                </address>
                                <span className="d-block info">
                                  Ph: {item?.address?.phoneNumber}
                                </span>
                              </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <Box className="delivery-address">
                                <h3 className="d-block">Payment Information</h3>
                                <span className="d-block info">
                                  Payment Status:{" "}
                                  <strong className="payment-status">
                                    {item?.paymentDetails?.status}
                                  </strong>
                                </span>
                                <span className="d-block info">
                                  Mode of Payment:{" "}
                                  <strong className="payment-type">
                                    {item?.paymentDetails?.method}
                                  </strong>
                                </span>
                              </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <Box className="order-summary-container">
                                <span className="d-block title">
                                  Order Summary
                                </span>
                                <Box className="d-flex justify-content-between">
                                  <span className="d-block summary-title">
                                    Order Amount
                                  </span>
                                  <span className="d-block order-amount">
                                    Rs. {item?.totalPrice}
                                  </span>
                                </Box>
                                {item?.discount ? (
                                  <Box className="d-flex justify-content-between">
                                    <span className="d-block summary-title">
                                      Discount
                                    </span>
                                    {item?.discount}
                                    <span style={{width:'60px',textAlign:'start'}}  className="d-block order-amount">
                                      Rs. {item?.discount}
                                    </span>
                                  </Box>
                                ) : (
                                  <></>
                                )}

                                <Box sx={{
                                  
                                }} className="d-flex justify-content-between ">
                                  <span className="d-block summary-title">
                                    Final Amount
                                  </span>
                                  <span style={{width:'60px',textAlign:'start'}} className="d-block order-amount">
                                    Rs.{" "}
                                    {item?.totalPrice - (item?.discount || 0)}
                                  </span>
                                </Box>
                                {/* {isMobile && ( */}
                                
                                  <Invoice flag={HideDirectlySeeInvoice}  orderData={item}></Invoice>
                                
                                {/* )} */}
                              </Box>
                            </Grid>
                          </Grid>
                          <Box className="more-order-details">
                            <span className="d-block text">
                              More with this order
                            </span>
                            <Button
                              variant="outlined"
                              className="d-block"
                              onClick={() => {
                                this.handleClickOpen();
                              }}
                            >
                              <span className="d-block title">
                                Request For Cancellation
                              </span>
                              <span className="d-block sub-title">
                                Cancel This Order
                              </span>
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  ))
                ) : (
                  <Box>No Order History</Box>
                )}
              </Box>
            </Box>
          )}
          <Dialog open={openOrderDialog} onClose={this.handleClickClose}>
            <DialogContent>
              <DialogContentText>
                Do you want to cancel this order
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color="success">Cancel Order</Button>
            </DialogActions>
            <DialogActions>
              <Button onClick={this.handleClickClose} color="error">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { allOrdersData, orderByIdData, cancelOrderData } = state.placeorder;

  return {
    allOrdersData,
    orderByIdData,
    cancelOrderData,
  };
}

const mapDispatchToProps = {
  fetchAllorders,
  fetchOrderById,
  cancleOrder,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(MyOrder));

