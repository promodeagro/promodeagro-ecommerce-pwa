import React, { Component } from "react";
import { Box, Button, Container, CircularProgress } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ProfileSideBar from "../profileSideBar";
import { deleteUser } from "../../../../Redux/Signin/SigninThunk";
import status from "../../../../Redux/Constants";
import { ErrorMessages, loginDetails } from "Views/Utills/helperFunctions";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import { connect } from "react-redux";
class AccountPrivacy extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps, prevState) {
    const items = loginDetails();

    if (
      prevProps.deleteUserData.status !== this.props.deleteUserData.status &&
      this.props.deleteUserData.status === status.SUCCESS &&
      this.props?.deleteUserData?.data
    ) {
      if (this.props?.deleteUserData?.data?.statusCode == 200) {
        ErrorMessages.success(this.props?.deleteUserData?.data?.message);
        localStorage.removeItem("login");
        this.props.navigate("/");
      } else if (this.props?.deleteUserData?.data?.statusCode == 401) {
        ErrorMessages.success(this.props?.deleteUserData?.data?.message);
      }
    }
  }

  handleDeleteUser = () => {
    this.props.deleteUser({
      userId: loginDetails()?.userId,
    });
  };

  render() {
    const {} = this.state;
    return (
      <Box className="main-container">
        <Container>
          <Box className="profile-container">
            <Box className="profile-left">
              <ProfileSideBar />
            </Box>
            <Box className="profile-right">
              <Box className="heading">
                <h2>Account Privacy</h2>
              </Box>
              <Box className="promode-text-box">
                We i.e. "Promode agro Commerce Private Limited" (“Company”), are
                committed to protecting the privacy and security of your
                personal information. Your privacy is important to us and
                maintaining your trust is paramount.
              </Box>
              <Button
                onClick={() => this.handleDeleteUser()}
                className="common-btn delete-btn"
                variant="contained"
                color="error"
                disabled={
                  this.props.deleteUserData.status === status.IN_PROGRESS
                }
                startIcon={<DeleteOutlineOutlinedIcon />}
                endIcon={
                  this.props.deleteUserData.status === status.IN_PROGRESS ? (
                    <CircularProgress className="common-loader " />
                  ) : (
                    <></>
                  )
                }
              >
                Delete My Account
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { deleteUserData } = state.login;
  return {
    deleteUserData,
  };
}

const mapDispatchToProps = {
  deleteUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(AccountPrivacy));
