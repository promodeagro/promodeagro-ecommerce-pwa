import React, { Component } from "react";
import { Box, Container } from "@mui/material";


class CustomersSays extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Box className="customers-says-container">
        <Container>
          <Box className="heading">What our Customers Says</Box>
          
        </Container>
      </Box>
    );
  }
}

export default CustomersSays;
