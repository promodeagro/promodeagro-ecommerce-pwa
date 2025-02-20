import { Box } from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../../assets/sass/pages/account.scss";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import profileimage from "../../../assets/img/profileimage.png";
import orderimage from "../../../assets/img/orderimage.png";
import addressbookimage from "../../../assets/img/addressbookimage.png";
import customersupportimage from "../../../assets/img/customersupportimage.png";
import accountprivacy from "../../../assets/img/accountprivacyimage.png";
import logoutimage from "../../../assets/img/logoutimage.png";
import sideiconimage from "../../../assets/img/sideicon.png";

class Account extends Component {
  render() {
    return (
      <Box className="account_page">
        <ul>
          <li>
            <Link to="/my-profile/personal-information" className="gapinthespan">
              <img src={profileimage} alt="Account" className="account-image" />
              <span>Account</span>
            </Link>
          </li>
          <li>
            <Link to="/my-order" className="gapinthespan">
              <img src={orderimage} alt="Orders" />
              <span>Orders</span>
              <img
                src={sideiconimage}
                alt="Side Icon"
                className="imagehw"
              />
            </Link>
          </li>
          <li>
            <Link to="/my-profile/alladdress" className="gapinthespan">
              <img src={addressbookimage} alt="Address Book" />
              <span>Address Book</span>
              <img
                src={sideiconimage}
                alt="Side Icon"
                className="imagehw"
              />
            </Link>
          </li>
          <li>
            <Link to="/my-profile/privacy" className="gapinthespan">
              <img src={accountprivacy} alt="Account Privacy" />
              <span>Account Privacy</span>
              <img
                src={sideiconimage}
                alt="Side Icon"
                className="imagehw"
              />
            </Link>
          </li>
          <li>
            <Link to="/my-profile/customer-support" className="gapinthespan">
              <img src={customersupportimage} alt="Customer Support" />
              <span>Customer Support</span>
              <img
                src={sideiconimage}
                alt="Side Icon"
                className="imagehw"
              />
            </Link>
          </li>
          <li
            onClick={() => {
              if (window.location.hostname === "localhost") {
                document.cookie = "login=; path=/; max-age=0";
              }
              localStorage.removeItem("defaultAddress");
              localStorage.removeItem("cartItem");
              localStorage.removeItem("address");
              document.cookie =
                "login=; path=/; domain=.promodeagro.com; max-age=0";
              this.props.navigate("/");
              window.location.reload();
            }}
          >
            <Link className="gapinthespan">
              <img src={logoutimage} alt="Logout" />
              <span>Logout</span>
              <img
                src={sideiconimage}
                alt="Side Icon"
                className="imagehw"
              />
            </Link>
          </li>
        </ul>
      </Box>
    );
  }
}

export default navigateRouter(Account);
