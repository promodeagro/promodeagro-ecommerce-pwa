import { Box } from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../../assets/sass/pages/account.scss";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Box className="account_page">
        <ul>
          <li>
            <Link to="/my-profile/personal-information">Account</Link>
          </li>
          <li>
            <Link to="/my-order">Orders</Link>
          </li>
          <li>
            <Link to="/my-profile/wish-list">Save Addresses</Link>
          </li>
          <li>
            <Link to="/contact-us">Customer Support</Link>
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
            <Link>Logout</Link>
          </li>
        </ul>
      </Box>
    );
  }
}

export default navigateRouter(Account);
