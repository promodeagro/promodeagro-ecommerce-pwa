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
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import checkedIcon from "../../../assets/img/checked.png";
import packedIcon from "../../../assets/img/packed.png";
import onTheWayIcon from "../../../assets/img/on-the-way.png";
import deliverdIcon from "../../../assets/img/delivered.png";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const customIcons = {
  1: <img src={checkedIcon} alt="" />,
  2: <img src={checkedIcon} alt="" />,
  3: <img src={packedIcon} alt="" />,
  4: <img src={onTheWayIcon} alt="" />,
  5: <img src={deliverdIcon} alt="" />,
};

function CustomStepIcon(props) {
  const { icon } = props;
  return <Box className="custom-step-icon">{customIcons[String(icon)]}</Box>;
}
class MyOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  render() {
    const steps = [
      "Order placed",
      "In Process ",
      "Packed",
      "On the way ",
      "Delivered ",
    ];

    return (
      <Container>
        <Box className="my-order-container">
          <Box className="my-order-list">
            <Box className="d-flex align-items-center">
              <h2>My Orders</h2>
              <Box className="order-status">
                <span>Packing</span>
              </Box>
            </Box>
            <span className="d-block last-month-order">
              Showing orders for the last 6 months <strong>10 </strong>Orders
            </span>
            <Box className="order-status-collapsed" data-aos="zoom-in-right">
              <Grid container spacing={1} alignItems={"center"}>
                <Grid item xs={12} lg={3} md={6} sm={6}>
                  <Box className="date-time-container order-progress">
                    <AccessTimeIcon />
                    <Box className="d-block">
                      <span className="d-block">Today,</span>
                      <span className="d-block">2:00 PM - 5:00 PM</span>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={5} md={6} sm={6}>
                  <Box className="order-status-bar">
                    <Stepper activeStep={1} alternativeLabel>
                      {steps.map((label, index) => (
                        <Step key={label}>
                          <StepLabel StepIconComponent={CustomStepIcon}>
                            {label}
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={1} md={6} sm={6}></Grid>
                <Grid item xs={12} lg={2} md={6} sm={6}>
                  <Box className="order-id-container order-progress">
                    <span className="d-block title">Order ID :</span>
                    <Box className="d-flex align-items-center">
                      <span className="d-block number">200715DXFMW0UD</span>
                      <ContentCopyIcon />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={1} md={12} sm={12}>
                  <Box className="collapsed-arrow">
                    <IconButton aria-label="arrow">
                      <KeyboardArrowDownIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box className="order-details-container" data-aos="zoom-in-right">
              <span className="d-block order-place-time">
                Ordered 2hrs ago{" "}
              </span>
              <Grid container spacing={{ lg: 12, md: 4, sm: 4, xs: 4 }}>
                <Grid item xs={12} lg={4} md={4} sm={6}>
                  <Box className="delivery-address">
                    <h3 className="d-block">Delivery Address</h3>
                    <span className="d-block info">Mubashir Nesar</span>
                    <address className="info">
                      #3-22/2, Shaheen Nagar, Quba colony Hyderabad,500045,
                      Telangana, 50045
                    </address>
                    <span className="d-block info">Ph: 988821111</span>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={4} md={4} sm={6}>
                  <Box className="delivery-address">
                    <h3 className="d-block">Payment Information</h3>
                    <span className="d-block info">
                      Payment Status :{" "}
                      <strong className="payment-status">Due</strong>
                    </span>
                    <span className="d-block info">
                      Mode of Payment :{" "}
                      <strong className="payment-type">COD</strong>
                    </span>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={4} md={4} sm={12}>
                  <Box className="order-summary-container">
                    <span className="d-block title">Order Summary</span>
                    <Box className="d-flex justify-content-between">
                      <span className="d-block summary-title">
                        Order Amount
                      </span>
                      <span className="d-block order-amount">RS. 200.12</span>
                    </Box>
                    <Box className="d-flex justify-content-between">
                      <span className="d-block summary-title">Savings</span>
                      <span className="d-block saving-amount">RS. 100.12</span>
                    </Box>
                    <Box className="top-cricle circle-1">
                      <span className="d-block cricle"></span>
                    </Box>
                    <Box className="top-cricle circle-2">
                      <span className="d-block cricle"></span>
                    </Box>
                    <Box className="top-cricle circle-3">
                      <span className="d-block cricle"></span>
                    </Box>
                    <Box className="top-cricle circle-4">
                      <span className="d-block cricle"></span>
                    </Box>
                    <Box className="bottom-cricle circle-1">
                      <span className="d-block cricle"></span>
                    </Box>
                    <Box className="bottom-cricle circle-2">
                      <span className="d-block cricle"></span>
                    </Box>
                    <Box className="bottom-cricle circle-3">
                      <span className="d-block cricle"></span>
                    </Box>
                    <Box className="bottom-cricle circle-4">
                      <span className="d-block cricle"></span>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Box className="more-order-details">
                <span className="d-block text">More with this order</span>
                <Button variant="outlined" className="d-block">
                  <span className="d-block title">Cancel Order</span>
                  <span className="d-block sub-title">Cancel This Order</span>
                </Button>
              </Box>
            </Box>
            <Box className="order-status-collapsed" data-aos="zoom-in-right">
              <Grid container spacing={1} alignItems={"center"}>
                <Grid item xs={3}>
                  <Box className="date-time-container order-delivered">
                    <AccessTimeIcon />
                    <Box className="d-block">
                      <span className="d-block">Today,</span>
                      <span className="d-block">2:00 PM - 5:00 PM</span>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={5}>
                  <Box className="order-status-bar">
                    <Stepper activeStep={1} alternativeLabel>
                      {steps.map((label, index) => (
                        <Step key={label}>
                          <StepLabel StepIconComponent={CustomStepIcon}>
                            {label}
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Box>
                </Grid>
                <Grid item xs={1}>
                  <Box className="order-status-container delivered">
                    <span className="d-block">Delivered</span>
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Box className="order-id-container order-delivered">
                    <span className="d-block title">Order ID :</span>
                    <Box className="d-flex align-items-center">
                      <span className="d-block number">200715DXFMW0UD</span>
                      <ContentCopyIcon />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={1}>
                  <Box className="collapsed-arrow">
                    <IconButton aria-label="arrow">
                      <KeyboardArrowDownIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box className="order-status-collapsed" data-aos="zoom-in-right">
              <Grid
                container
                spacing={1}
                alignItems={"center"}
                overflow={"auto"}
              >
                <Grid item xs={3} lg={3} md={3} sm={3}>
                  <Box className="date-time-container order-delivered">
                    <AccessTimeIcon />
                    <Box className="d-block">
                      <span className="d-block">Today,</span>
                      <span className="d-block">2:00 PM - 5:00 PM</span>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={5} lg={5} md={5} sm={3}>
                  <Box className="order-status-bar">
                    <Stepper activeStep={1} alternativeLabel>
                      {steps.map((label, index) => (
                        <Step key={label}>
                          <StepLabel StepIconComponent={CustomStepIcon}>
                            {label}
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Box>
                </Grid>
                <Grid item xs={1} lg={1} md={1} sm={1}>
                  <Box className="order-status-container cancelled">
                    <span className="d-block">Cancelled</span>
                  </Box>
                </Grid>
                <Grid item xs={2} lg={2} md={2} sm={2}>
                  <Box className="order-id-container order-delivered">
                    <span className="d-block title ">Order ID :</span>
                    <Box className="d-flex align-items-center">
                      <span className="d-block number">200715DXFMW0UD</span>
                      <ContentCopyIcon />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={1}>
                  <Box className="collapsed-arrow">
                    <IconButton aria-label="arrow">
                      <KeyboardArrowDownIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    );
  }
}

export default MyOrder;
