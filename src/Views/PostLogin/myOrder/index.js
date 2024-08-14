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
import {
  fetchAllorders,
  fetchOrderById,
} from "../../../Redux/Order/PlaceOrderThunk";
import { connect } from "react-redux";
import { Loader, loginDetails } from "Views/Utills/helperFunctions";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import status from "../../../Redux/Constants";

const customIcons = {
  0: <Box className="icon order-placed"></Box>,
  1: <Box className="icon in-process"></Box>,
  2: <Box className="icon packed"></Box>,
  3: <Box className="icon on-the-way"></Box>,
  4: <Box className="icon delivered"></Box>,
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
    };
  }

  componentDidMount() {
    const items = loginDetails();

    if (items?.userId) {
      this.props.fetchAllorders(items?.userId);
    }
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

  render() {
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

    // Mapping order status to step index
    const statusToStepIndex = {
      "Order placed": 0,
      "In Process": 1,
      Packed: 2,
      "On the way": 3,
      Delivered: 4,
      Cancelled: -1, // Handle cancelled orders
    };

    return (
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
                      className="order-status-collapsed"
                      data-aos="zoom-in-right"
                    >
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
                                  statusToStepIndex[item?.status] !== undefined
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
                            {item?.status === "Delivered" ? (
                              <Box className="order-status-container delivered">
                                <span className="d-block">{item?.status}</span>
                              </Box>
                            ) : item?.status === "Cancelled" ? (
                              <Box className="order-status-container cancelled">
                                <span className="d-block">{item?.status}</span>
                              </Box>
                            ) : null}
                          </Grid>
                          <Grid item xs={2}>
                            <Box className="order-id-container order-progress">
                              <span className="d-block title">Order ID:</span>
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
                    </Box>
                    {expandedOrderDetails === item && (
                      <Box
                        className="order-details-container"
                        data-aos="zoom-in-right"
                      >
                        <span className="d-block order-place-time">
                          Ordered 2hrs ago
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
                                <strong className="payment-status">Due</strong>
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
                              <Box className="d-flex justify-content-between">
                                <span className="d-block summary-title">
                                  Discount
                                </span>
                                <span className="d-block order-amount">
                                  Rs. {item?.discount || 0}
                                </span>
                              </Box>
                              <Box className="d-flex justify-content-between">
                                <span className="d-block summary-title">
                                  Final Amount
                                </span>
                                <span className="d-block order-amount">
                                  Rs. {item?.totalPrice - (item?.discount || 0)}
                                </span>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
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
              Order has been cancelled successfully!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { allOrdersData, orderByIdData } = state.placeorder;

  return {
    allOrdersData,
    orderByIdData,
  };
}

const mapDispatchToProps = {
  fetchAllorders,
  fetchOrderById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(MyOrder));
