import React, { Component } from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import profileimage from "../../../../assets/img/profileimage.png";
import orderimage from "../../../../assets/img/orderimage.png";
import addressbookimage from "../../../../assets/img/addressbookimage.png";
import customersupportimage from "../../../../assets/img/customersupportimage.png";
import accountprivacy from "../../../../assets/img/accountprivacyimage.png";
import logoutimage from "../../../../assets/img/logoutimage.png";


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
              to: "/contact-us",
              icon: customersupportimage,
            },
            {
              name: "Account Privacy",
              to: "/contact-us",
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

    return (
      <Box className="profilewrap" sx={{marginLeft:"none", marginTop:"none"}}>
      <Box
        className="profile-sidebar"
      >
        <Box
          className="heading"
        >
          <img className="imageofheader" src={profileimage} alt="Profile" />
          <Link to={"/my-order"}><p style={{marginTop: '6px'}}>7989786093</p></Link>
        </Box>
        {sections.map((section, index) => (
          <Box className="profile-links" key={index}>
            <Box className="links">
              <ul>
                {section.links.map((link, idx) => (
                  <li
                    className={link.to === path ? "active" : ""}
                    key={idx}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <Link to={link.to}>
                    <div style={{display: 'flex', gap: '6px'}}>
                    <img
                        src={link.icon}
                        alt={link.name}
                        style={{
                          width: "22px",
                          height: "22px",
                        }}
                      />
                      <span style={{marginTop: '2px'}}>{link.name}</span>
                    </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
        ))}
      </Box></Box>
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
