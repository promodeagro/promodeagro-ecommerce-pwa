import { Box } from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchDefaultAddress } from "../../../Redux/Address/AddressThunk";
import { loginDetails } from "Views/Utills/helperFunctions";
import "../../../assets/sass/pages/account.scss";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import profileimage from "../../../assets/img/profileimage.png";
import orderimage from "../../../assets/img/ordersvg.svg";
import addressbookimage from "../../../assets/img/addressbooksvg.svg";
import customersupportimage from "../../../assets/img/customersupportsvg.svg";
import accountprivacy from "../../../assets/img/accountprivarysvg.svg";
import logoutimage from "../../../assets/img/logountsvg.svg";
import sideiconimage from "../../../assets/img/sideiconsvg.svg";
import accountbackicon from "../../../assets/img/accountbackicon.svg";


class Account extends Component {
  state = {
    phoneNumber: "",
  };

  async componentDidMount() {
    const user = loginDetails();
    const userId = user?.userId;
  
    if (userId) {
      try {
        const response = await this.props.fetchDefaultAddress(userId);
        console.log("Full API Response:", response.payload); 
  
        const addressData = response.payload;
  
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
      document.cookie = "login=; path=/; max-age=0";
    }
    localStorage.removeItem("cartItem");
    localStorage.removeItem("address");
    document.cookie = "login=; path=/; domain=.promodeagro.com; max-age=0";
    this.props.navigate("/");
    window.location.reload();
  };

  handleBackClick = () => {
    this.props.navigate("/");
  };

  render() {
    return (
      <Box className="account_page">
        <ul>
          <li>
            <Box className="gapinthespanmain">
            <img src={accountbackicon} alt="Account" className="accountbackicon" onClick={this.handleBackClick}
            />
              <img src={profileimage} alt="Account" className="account-image" />
              <span>{this.state.phoneNumber}</span>
            </Box>
          </li>
          <li>
            <Link to="/my-order" className="gapinthespan">
              <img src={orderimage} alt="Orders" />
              <span>Orders</span>
              <img src={sideiconimage} alt="Side Icon" className="imagehw" />
            </Link>
          </li>
          <li>
            <Link to="/my-profile/alladdress" className="gapinthespan">
              <img src={addressbookimage} alt="Address Book" />
              <span>Address Book</span>
              <img src={sideiconimage} alt="Side Icon" className="imagehw" />
            </Link>
          </li>
          <li>
            <Link to="/my-profile/privacy" className="gapinthespan">
              <img src={accountprivacy} alt="Account Privacy" />
              <span>Account Privacy</span>
              <img src={sideiconimage} alt="Side Icon" className="imagehw" />
            </Link>
          </li>
          <li>
            <Link to="/my-profile/customer-support" className="gapinthespan">
              <img src={customersupportimage} alt="Customer Support" />
              <span>Customer Support</span>
              <img src={sideiconimage} alt="Side Icon" className="imagehw" />
            </Link>
          </li>
          <li onClick={this.handleLogout}>
            <Link className="gapinthespan">
              <img src={logoutimage} alt="Logout" />
              <span>Logout</span>
              <img src={sideiconimage} alt="Side Icon" className="imagehw" />
            </Link>
          </li>
        </ul>
      </Box>
    );
  }
}

export default connect(null, { fetchDefaultAddress })(navigateRouter(Account));
