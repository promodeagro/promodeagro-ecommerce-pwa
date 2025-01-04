import { Box } from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import "../../../assets/sass/pages/account.scss"

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
                        <Link to="/my-profile/personal-information">
                            <PermIdentityOutlinedIcon /> My Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/my-order">
                            <PermIdentityOutlinedIcon /> Orders
                        </Link>
                    </li>
                    <li>
                        <Link to="/my-profile/wish-list">
                            <PermIdentityOutlinedIcon /> Wish list
                        </Link>
                    </li>
                    <li >
                        <Link to="/contact-us">
                            <PermIdentityOutlinedIcon /> Contact Us
                        </Link>
                    </li>
                    <li>
                        <Link to="/my-profile/notification">
                            <PermIdentityOutlinedIcon /> Notification
                        </Link>
                    </li>
                    <li
                        onClick={() => {

                            localStorage.removeItem("login");
                            this.props.navigate("/");
                        }}
                    >
                        <Link>
                            <PermIdentityOutlinedIcon /> Logout
                        </Link>
                    </li>
                </ul>
            </Box>
        );
    }
}
export default Account;



