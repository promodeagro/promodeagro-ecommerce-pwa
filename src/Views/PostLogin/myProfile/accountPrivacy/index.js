import React, { Component } from "react";
import { Box, Button, Container } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ProfileSideBar from "../profileSideBar";

class AccountPrivacy extends Component {
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
                <h2>Account Privacy</h2>
              </Box>
              <Box className="promode-text-box">
                We i.e. "Promode agro Commerce Private Limited" (“Company”), are
                committed to protecting the privacy and security of your
                personal information. Your privacy is important to us and
                maintaining your trust is paramount.
              </Box>
              <Button
                className="common-btn delete-btn"
                variant="contained"
                color="error"
                startIcon={<DeleteOutlineOutlinedIcon />}
              >
                Delete My Account
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default AccountPrivacy;
