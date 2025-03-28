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
import { loginDetails } from "Views/Utills/helperFunctions";
import { fetchDefaultAddress } from "../../../../Redux/Address/AddressThunk";

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
            { name: "Logout", to: "#", icon: logoutimage, onClick: this.handleLogout },
          ],
        },
      ],
      phoneNumber: "",
    };
  }

  async componentDidMount() {
    const user = loginDetails();
    const userId = user?.userId;

    if (userId) {
      try {
        const response = await this.props.fetchDefaultAddress(userId);
        console.log("Full API Response:", response.payload); // Debugging log

        const addressData = response.payload?.data || response.payload; // Handle different response structures

        if (addressData?.phoneNumber) {
          this.setState({
            phoneNumber: addressData.phoneNumber,
          });
        } else {
          console.warn("Phone number not found in API response.");
        }
      } catch (error) {
        console.error("Error fetching default address:", error);
      }
    }
  }

  handleLogout = () => {
    if (window.location.hostname === "localhost") {
      document.cookie = "login=; path=/; max-age=0"; // Delete login cookie
    }
    localStorage.removeItem("defaultAddress"); // Remove stored default address
    localStorage.removeItem("cartItem"); // Remove cart data
    localStorage.removeItem("address");
    document.cookie = "login=; path=/; domain=.promodeagro.com; max-age=0";
  
    this.props.navigate("/"); // Navigate to home
  
    setTimeout(() => {
      window.scrollTo(0, 0); // Scroll to top after 1 second
    }, 100);
    setTimeout(() => {
      window.location.reload();
    }, 200); // Reload after another delay to preserve scroll behavior
  
    
  };
  
  render() {
    const path = window.location.pathname;
    const { sections, phoneNumber } = this.state;

    return (
      <Box className="profilewrap">
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
                      <Link to={link.to} onClick={link.onClick || undefined}>
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  fetchDefaultAddress, // Ensure it's passed as a prop
};

export default connect(mapStateToProps, mapDispatchToProps)(
  navigateRouter(ProfileSideBar)
);
