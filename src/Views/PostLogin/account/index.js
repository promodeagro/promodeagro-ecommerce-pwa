import { Box } from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import "../../../assets/sass/pages/account.scss"
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import logouticon from "../../../assets/img/logouticon.svg"
import filledicon from "../../../assets/img/filledicon.svg"
import callicon from "../../../assets/img/callicon.svg"
class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Box className="account_page">
                <ul>
                    {/* <li>
                        <Link to="/my-profile/personal-information">
                            <PermIdentityOutlinedIcon /> My Profile
                        </Link>
                    </li> */}
                    <li>
                        <Link to="/my-order">
                        <img src={filledicon} alt="Order Icon" /> My Orders
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="/my-profile/wish-list">
                            <PermIdentityOutlinedIcon /> Wish list
                        </Link>
                    </li> */}
                    <li >
                        <Link to="/contact-us">
                        <img src={callicon} alt="Contact Icon" /> Contact Us
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="/my-profile/notification">
                            <PermIdentityOutlinedIcon /> Notification
                        </Link>
                    </li> */}
                    <li
                      onClick={() => {
                        if (window.location.hostname === "localhost") {
                          document.cookie = "login=; path=/; max-age=0";
                        }
                        localStorage.removeItem("defaultAddress");
                        localStorage.removeItem("cartItem");
                        localStorage.removeItem("address");
                        document.cookie = "login=; path=/; domain=.promodeagro.com; max-age=0";
                        this.props.navigate("/");
                        window.location.reload();
                      }}

                    >
                        <Link>
                        <img src={logouticon} alt="Logout Icon" /> Logout
                        </Link>
                    </li>
                </ul>
            </Box>
        );
    }
}
 


export default(navigateRouter(Account));