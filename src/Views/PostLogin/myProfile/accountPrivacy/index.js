import React, { Component } from "react";
import { Box, Button, Container, TextField, Modal } from "@mui/material";
import ProfileSideBar from "../profileSideBar";
import { deleteUser } from "../../../../Redux/Signin/SigninThunk";
import status from "../../../../Redux/Constants";
import { ErrorMessages, loginDetails } from "Views/Utills/helperFunctions";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import { connect } from "react-redux";
import sideiconimage from "../../../../assets/img/sideicon.png";
import { fetchDefaultAddress, updateAddress } from "../../../../Redux/Address/AddressThunk";

class AccountPrivacy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      name: "",
      phoneNumber: "",
      isNameEdited: false,
    };
  }

  async componentDidMount() {
    const userId = loginDetails()?.userId;
    if (userId) {
      const response = await this.props.fetchDefaultAddress(userId);
      if (response?.payload) {
        this.setState({
          name: response.payload.name || "",
          phoneNumber: response.payload.phoneNumber || "",
        });
      }
    }
  }

  handleValueChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, isNameEdited: e.target.name === "name" });
  };

  handleSubmit = async () => {
    if (this.state.isNameEdited) {
      const userId = loginDetails()?.userId;
      if (userId) {
        await this.props.updateAddress({ userId, name: this.state.name });
      }
    }
  };

  handleOpenModal = () => {
    this.setState({ openModal: true });
  };

  handleCloseModal = () => {
    this.setState({ openModal: false });
  };

  handleDeleteUser = () => {
    this.props.deleteUser({ userId: loginDetails()?.userId });
  };

  render() {
    return (
      <Box className="main-container">
        <Container className="wraper">
          <Box className="profile-container">
            <ProfileSideBar />
            <Box className="profile-right">
              <Box className="heading">
                <h2>Account Privacy</h2>
              </Box>
              <Box className="mainboxfortheprivacy">
                <Box className="textfield20">
                  <label>Name *</label>
                  <TextField
                    className="inputfield"
                    variant="outlined"
                    fullWidth
                    name="name"
                    type="text"
                    placeholder="Type Name"
                    value={this.state.name}
                    onChange={this.handleValueChange}
                  />
                </Box>
                <Box className="textfield20">
                  <label className="d-block">Phone No *</label>
                  <TextField
                    className="inputfield"
                    variant="outlined"
                    fullWidth
                    name="phoneNumber"
                    type="number"
                    placeholder={this.state.phoneNumber || "Phone No"}
                    onChange={this.handleValueChange}
                  />
                </Box>
                <div className="buttonbox">
                  <button
                    onClick={this.handleSubmit}
                    variant="contained"
                    className="smallbutton1"
                  >
                    Submit
                  </button>
                </div>
              </Box>
              <div className="delete-account-btn" onClick={this.handleOpenModal}>
                <div className="delete-account-content">
                  <h4>Delete Account</h4>
                  <p>
                    All data linked to this account will be deleted and cannot be retrieved once removed.
                  </p>
                </div>
                <img src={sideiconimage} alt="Side Icon" className="side-icon" />
              </div>
              <Modal open={this.state.openModal} onClose={this.handleCloseModal}>
                <Box className="common-modal deleteusermodal">
                  <Box>
                    All data associated with this account will be permanently deleted and cannot be recovered once it's removed.
                  </Box>
                  <Box className="buttongap">
                    <button
                      onClick={this.handleDeleteUser}
                      className="confirmbutton"
                      variant="contained"
                    >
                      Delete
                    </button>
                    <button
                      onClick={this.handleCloseModal}
                      variant="outlined"
                      className="cancelbutton"
                    >
                      Cancel
                    </button>
                  </Box>
                </Box>
              </Modal>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  deleteUserData: state.login.deleteUserData,
});

const mapDispatchToProps = {
  deleteUser,
  fetchDefaultAddress,
  updateAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(navigateRouter(AccountPrivacy));
