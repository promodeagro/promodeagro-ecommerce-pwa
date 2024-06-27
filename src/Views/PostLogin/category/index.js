import React, { Component } from "react";
import { Box, Container, Grid } from "@mui/material";
import SideBar from "./sideBar";
import List from "./list";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Box className="main-container">
        <Container>
          <Grid container spacing={2} alignItems={'flex-start'}>
            <Grid item xs={6} sm={6} md={3}>
              <SideBar />
            </Grid>
            <Grid item xs={6} sm={6} md={9}>
              <List />
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }
}


export default Category;

