import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
// import myOrder from "Views/PostLogin/myOrder";
class ProfileSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [
        {
          heading: "Account Setting",
          links: [
            {
              name: "Personal Information",
              to: "/my-profile/personal-information",
            },
            { name: "Manage Addresses", to: "/my-profile/manage-addresses" },
            { name: "Change Password", to: "/my-profile/change-password" },
          ],
        },
        {
          heading: "Payment",
          links: [
            { name: "UPI", to: "#" },
            { name: "Cards", to: "#" },
            { name: "Gift Cards", to: "#" },
          ],
        },
        {
          heading: "Alerts & Privacy",
          links: [
            { name: "Wish list", to: "/my-profile/wish-list" },
            { name: "Notification", to: "/my-profile/notification" },
            { name: "Account Privacy", to: "/my-profile/account-privacy" },
          ],
        },
      ],
    };
  }

  render() {
    const path = window.location.pathname;

    const { sections } = this.state;

    return (
      <Box className="profile-sidebar">
        <Box className="heading">
          <Link to={"/my-order"} className="heading">
            My Orders <ChevronRightOutlinedIcon />
          </Link>
        </Box>
        {sections.map((section, index) => (
          <Box className="profile-links" key={index}>
            <Box className="sab-heading">
              <span>
                <PermIdentityOutlinedIcon />
              </span>
              {section.heading}
            </Box>
            <Box className="links">
              <ul>
                {section.links.map((link, idx) => (
                  <li className={link.to === path ? "active" : ""} key={idx}>
                    <Link to={link.to}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
        ))}
        <Box className="profile-links">
          <Box className="sab-heading">
            <span>
              <PermIdentityOutlinedIcon />
            </span>
            <Button>Logout</Button>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default ProfileSideBar;
