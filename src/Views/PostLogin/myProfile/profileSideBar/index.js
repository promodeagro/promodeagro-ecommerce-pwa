import React, { Component } from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import profileimage from "../../../../assets/img/profileimage.png";
import orderimage from "../../../../assets/img/ordersvg.svg";
import addressbookimage from "../../../../assets/img/addressbooksvg.svg";
import customersupportimage from "../../../../assets/img/customersupportsvg.svg";
import accountprivacy from "../../../../assets/img/accountprivarysvg.svg";
import logoutimage from "../../../../assets/img/logountsvg.svg";

class ProfileSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [
        {
          links: [
            {
              name: "Orders",
              to: "/my-order",
              icon: orderimage,
            },
            {
              name: "Address Book",
              to: "/my-profile/manage-addresses",
              icon: addressbookimage,
            },
            {
              name: "Customer Support",
              to: "/my-profile/contact-us",
              icon: customersupportimage,
            },
            {
              name: "Account Privacy",
              to: "/my-profile/account-privacy",
              icon: accountprivacy,
            },
            { name: "Logout", to: "#", icon: logoutimage },
          ],
        },
      ],
    };
  }

  handleLogout = () => {
    localStorage.removeItem("login");
    this.props.navigate("/");
  };

  render() {
    const path = window.location.pathname;
    const { sections } = this.state;
    const defaultAddress = JSON.parse(
      localStorage.getItem("defaultAddress") || "{}"
    );
    const phoneNumber = defaultAddress?.phoneNumber || "N/A"; // Fallback to "N/A" if not available

    return (
      <Box
        className="profilewrap"
        sx={{ marginLeft: "none", marginTop: "none" }}
      >
        <Box className="profile-sidebar">
          <Box className="heading">
            <img className="imageofheader" src={profileimage} alt="Profile" />
              <p style={{ marginTop: "6px" }}>{phoneNumber}</p>
          </Box>
          {sections.map((section, index) => (
            <Box className="profile-links" key={index}>
              <Box className="links">
                <ul>
                  {section.links.map((link, idx) => (
                    <li
                      className={link.to === path ? "active" : ""}
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Link to={link.to}>
                        <div style={{ display: "flex", gap: "6px" }}>
                          <img
                            src={link.icon}
                            alt={link.name}
                            style={{
                              width: "22px",
                              height: "22px",
                            }}
                          />
                          <span style={{ marginTop: "2px" }}>{link.name}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(ProfileSideBar));
