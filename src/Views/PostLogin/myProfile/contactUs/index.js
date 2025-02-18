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
import { ErrorMessages, loginDetails, ValidationEngine } from "../../../Utills/helperFunctions";
import { createFeedback } from "../../../../Redux/FeedBack/FeedBackThunk";

import { connect } from "react-redux";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import status from "../../../../Redux/Constants";
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

class ContactUs extends Component {
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
      typeOfEnquiry:this.state.typeOfEnquiry,
      name:this.state.name,
      email:this.state.email , contact:this.state.mobileNumber, feedback:this.state.feedback
        })
        if (errorData.isValid) {
     
      ErrorMessages.success("Thank you for The Feedback")
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
          <Container>

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
            <Grid container spacing={5}>
              <Grid item xs={12} lg={3} md={3} sm={4}>
                <Box className="links-box">
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
              </Grid>
              <Grid item xs={12} lg={9} md={9} sm={8}>
                {activeTab === "support" && (
                  <Box className="support-details">
                    <Box className="support-box">
                      <h4>Online Customer Support</h4>
                      <p>
                        Customer Care Team Email :{" "}
                        <a href="mailto:support@promodeagro.com">
                          support@promodeagro.com
                        </a>
                      </p>
                    </Box>
                    <Box className="support-box">
                      <h4>Phone Customer Support</h4>
                      <p>
                        Online Customer Care Team Phone No :{" "}
                        <a href="tel:+91 9701610033">+91 9701610033</a>
                      </p>
                      <p>
                        Store customer Care Team Phone No :{" "}
                        <a href="tel:+91 8522829922">+91 8522829922</a>
                      </p>
                      <p>
                        Farm CEO(Tina) Phone No:{" "}
                        <a href="tel:+91 8897399587">+91 8897399587</a>
                      </p>
                    </Box>
                    <Box className="support-box">
                      <h4>Office Address</h4>
                      <p>
                        ADDRESS: FL NO E 702, KALIMATA TEMPLE ROAD, NEAR HANUMAN
                        TEMPLE, RAJENDRA NAGAR, SURVEY NO 4/A AND 4/AA,
                        PEERAMCHERUVU, VASATHI ANANDI, HYDERABAD, RANGAREDDY,
                        TELANGANA, 500091
                      </p>
                      <h4>Store Address</h4>
                      <p>
                        Giridhari Executive Park ,Kalimandir Rd, Hyderabad,
                        Telangana 500091
                      </p>
                      <h4>Farm Address</h4>
                      <p>
                        veluvartey village , valigonda , Bhongir District,
                        Telangana Pin - 508112
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
                          <label>Type Of Enquiry</label>
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
                            <MenuItem value={10}>Informal feedback</MenuItem>
                            <MenuItem value={20}>Formal feedback</MenuItem>
                            <MenuItem value={30}>Formative feedback</MenuItem>
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
                          <label>Name</label>
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
                          <label className="d-block">Email</label>
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
                          <label className="d-block">Contact</label>
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
                          <label className="d-block">Feedback</label>
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
                          onClick={()=> this.handleSubmit()}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                  </form>
                )}
              </Grid>
            </Grid>
          </Container>
        </Box>
                </Container>
        
      </Box>
    );
  }
}

function mapStateToProps(state) {
 
  // const { allAddress, selectedAddressData, defaultAddressData } =
  // state.alladdress;
  const {feedBackData} = state.feedBack
  return {
    feedBackData 
  };
}

const mapDispatchToProps = {
  createFeedback
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(ContactUs));
