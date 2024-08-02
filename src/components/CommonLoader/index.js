import React, { Component } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

class CommonLoader extends Component {
  render() {
    return (
      <Box className="common-supense-loader">
        <CircularProgress />
      </Box>
    );
  }
}
export default CommonLoader;
