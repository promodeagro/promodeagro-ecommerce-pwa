import React, { Component } from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { connect } from "react-redux";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import profileimage from "../../../../assets/img/profileimage.png";

class ProfileSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [
        {
          links: [
            { name: "Orders", to: "/my-profile/personal-information" },
            { name: "Address Book", to: "/my-profile/manage-addresses" },
            { name: "Customer Support", to: "/my-profile/change-password" },
            { name: "Account Privacy", to: "/my-profile/change-password" },
            { name: "Logout", to: "#" }, // '#' for non-navigable placeholder
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
      <Box className="profile-sidebar" style={{ borderBottom: "none", borderRight: "none" }}>
        <Box
          className="heading"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <img
          className="imageofheader"
            src={profileimage}
            alt="Profile"
          />
          <Link to={"/my-order"}>
            My Orders
          </Link>
        </Box>
        {sections.map((section, index) => (
          <Box className="profile-links" key={index}>
            <Box className="links">
              <ul>
                {section.links.map((link, idx) => (
                  <li className={link.to === path ? "active" : ""} key={idx}>
                    {link.name === "Logout" ? (
                      <a onClick={this.handleLogout} href="#">
                        {link.name}
                      </a>
                    ) : (
                      <Link to={link.to}>{link.name}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
        ))}
      </Box>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(navigateRouter(ProfileSideBar));
