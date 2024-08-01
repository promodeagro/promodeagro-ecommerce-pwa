import React, { Component } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import ProfileSideBar from "../profileSideBar";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { connect } from "react-redux";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import {
  fetchPersonalDetails,
  updatePersonalDetails,
} from "../../../../Redux/Signin/SigninThunk";
import {
  ErrorMessages,
  Loader,
  loginDetails,
  ValidationEngine,
} from "../../../Utills/helperFunctions";
import status from "../../../../Redux/Constants";

const validationSchema = {
  name: [
    {
      message: "Please enter name",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
  // email: [
  //   {
  //     message: "Please enter email",
  //     type: ValidationEngine.type.MANDATORY,
  //   },
  //   {
  //     message: "Please enter valid email",
  //     type: ValidationEngine.type.REGEX,
  //     regex: ValidationEngine.EMAIL_REGEX,
  //   },
  // ],
  // mobileNumber: [
  //   {
  //     message: "Please enter Mobile number",
  //     type: ValidationEngine.type.MANDATORY,
  //   },
  //   {
  //     message: "Please valid Mobile Number",
  //     type: ValidationEngine.type.REGEX,
  //     regex: ValidationEngine.MOBILE_NUMBER_REGEX,
  //   },
  // ],
};

class PersonalInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      mobileNumber: "",
      isSubmit: false,
      editInformation: false,
    };
  }
  componentDidMount() {
    this.props.fetchPersonalDetails({
      userId: loginDetails()?.userId,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.personalDetailsData.status !==
        this.props.personalDetailsData.status &&
      this.props.personalDetailsData.status === status.SUCCESS &&
      this.props.personalDetailsData?.data
    ) {
      if (this.props.personalDetailsData?.data?.statusCode == 200) {
        this.setState({
          name: this.props.personalDetailsData?.data?.user?.Name,
          email: this.props.personalDetailsData?.data?.user?.email,
          mobileNumber:
            this.props.personalDetailsData?.data?.user?.MobileNumber,
        });
      }
    }

    if (
      prevProps.updatePersonalDetailsData?.status !==
        this.props.updatePersonalDetailsData?.status &&
      this.props.updatePersonalDetailsData?.status === status.SUCCESS
    ) {
      if (this.props.updatePersonalDetailsData?.data?.statusCode == 200) {
        ErrorMessages.success(
          this.props.updatePersonalDetailsData?.data?.message
        );
        this.setState({
          isSubmit: false,
          editInformation: false,
        });
        this.props.fetchPersonalDetails({
          userId: loginDetails()?.userId,
        });
      }
    }
  }

  validateEmail(email) {
    var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let check = emailPattern.test(email);

    return check;
  }
  validateMobile(mobile) {
    var emailPattern = /^\d{10}$/;
    let check = emailPattern.test(mobile);

    return check;
  }
  validateForm = () => {
    const { name, email, mobileNumber } = this.state;
    const error = ValidationEngine.validate(validationSchema, {
      name,
    });
    if (email && !this.validateEmail(email)) {
      {
        error.isValid = false;
        error.email = {
          isValid: false,
          message: "Please enter valid email",
        };
      }
    }
    if (mobileNumber && !this.validateMobile(mobileNumber)) {
      {
        error.isValid = false;
        error.mobileNumber = {
          isValid: false,
          message: "Please enter valid Mobile Number",
        };
      }
    }
    if (!mobileNumber && !email) {
      error.isValid = false;
      error.noOne = {
        isValid: false,
        message: "Please enter either mobile number or email",
      };
    }

    return error;
  };

  handleValueChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;
    this.setState({ [name]: val });
  };

  handleSave = () => {
    const errorData = this.validateForm();
    const { name, email, mobileNumber } = this.state;
    this.setState({
      isSubmit: true,
    });
    if (errorData.isValid) {
      let data = {
        userId: loginDetails()?.userId,
      };
      if (
        this.props.personalDetailsData?.data?.user?.Name &&
        name &&
        name != this.props.personalDetailsData?.data?.user?.Name
      ) {
        data.name = name;
      }
      if (email && email != this.props.personalDetailsData?.data?.user?.email) {
        data.email = email;
      }
      if (
        mobileNumber &&
        mobileNumber != this.props.personalDetailsData?.data?.user?.MobileNumber
      ) {
        data.mobileNumber = mobileNumber;
      }
      this.props.updatePersonalDetails(data);
    }
  };

  handleEditInformation = () => {
    const { editInformation, isSubmit } = this.state;

    this.setState({
      name: this.props.personalDetailsData?.data?.user?.Name,
      email: this.props.personalDetailsData?.data?.user?.email
        ? this.props.personalDetailsData?.data?.user?.email
        : "",
      mobileNumber: this.props.personalDetailsData?.data?.user?.MobileNumber,
      editInformation: !editInformation,
      isSubmit: false,
    });
  };

  render() {
    const errorData = this.validateForm();
    const {
      name,
      email,
      mobileNumber,
      isSubmit,
      editInformation,
      personalInfo,
    } = this.state;
    return (
      <Box className="main-container">
        {this.props.personalDetailsData.status === status.IN_PROGRESS ? (
          Loader.commonLoader()
        ) : (
          <>
            <Container>
              <Box className="profile-container">
                <Box className="profile-left">
                  <ProfileSideBar />
                </Box>
                <Box className="profile-right">
                  <Box className="heading">
                    <h2>Personal Information</h2>
                    <Button
                      className="edit-btn"
                      onClick={() => this.handleEditInformation()}
                    >
                      {editInformation === true ? (
                        <>Cancel</>
                      ) : (
                        <>
                          <EditOutlinedIcon /> edit
                        </>
                      )}
                    </Button>
                  </Box>
                  <Box className="profile-forms">
                    <Box className="textfield">
                      <label>Name</label>
                      <TextField
                        className="input"
                        variant="standard"
                        fullWidth
                        disabled={!editInformation}
                        name="name"
                        value={name}
                        type="text"
                        placeholder="Yahiya Ali Khan"
                        onChange={this.handleValueChange}
                        error={!errorData?.name?.isValid && isSubmit}
                      />
                      {isSubmit && (
                        <FormHelperText error>
                          {errorData?.name?.message}
                        </FormHelperText>
                      )}
                    </Box>
                    <Box className="textfield">
                      <label className="d-block">Email</label>
                      <TextField
                        className="input"
                        variant="standard"
                        fullWidth
                        name="email"
                        disabled={!editInformation}
                        value={email}
                        type="text"
                        placeholder="Yahiyaalikhan@example.com"
                        onChange={this.handleValueChange}
                        error={!errorData?.email?.isValid && isSubmit}
                      />
                      {isSubmit && (
                        <FormHelperText error>
                          {errorData?.email?.message}
                        </FormHelperText>
                      )}
                    </Box>
                    <Box className="textfield">
                      <label className="d-block">Contact</label>
                      <TextField
                        className="input"
                        variant="standard"
                        fullWidth
                        disabled={!editInformation}
                        name="mobileNumber"
                        value={mobileNumber}
                        type="text"
                        placeholder="+919090541111"
                        onChange={this.handleValueChange}
                        error={!errorData?.mobileNumber?.isValid && isSubmit}
                      />
                      {isSubmit && (
                        <FormHelperText error>
                          {errorData?.mobileNumber?.message}
                        </FormHelperText>
                      )}
                    </Box>
                    {isSubmit && (
                      <FormHelperText error>
                        {errorData?.noOne?.message}
                      </FormHelperText>
                    )}
                    {editInformation && (
                      <Button
                        className="common-btn change-password-btn"
                        variant="contained"
                        disabled={
                          this.props.updatePersonalDetailsData?.status ===
                          status.IN_PROGRESS
                        }
                        endIcon={
                          this.props.updatePersonalDetailsData.status ===
                          status.IN_PROGRESS ? (
                            <CircularProgress className="common-loader " />
                          ) : (
                            <></>
                          )
                        }
                        onClick={() => this.handleSave()}
                      >
                        Save
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            </Container>
          </>
        )}
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { personalDetailsData, updatePersonalDetailsData } = state.login;

  return {
    personalDetailsData,
    updatePersonalDetailsData,
  };
}

const mapDispatchToProps = {
  fetchPersonalDetails,
  updatePersonalDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(PersonalInformation));
