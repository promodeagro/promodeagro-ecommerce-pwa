import React, { Component } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  FormHelperText,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import {
  ErrorMessages,
  loginDetails,
  ValidationEngine,
} from "../../../Utills/helperFunctions";
import { createFeedback } from "../../../../Redux/FeedBack/FeedBackThunk";

import { connect } from "react-redux";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import BackArrow from "../../../../assets/img/backArrow.svg";

const validationSchema = {
  typeOfEnquiry: [
    {
      message: "Please select type of enquiry",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
  name: [
    {
      message: "Please enter name",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
  email: [
    {
      message: "Please enter email",
      type: ValidationEngine.type.MANDATORY,
    },
    {
      message: "Please enter valid email",
      type: ValidationEngine.type.REGEX,
      regex: ValidationEngine.EMAIL_REGEX,
    },
  ],
  feedback: [
    {
      message: "Please enter address",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
  mobileNumber: [
    {
      message: "Please enter Mobile number",
      type: ValidationEngine.type.MANDATORY,
    },
    {
      message: "Please valid Mobile Number",
      type: ValidationEngine.type.REGEX,
      regex: ValidationEngine.MOBILE_NUMBER_REGEX,
    },
  ],
};

class CustomerSupport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "support",
      name: "",
      email: "",
      feedback: "",
      mobileNumber: "",
      typeOfEnquiry: "",
      isSubmit: false,
    };
  }

  validateForm = () => {
    const { name, email, feedback, mobileNumber, typeOfEnquiry } = this.state;
    const error = ValidationEngine.validate(validationSchema, {
      name,
      email,
      feedback,
      mobileNumber,
      typeOfEnquiry,
    });
    return error;
  };

  handleValueChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;
    this.setState({ [name]: val });
  };

  handleSubmit = () => {
    const errorData = this.validateForm();

    this.setState({
      isSubmit: true,
    });
    this.props.createFeedback({
      typeOfEnquiry: this.state.typeOfEnquiry,
      name: this.state.name,
      email: this.state.email,
      contact: this.state.mobileNumber,
      feedback: this.state.feedback,
    });
    if (errorData.isValid) {
      ErrorMessages.success("Thank you for The Feedback");
      this.setState({
        name: "",
        email: "",
        feedback: "",
        mobileNumber: "",
        typeOfEnquiry: "",
        isSubmit: false,
      });
    }
  };

  handleTabClick = (tab) => {
    this.setState({
      activeTab: tab,
    });
  };

  render() {
    const errorData = this.validateForm();
    const {
      name,
      email,
      feedback,
      mobileNumber,
      typeOfEnquiry,
      isSubmit,
      activeTab,
    } = this.state;
    return (
      <Box className="main-container">
        <Box className="headerboxofthecustomer">
          <div style={{ display: "flex", gap: "8px" }}>
            <img
              src={BackArrow}
              alt="Back"
              style={{ cursor: "pointer" }}
              onClick={() => (window.location.href = "/account")}
            />
            <h2>Customer Support</h2>
          </div>
        </Box>
        <Box className="contact-heading-banner">
          <Container>
            <h2>
              We love to hear <br />
              from you
            </h2>
          </Container>
        </Box>
        <Box className="contact-info">
          <Container>
            <Box className="links-boxes">
              <h2>Contact us</h2>
              <ul>
                <li
                  className={activeTab === "support" ? "active" : ""}
                  onClick={() => this.handleTabClick("support")}
                >
                  Support
                </li>
                <li
                  className={activeTab === "feedback" ? "active" : ""}
                  onClick={() => this.handleTabClick("feedback")}
                >
                  Feedback
                </li>
              </ul>
            </Box>
            {activeTab === "support" && (
              <Box className="support-details">
                <Box className="support-boxes">
                  <h4>Online Customer Support</h4>
                  <p>
                    Customer Care Team Email :                  </p>

                    <a href="mailto:support@promodeagro.com">
                      support@promodeagro.com
                    </a>
                </Box>
                <Box className="support-boxes">
                  <h4>Phone Customer Support</h4>
                  <div className="divcontainer">
                    <div style={{width:"50%"}}>
                      <p>Online Customer Care Phone No : </p>
                      <p>Store Customer Care Phone No : </p>
                      <p>Farm CEO(Tina) Phone No: </p>
                    </div>
                    <div>
                      <p  style={{marginTop:"16px"}}>
                        <a href="tel:+91 9701610033">+91 9701610033</a>
                      </p>
                      <p  style={{marginTop:"16px"}}>
                        <a href="tel:+91 8522829922">+91 8522829922</a>
                      </p>
                      <p  style={{marginTop:"16px"}}>
                        <a href="tel:+91 8897399587">+91 8897399587</a>
                      </p>
                    </div>
                  </div>
                </Box>
                <Box className="support-boxes">
                  <h4>Office Address</h4>
                  <p>
                    ADDRESS: HOUSE NO 6 - 100, DARGAH KHALEEJ KHAN GUDA ROAD,
                    KISMATPUR, BANDLAGUDA JAGIR, HYDERABAD, RANGAREDDY,
                    TELANGANA, 500086.
                  </p>
                  <h4>Store Address</h4>
                  <p>
                    ADDRESS: HOUSE NO 6 - 100, DARGAH KHALEEJ KHAN GUDA ROAD,
                    KISMATPUR, BANDLAGUDA JAGIR, HYDERABAD, RANGAREDDY,
                    TELANGANA, 500086.
                  </p>
                  <h4>Farm Address</h4>
                  <p>
                    VELUVARTEY VILLAGE, VALIGONDA, BHONGIR DISTRICT, TELANGANA,
                    508112.
                  </p>
                </Box>
              </Box>
            )}
            {activeTab === "feedback" && (
              <form>
                <Box className="feedback-from">
                  <Grid container spacing={2} alignItems={"center"}>
                    <Grid item xs={12} lg={6} md={6} sm={6}>
                      <Box className="textfield">
                        <label>Type Of Enquiry *</label>
                        <Select
                          className="select"
                          labelId="enquiry-select-label"
                          id="enquiry-select"
                          value={typeOfEnquiry}
                          name="typeOfEnquiry"
                          placeholder="Select Enquiry"
                          onChange={this.handleValueChange}
                          error={!errorData.typeOfEnquiry.isValid && isSubmit}
                        >
                          <MenuItem value={10}>Informal Feedback</MenuItem>
                          <MenuItem value={20}>Formal Feedback</MenuItem>
                          <MenuItem value={30}>Formative Feedback</MenuItem>
                        </Select>
                        {isSubmit && (
                          <FormHelperText error>
                            {errorData?.typeOfEnquiry?.message}
                          </FormHelperText>
                        )}
                      </Box>
                    </Grid>

                    <Grid item xs={12} lg={6} md={6} sm={6}>
                      <Box className="textfield">
                        <label>Name *</label>
                        <TextField
                          className="input"
                          variant="outlined"
                          fullWidth
                          name="name"
                          value={name}
                          type="text"
                          placeholder="Type Name"
                          onChange={this.handleValueChange}
                          error={!errorData.name.isValid && isSubmit}
                        />
                        {isSubmit && (
                          <FormHelperText error>
                            {errorData?.name?.message}
                          </FormHelperText>
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={12} lg={6} md={6} sm={6}>
                      <Box className="textfield">
                        <label className="d-block">Email *</label>
                        <TextField
                          className="input"
                          variant="outlined"
                          fullWidth
                          name="email"
                          value={email}
                          type="text"
                          placeholder="Type Email"
                          onChange={this.handleValueChange}
                          error={!errorData.email.isValid && isSubmit}
                        />
                        {isSubmit && (
                          <FormHelperText error>
                            {errorData?.email?.message}
                          </FormHelperText>
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={12} lg={6} md={6} sm={6}>
                      <Box className="textfield">
                        <label className="d-block">Contact *</label>
                        <TextField
                          className="input"
                          variant="outlined"
                          fullWidth
                          name="mobileNumber"
                          value={mobileNumber}
                          type="text"
                          placeholder="+919090541111"
                          onChange={this.handleValueChange}
                          error={!errorData.mobileNumber.isValid && isSubmit}
                        />
                        {isSubmit && (
                          <FormHelperText error>
                            {errorData?.mobileNumber?.message}
                          </FormHelperText>
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={12} lg={12} md={12} sm={12}>
                      <Box className="textfield">
                        <label className="d-block">Feedback *</label>
                        <TextField
                          className="input textarea"
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={4}
                          name="feedback"
                          value={feedback}
                          type="text"
                          placeholder="Write Your Feedback here"
                          onChange={this.handleValueChange}
                          error={!errorData.feedback.isValid && isSubmit}
                        />
                        {isSubmit && (
                          <FormHelperText error>
                            {errorData?.feedback?.message}
                          </FormHelperText>
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={12} lg={6} md={6} sm={6}>
                      <Button
                        className="common-btn submit-btn"
                        variant="contained"
                        onClick={() => this.handleSubmit()}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            )}
          </Container>
        </Box>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  // const { allAddress, selectedAddressData, defaultAddressData } =
  // state.alladdress;
  const { feedBackData } = state.feedBack;
  return {
    feedBackData,
  };
}

const mapDispatchToProps = {
  createFeedback,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(CustomerSupport));
