import React, { Component } from "react";
import { Box, Button, Container } from "@mui/material";
import ProfileSideBar from "../profileSideBar";
import { Alert } from "@mui/material";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.state;
    return (
      <Box className="main-container">
        <Container>
          <Box className="profile-container">
            <Box className="profile-left">
              <ProfileSideBar />
            </Box>
            <Box className="profile-right">
              <Box className="heading">
                <h2>Notification</h2>
              </Box>
              <Box className="notification-container">
                <Alert className="notification" icon={false}>
                  <p>
                    <strong>Order Confirmation</strong> : Thank you for your
                    order! Your groceries will be delivered soon. Order #12345
                  </p>
                  <Button>View Details</Button>
                </Alert>
                <Alert className="notification" icon={false}>
                  <p>
                    <strong>Special Offer</strong> : Flash Sale! Get 20% off on
                    fresh produce today only. Shop now!
                  </p>
                  <Button>View Details</Button>
                </Alert>
                <Alert className="notification" color="error" icon={false}>
                  <p>
                    <strong>Payment Failure</strong> : Payment for your recent
                    order failed. Please update your payment method
                  </p>
                  <Button>View Details</Button>
                </Alert>
                <Alert className="notification" icon={false}>
                  <p>
                    <strong>Referral Bonus</strong> : Refer a friend and get a
                    discount on your next purchase. Share the love!
                  </p>
                  <Button>View Details</Button>
                </Alert>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default Notification;
